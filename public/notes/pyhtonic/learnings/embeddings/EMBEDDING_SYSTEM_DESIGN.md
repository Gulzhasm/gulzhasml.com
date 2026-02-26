# Embedding System Design for NLP-Based Test Generation

## Table of Contents
1. [What Are Embeddings?](#1-what-are-embeddings)
2. [Why Embeddings for AC Parsing?](#2-why-embeddings-for-ac-parsing)
3. [Architecture Overview](#3-architecture-overview)
4. [Component Deep Dive](#4-component-deep-dive)
5. [Implementation Walkthrough](#5-implementation-walkthrough)
6. [Integration with Existing System](#6-integration-with-existing-system)
7. [Performance & Cost Considerations](#7-performance--cost-considerations)
8. [Testing Strategy](#8-testing-strategy)

---

## 1. What Are Embeddings?

### 1.1 The Concept

**Embeddings** are numerical representations of text where **semantic similarity is preserved as geometric proximity**.

```
Text: "bring to front"
      ↓ (embedding model)
Vector: [0.12, 0.85, -0.23, 0.67, ..., 0.34]  (1536 dimensions)
```

### 1.2 Key Property: Semantic Similarity

Similar meanings → Similar vectors → High cosine similarity

```python
# Example similarity scores
cosine_similarity("bring to front", "move above objects") = 0.92  # Similar!
cosine_similarity("bring to front", "delete file")        = 0.23  # Different
cosine_similarity("bring to front", "bring to front")     = 1.00  # Identical
```

### 1.3 How Cosine Similarity Works

```
         Vector A
           ↗
          /
         /  θ (angle)
        /____→ Vector B

Cosine Similarity = cos(θ)
- θ = 0°   → cos(0°) = 1.0   (identical direction)
- θ = 90°  → cos(90°) = 0.0  (perpendicular/unrelated)
- θ = 180° → cos(180°) = -1.0 (opposite meaning)
```

**Formula:**
```
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)

Where:
- A · B = dot product (sum of element-wise multiplication)
- ||A|| = magnitude/norm of vector A
```

### 1.4 Embedding Models

| Model | Provider | Dimensions | Cost | Quality |
|-------|----------|------------|------|---------|
| text-embedding-3-small | OpenAI | 1536 | $0.02/1M tokens | Good |
| text-embedding-3-large | OpenAI | 3072 | $0.13/1M tokens | Better |
| all-MiniLM-L6-v2 | HuggingFace | 384 | Free (local) | Good |
| text-embedding-ada-002 | OpenAI | 1536 | $0.10/1M tokens | Legacy |

---

## 2. Why Embeddings for AC Parsing?

### 2.1 The Problem with Regex

Current `ACParser` uses hardcoded patterns:

```python
# From ac_parser.py
ACTION_PATTERNS = [
    (r'(bring|move|send)\s+(?:to\s+)?(front|back|above|under)', r'\1 to \2'),
]
```

**Limitation:** Only matches exact word patterns.

### 2.2 Real-World AC Variations

Users write acceptance criteria in many ways:

| Intended Meaning | User Wrote | Regex Match? |
|-----------------|------------|--------------|
| Bring to front | "bring to front" | ✅ Yes |
| Bring to front | "move above other objects" | ❌ No |
| Bring to front | "elevate z-order" | ❌ No |
| Bring to front | "place on top layer" | ❌ No |
| Bring to front | "put in front of everything" | ❌ No |

### 2.3 Embedding Solution

```
Step 1: Pre-embed canonical patterns
        "bring to front" → Vector_A

Step 2: Embed user's AC text
        "move above other objects" → Vector_B

Step 3: Calculate similarity
        cosine_similarity(Vector_A, Vector_B) = 0.92

Step 4: If similarity > threshold (0.80), it's a match!
        Result: "move above other objects" → "bring to front"
```

### 2.4 Benefits Summary

| Aspect | Regex | Embeddings |
|--------|-------|------------|
| Exact matches | ✅ Fast | ✅ Works |
| Synonyms | ❌ Needs new pattern | ✅ Automatic |
| Paraphrases | ❌ Needs new pattern | ✅ Automatic |
| Typos | ❌ Fails | ⚠️ Usually works |
| Maintenance | High (add patterns) | Low (add synonyms) |
| Cost | Free | API cost |
| Latency | ~0ms | ~100ms |

---

## 3. Architecture Overview

### 3.1 System Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    HybridACParser                            │
│  (Orchestrates parsing with fallback chain)                 │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ EmbeddingParser │  │  SpacyParser    │  │   ACParser      │
│ (Layer 1: NEW)  │  │ (Layer 2: NLP)  │  │ (Layer 3: Regex)│
│                 │  │                 │  │                 │
│ Confidence:0.80+│  │ Confidence:0.70+│  │ Always works    │
└────────┬────────┘  └─────────────────┘  └─────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                   SemanticMatcher                            │
│  (Finds similar patterns using cosine similarity)           │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                 EmbeddingPatternIndex                        │
│  (Pre-computed embeddings for canonical patterns)           │
└─────────────────────────────────────────────────────────────┘
         │
         ├──────────────────────┐
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│ EmbeddingCache  │    │ IEmbeddingProvider│
│ (30-day TTL)    │    │ (OpenAI API)     │
└─────────────────┘    └─────────────────┘
```

### 3.2 Data Flow

```
Input: "User can move the shape above all other objects"
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. EmbeddingParser.parse(text)                              │
│    - Check cache for existing embedding                     │
│    - If miss: Call OpenAI API → Get vector                  │
│    - Store in cache                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. SemanticMatcher.match_action(text)                       │
│    - Get text embedding                                     │
│    - Compare with all action pattern embeddings             │
│    - Return best match with similarity score                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Build SemanticComponents                                 │
│    - action_verb: "bring" (from matched pattern)            │
│    - confidence: 0.92 (similarity score)                    │
│    - method: "embedding"                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
Output: SemanticComponents(action_verb="bring", confidence=0.92)
```

### 3.3 File Structure

```
core/services/embeddings/
├── __init__.py                 # Public exports
├── embedding_interface.py      # IEmbeddingProvider, EmbeddingResult, SimilarityMatch
├── embedding_cache.py          # EmbeddingCache (file-based, 30-day TTL)
├── pattern_index.py            # EmbeddingPatternIndex (pre-computed patterns)
├── semantic_matcher.py         # SemanticMatcher (similarity search)
└── providers/
    ├── __init__.py
    ├── openai_embeddings.py    # OpenAIEmbeddingProvider
    └── provider_factory.py     # create_embedding_provider()

core/services/nlp/
├── embedding_parser.py         # EmbeddingSemanticParser (NEW)
└── hybrid_parser.py            # Modified to add embedding layer

patterns/
└── ac_patterns.json            # Canonical patterns + synonyms
```

---

## 4. Component Deep Dive

### 4.1 IEmbeddingProvider Interface

**Purpose:** Abstract interface for embedding providers (OpenAI, local models, etc.)

```python
class IEmbeddingProvider(ABC):
    @property
    def provider_name(self) -> str: ...      # "openai"

    @property
    def model_name(self) -> str: ...         # "text-embedding-3-small"

    @property
    def dimensions(self) -> int: ...         # 1536

    def embed(self, text: str) -> EmbeddingResult: ...
    def embed_batch(self, texts: List[str]) -> List[EmbeddingResult]: ...
    def is_available(self) -> bool: ...
```

**Design Decision:** Interface allows swapping providers without changing calling code.

### 4.2 EmbeddingResult

**Purpose:** Encapsulates embedding output with metadata.

```python
@dataclass
class EmbeddingResult:
    text: str           # Original input text
    vector: np.ndarray  # 1536-dim numpy array
    model: str          # "text-embedding-3-small"
    dimensions: int     # 1536
    usage: dict         # {"prompt_tokens": 5, "total_tokens": 5}
```

**Design Decision:** Store usage for cost tracking.

### 4.3 EmbeddingCache

**Purpose:** Persist embeddings to avoid redundant API calls.

**Key Design Decisions:**
- **30-day TTL:** Embeddings don't change (same text → same vector)
- **Key = hash(model + text):** Same text with different model = different cache entry
- **File-based:** Survives process restarts

```python
# Cache lookup
cached = cache.get("bring to front", "text-embedding-3-small")
if cached:
    return cached  # Skip API call

# Cache miss - compute and store
result = provider.embed("bring to front")
cache.set(result)
```

### 4.4 EmbeddingPatternIndex

**Purpose:** Pre-compute embeddings for canonical patterns at startup.

```python
# Pattern structure
{
    "id": "action_bring_to_front",
    "canonical": "bring to front",
    "category": "action",
    "synonyms": ["move above", "elevate z-order", "place on top"],
    "embedding": [0.12, 0.85, ...]  # Pre-computed
}
```

**Key Design Decisions:**
- Embed canonical + all synonyms at load time
- Store in numpy array for fast vectorized similarity search
- Group by category (action, outcome, boundary) for targeted search

### 4.5 SemanticMatcher

**Purpose:** Find best matching pattern using cosine similarity.

```python
def find_similar(self, text: str, category: str = None) -> List[SimilarityMatch]:
    # 1. Embed input text
    query_embedding = self.provider.embed(text)

    # 2. Get all pattern embeddings for category
    pattern_embeddings = self.index.get_embeddings(category)

    # 3. Compute similarities (vectorized for speed)
    similarities = cosine_similarity_batch(query_embedding, pattern_embeddings)

    # 4. Filter by threshold and sort
    matches = [m for m in similarities if m.score >= self.threshold]
    return sorted(matches, key=lambda m: m.score, reverse=True)
```

### 4.6 EmbeddingSemanticParser

**Purpose:** Implements `ISemanticParser` using embeddings.

```python
class EmbeddingSemanticParser(ISemanticParser):
    def parse(self, text: str) -> SemanticComponents:
        # Match action
        action_match = self.matcher.match_action(text)

        # Match outcome
        outcome_match = self.matcher.match_outcome(text)

        # Calculate confidence
        confidence = self._calculate_confidence(action_match, outcome_match)

        return SemanticComponents(
            action_verb=action_match.pattern_text if action_match else "",
            confidence=confidence,
            method="embedding"
        )
```

---

## 5. Implementation Walkthrough

### 5.1 Phase 1: Foundation

**Files Created:**
- `embedding_interface.py` - Core interfaces
- `embedding_cache.py` - Persistence layer
- `providers/openai_embeddings.py` - OpenAI integration
- `providers/provider_factory.py` - Provider creation

**Testing Phase 1:**
```python
from core.services.embeddings import create_embedding_provider

provider = create_embedding_provider()
result = provider.embed("bring to front")
print(f"Vector shape: {result.vector.shape}")  # (1536,)
```

### 5.2 Phase 2: Pattern Index

**Files Created:**
- `pattern_index.py` - Pattern loading and indexing
- `semantic_matcher.py` - Similarity search
- `patterns/ac_patterns.json` - Pattern definitions

**Testing Phase 2:**
```python
from core.services.embeddings import SemanticMatcher

matcher = SemanticMatcher(provider, pattern_index)
matches = matcher.find_similar("move above other objects", category="action")
print(f"Best match: {matches[0].pattern_text}")  # "bring to front"
print(f"Similarity: {matches[0].similarity_score}")  # 0.92
```

### 5.3 Phase 3: Parser Integration

**Files Created/Modified:**
- `nlp/embedding_parser.py` - New parser implementation
- `nlp/hybrid_parser.py` - Add embedding layer to fallback chain

**Testing Phase 3:**
```python
from core.services.nlp import create_parser

parser = create_parser(embedding_enabled=True)
result = parser.parse("move the shape above all other objects")
print(f"Method used: {parser.last_method}")  # "embedding"
print(f"Action: {result.action_verb}")  # "bring"
```

---

## 6. Integration with Existing System

### 6.1 Fallback Chain

```python
# In HybridACParser.parse()

def parse(self, text: str) -> SemanticComponents:
    # Layer 1: Try embedding (highest quality)
    if self._embedding_parser:
        result = self._embedding_parser.parse(text)
        if result.confidence >= 0.80:
            return result  # Use embedding result

    # Layer 2: Try spaCy (linguistic analysis)
    if self._spacy_parser:
        result = self._spacy_parser.parse(text)
        if result.confidence >= 0.70:
            return result  # Use spaCy result

    # Layer 3: Regex fallback (always works)
    return self._regex_parser.parse(text)
```

### 6.2 Graceful Degradation

```
Scenario: OpenAI API unavailable

1. EmbeddingParser.is_available → False
2. HybridParser skips embedding layer
3. Falls back to spaCy → Regex
4. System continues working (degraded quality)
```

### 6.3 Configuration

```bash
# .env
EMBEDDING_ENABLED=true
EMBEDDING_PROVIDER=openai
EMBEDDING_MODEL=text-embedding-3-small
EMBEDDING_THRESHOLD=0.80
EMBEDDING_CACHE_TTL_DAYS=30
```

---

## 7. Performance & Cost Considerations

### 7.1 Latency

| Operation | Latency |
|-----------|---------|
| Regex parsing | <1ms |
| spaCy parsing | ~10ms |
| Embedding (cached) | <1ms |
| Embedding (API call) | ~100-200ms |

**Optimization:** Cache aggressively. Most AC text will repeat.

### 7.2 Cost

OpenAI text-embedding-3-small: $0.02 per 1M tokens

| Scenario | Tokens | Cost |
|----------|--------|------|
| 1 AC bullet (~10 words) | ~15 | $0.0000003 |
| 1 story (5 bullets) | ~75 | $0.0000015 |
| 100 stories/month | ~7,500 | $0.00015 |

**Conclusion:** Cost is negligible (~$0.01/month for typical usage).

### 7.3 Caching Strategy

```
Cache Hit Rate Goal: 90%+

Strategies:
1. Pre-embed all patterns at startup
2. Cache all runtime queries for 30 days
3. Batch embed multiple texts in single API call
```

---

## 8. Testing Strategy

### 8.1 Unit Tests

**Test: Cosine Similarity**
```python
def test_cosine_similarity_identical():
    vec = np.array([1.0, 0.0, 0.0])
    assert cosine_similarity(vec, vec) == 1.0

def test_cosine_similarity_orthogonal():
    vec1 = np.array([1.0, 0.0])
    vec2 = np.array([0.0, 1.0])
    assert cosine_similarity(vec1, vec2) == 0.0
```

**Test: Cache**
```python
def test_cache_hit():
    cache.set(embedding_result)
    cached = cache.get("text", "model")
    assert cached is not None
    assert np.array_equal(cached.vector, embedding_result.vector)
```

### 8.2 Integration Tests

**Test: Novel Phrasing Recognition**
```python
def test_novel_phrasing_matches_canonical():
    parser = create_parser(embedding_enabled=True)

    # These are NOT in regex patterns
    novel_phrases = [
        "move above other objects",
        "elevate z-order",
        "place on top layer",
    ]

    for phrase in novel_phrases:
        result = parser.parse(phrase)
        assert result.action_verb in ["bring", "move"]
        assert result.confidence >= 0.75
```

### 8.3 Accuracy Benchmarks

```python
def benchmark_embedding_accuracy():
    """Compare regex vs embedding accuracy on test corpus."""

    test_cases = [
        ("bring to front", "bring"),      # Exact match
        ("move above others", "bring"),   # Synonym
        ("elevate z-order", "bring"),     # Technical term
        ("delete the file", None),        # Should NOT match "bring"
    ]

    regex_correct = 0
    embedding_correct = 0

    for text, expected in test_cases:
        regex_result = regex_parser.parse(text)
        embedding_result = embedding_parser.parse(text)

        if regex_result.action_verb == expected:
            regex_correct += 1
        if embedding_result.action_verb == expected:
            embedding_correct += 1

    print(f"Regex accuracy: {regex_correct}/{len(test_cases)}")
    print(f"Embedding accuracy: {embedding_correct}/{len(test_cases)}")
```

---

## Summary

The embedding system adds a semantic understanding layer to AC parsing:

1. **Converts text to vectors** using OpenAI API
2. **Matches novel phrasings** to canonical patterns via cosine similarity
3. **Caches results** to minimize API calls and latency
4. **Falls back gracefully** to spaCy/regex when unavailable

This enables the test-gen framework to handle diverse AC writing styles without requiring pattern updates.
