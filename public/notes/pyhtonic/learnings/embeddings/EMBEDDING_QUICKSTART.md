# Embedding System Quick Start

## Files Created

```
core/services/embeddings/
├── __init__.py                 # Public exports
├── embedding_interface.py      # IEmbeddingProvider, EmbeddingResult, SimilarityMatch
├── embedding_cache.py          # File-based cache (30-day TTL)
├── pattern_index.py            # EmbeddingPatternIndex
├── semantic_matcher.py         # SemanticMatcher
└── providers/
    ├── __init__.py
    ├── openai_embeddings.py    # OpenAIEmbeddingProvider
    └── provider_factory.py     # create_embedding_provider()

core/services/nlp/
├── embedding_parser.py         # EmbeddingSemanticParser (NEW)
└── hybrid_parser.py            # Modified - added embedding layer

patterns/
└── ac_patterns.json            # 29 canonical patterns with synonyms
```

---

## Configuration

Add to your `.env`:

```bash
# Required
OPENAI_API_KEY=sk-your-key-here

# Enable embedding
EMBEDDING_ENABLED=true
EMBEDDING_PROVIDER=openai
EMBEDDING_MODEL=text-embedding-3-small
EMBEDDING_THRESHOLD=0.80
```

---

## Quick Test

```python
# test_embedding_quick.py
import os
os.environ["EMBEDDING_ENABLED"] = "true"

from core.services.embeddings import (
    create_embedding_provider,
    EmbeddingCache,
    EmbeddingPatternIndex,
    SemanticMatcher
)

# 1. Test provider
provider = create_embedding_provider()
print(f"Provider available: {provider.is_available()}")

if provider.is_available():
    # 2. Test embedding
    result = provider.embed("bring to front")
    print(f"Embedding dimensions: {result.dimensions}")

    # 3. Test pattern index
    cache = EmbeddingCache()
    index = EmbeddingPatternIndex(provider, cache, "patterns/ac_patterns.json")
    index.load_patterns()
    print(f"Patterns loaded: {index.pattern_count}")

    # 4. Test semantic matching
    matcher = SemanticMatcher(provider, index, cache)
    matches = matcher.find_similar("move above other objects", category="action")
    if matches:
        print(f"Best match: {matches[0].pattern_text} ({matches[0].similarity_score:.2f})")

    # 5. Test parser integration
    from core.services.nlp.hybrid_parser import create_parser
    parser = create_parser(embedding_enabled=True)
    result = parser.parse("User can move the shape above all other objects")
    print(f"Method: {parser.last_method}")
    print(f"Action: {result.action_verb}")
    print(f"Confidence: {result.confidence:.2f}")
```

---

## Expected Output

```
Provider available: True
Embedding dimensions: 1536
Patterns loaded: 29
Best match: bring to front (0.89)
Method: embedding
Action: bring
Confidence: 0.89
```

---

## Fallback Behavior

| Condition | Behavior |
|-----------|----------|
| EMBEDDING_ENABLED=false | Skip embedding, use spaCy/regex |
| OPENAI_API_KEY missing | Skip embedding, use spaCy/regex |
| Confidence < 0.80 | Fall back to spaCy |
| spaCy confidence < 0.70 | Fall back to regex |

---

## Architecture Diagram

```
Input: "move above other objects"
            │
            ▼
    ┌───────────────────┐
    │   HybridParser    │
    │                   │
    │ 1. Embedding      │ ──► cosine_similarity("move above...", patterns)
    │    confidence=0.89│     → matches "bring to front" (0.89)
    │                   │     → return if >= 0.80 ✓
    │                   │
    │ 2. spaCy          │ (skipped - embedding succeeded)
    │                   │
    │ 3. Regex          │ (skipped - embedding succeeded)
    └───────────────────┘
            │
            ▼
    SemanticComponents(
        action_verb="bring",
        confidence=0.89,
        method="embedding"
    )
```

---

## Pattern Categories

| Category | Count | Examples |
|----------|-------|----------|
| action | 14 | bring to front, enable, rotate, select |
| outcome | 9 | moves to highest z-order, is enabled |
| boundary | 6 | no selection, already at top |

---

## Adding New Patterns

Edit `patterns/ac_patterns.json`:

```json
{
  "id": "action_custom",
  "canonical": "your action",
  "category": "action",
  "subcategory": "custom",
  "synonyms": [
    "alternative phrasing 1",
    "alternative phrasing 2"
  ]
}
```

Then reload the pattern index to re-embed.

---

## Cost Estimate

OpenAI text-embedding-3-small: **$0.02 per 1M tokens**

| Usage | Tokens | Cost |
|-------|--------|------|
| Initial pattern embedding (~200 texts) | ~2,000 | $0.00004 |
| 1 AC bullet (~10 words) | ~15 | $0.0000003 |
| 1 story (5 bullets) | ~75 | $0.0000015 |
| 100 stories/month | ~7,500 | **$0.00015** |

With caching, most queries are free after first call.
