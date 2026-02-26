# Embedding Implementation Guide

Step-by-step implementation guide with code examples.

---

## Phase 1: Foundation Components

### Step 1.1: Create Directory Structure

```bash
mkdir -p core/services/embeddings/providers
```

### Step 1.2: Create `embedding_interface.py`

**Purpose:** Define abstract interfaces that all providers must implement.

```python
# core/services/embeddings/embedding_interface.py

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
import numpy as np


@dataclass
class EmbeddingResult:
    """Result of embedding generation."""
    text: str                          # Original input
    vector: np.ndarray                 # Embedding vector (1536 dims for OpenAI)
    model: str                         # Model used
    dimensions: int                    # Vector length
    usage: Optional[Dict[str, int]] = None  # Token usage for cost tracking

    def to_dict(self) -> Dict[str, Any]:
        """Serialize for cache storage."""
        return {
            "text": self.text,
            "vector": self.vector.tolist(),  # numpy → list for JSON
            "model": self.model,
            "dimensions": self.dimensions,
            "usage": self.usage
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "EmbeddingResult":
        """Deserialize from cache."""
        return cls(
            text=data["text"],
            vector=np.array(data["vector"]),  # list → numpy
            model=data["model"],
            dimensions=data["dimensions"],
            usage=data.get("usage")
        )


@dataclass
class SimilarityMatch:
    """Result of similarity search."""
    pattern_id: str           # Unique pattern identifier
    pattern_text: str         # Canonical pattern text
    category: str             # "action", "outcome", "boundary"
    similarity_score: float   # 0.0 to 1.0
    metadata: Dict[str, Any] = field(default_factory=dict)


class IEmbeddingProvider(ABC):
    """Abstract interface for embedding providers."""

    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Return provider name (e.g., 'openai')."""
        pass

    @property
    @abstractmethod
    def model_name(self) -> str:
        """Return model name (e.g., 'text-embedding-3-small')."""
        pass

    @property
    @abstractmethod
    def dimensions(self) -> int:
        """Return embedding dimensions (e.g., 1536)."""
        pass

    @abstractmethod
    def embed(self, text: str) -> Optional[EmbeddingResult]:
        """Generate embedding for single text."""
        pass

    @abstractmethod
    def embed_batch(self, texts: List[str]) -> List[EmbeddingResult]:
        """Generate embeddings for multiple texts (more efficient)."""
        pass

    @abstractmethod
    def is_available(self) -> bool:
        """Check if provider is configured and working."""
        pass


def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """Calculate cosine similarity between two vectors.

    Returns value between -1 and 1:
    - 1.0 = identical direction (same meaning)
    - 0.0 = perpendicular (unrelated)
    - -1.0 = opposite direction (opposite meaning)
    """
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)

    if norm1 == 0 or norm2 == 0:
        return 0.0

    return float(np.dot(vec1, vec2) / (norm1 * norm2))
```

**Key Concepts:**
- `@dataclass` - Python's built-in for creating data classes with auto-generated `__init__`
- `ABC` - Abstract Base Class for defining interfaces
- `np.ndarray` - Numpy array for efficient vector operations
- `cosine_similarity` - Core algorithm for comparing embeddings

---

### Step 1.3: Create `embedding_cache.py`

**Purpose:** Persist embeddings to disk to avoid redundant API calls.

```python
# core/services/embeddings/embedding_cache.py

import hashlib
import json
from datetime import datetime, timedelta
from pathlib import Path
from threading import Lock
from typing import Optional, Dict, List, Any

from .embedding_interface import EmbeddingResult


class EmbeddingCache:
    """File-based cache for embeddings with 30-day TTL."""

    INDEX_FILE = "embedding_index.json"

    def __init__(
        self,
        cache_dir: str = ".cache/embeddings",
        default_ttl: Optional[timedelta] = None,
        max_entries: int = 50000
    ):
        self._cache_dir = Path(cache_dir)
        self._cache_dir.mkdir(parents=True, exist_ok=True)
        self._default_ttl = default_ttl or timedelta(days=30)
        self._max_entries = max_entries
        self._lock = Lock()  # Thread safety
        self._hits = 0
        self._misses = 0
        self._index = self._load_index()

    def _get_cache_key(self, text: str, model: str) -> str:
        """Generate unique key from text + model.

        Same text with different model = different embedding.
        """
        combined = f"{model}:{text}"
        return hashlib.sha256(combined.encode()).hexdigest()

    def get(self, text: str, model: str) -> Optional[EmbeddingResult]:
        """Retrieve cached embedding if exists and not expired."""
        key = self._get_cache_key(text, model)

        with self._lock:
            if key not in self._index:
                self._misses += 1
                return None

            # Check expiration
            entry = self._index[key]
            expires_at = datetime.fromisoformat(entry["expires_at"])
            if datetime.now() > expires_at:
                self._delete_entry(key)
                self._misses += 1
                return None

            # Read from file
            file_path = self._cache_dir / f"{key[:32]}.json"
            try:
                with open(file_path) as f:
                    data = json.load(f)
                self._hits += 1
                return EmbeddingResult.from_dict(data["embedding"])
            except (FileNotFoundError, json.JSONDecodeError):
                self._delete_entry(key)
                self._misses += 1
                return None

    def set(self, result: EmbeddingResult, ttl: Optional[timedelta] = None) -> None:
        """Store embedding in cache."""
        key = self._get_cache_key(result.text, result.model)

        with self._lock:
            # Evict if at capacity
            while len(self._index) >= self._max_entries:
                self._evict_oldest()

            expires_at = datetime.now() + (ttl or self._default_ttl)
            file_path = self._cache_dir / f"{key[:32]}.json"

            # Write embedding to file
            data = {
                "embedding": result.to_dict(),
                "created_at": datetime.now().isoformat(),
                "expires_at": expires_at.isoformat()
            }
            with open(file_path, 'w') as f:
                json.dump(data, f)

            # Update index
            self._index[key] = {
                "model": result.model,
                "expires_at": expires_at.isoformat()
            }
            self._save_index()

    # ... (helper methods: _load_index, _save_index, _delete_entry, _evict_oldest)
```

**Key Concepts:**
- **SHA-256 hash** - Creates unique, fixed-length key from any text
- **Thread Lock** - Prevents race conditions in multi-threaded usage
- **TTL (Time-To-Live)** - Embeddings expire after 30 days
- **LRU eviction** - Oldest entries removed when cache is full

---

### Step 1.4: Create `providers/openai_embeddings.py`

**Purpose:** Implement OpenAI embedding API integration.

```python
# core/services/embeddings/providers/openai_embeddings.py

import os
from typing import List, Optional
import numpy as np

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

from ..embedding_interface import IEmbeddingProvider, EmbeddingResult


class OpenAIEmbeddingProvider(IEmbeddingProvider):
    """OpenAI embedding provider using text-embedding-3-small."""

    MODEL_DIMENSIONS = {
        "text-embedding-3-small": 1536,
        "text-embedding-3-large": 3072,
    }

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: str = "text-embedding-3-small",
        timeout: int = 30
    ):
        self._api_key = api_key or os.getenv("OPENAI_API_KEY")
        self._model = model
        self._timeout = timeout
        self._client: Optional[OpenAI] = None
        self._dimensions = self.MODEL_DIMENSIONS.get(model, 1536)

    @property
    def provider_name(self) -> str:
        return "openai"

    @property
    def model_name(self) -> str:
        return self._model

    @property
    def dimensions(self) -> int:
        return self._dimensions

    @property
    def client(self) -> Optional[OpenAI]:
        """Lazy initialization - only create client when needed."""
        if self._client is None and OPENAI_AVAILABLE and self._api_key:
            self._client = OpenAI(api_key=self._api_key, timeout=self._timeout)
        return self._client

    def embed(self, text: str) -> Optional[EmbeddingResult]:
        """Generate embedding for single text."""
        if not self.is_available():
            return None

        try:
            # OpenAI recommends replacing newlines
            clean_text = text.replace("\n", " ").strip()

            response = self.client.embeddings.create(
                model=self._model,
                input=clean_text
            )

            vector = np.array(response.data[0].embedding)

            return EmbeddingResult(
                text=text,
                vector=vector,
                model=self._model,
                dimensions=len(vector),
                usage={
                    "prompt_tokens": response.usage.prompt_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            )
        except Exception as e:
            print(f"OpenAI embedding error: {e}")
            return None

    def embed_batch(self, texts: List[str]) -> List[EmbeddingResult]:
        """Batch embed multiple texts in single API call."""
        if not self.is_available() or not texts:
            return []

        try:
            clean_texts = [t.replace("\n", " ").strip() for t in texts]

            response = self.client.embeddings.create(
                model=self._model,
                input=clean_texts
            )

            results = []
            for i, embedding_data in enumerate(response.data):
                results.append(EmbeddingResult(
                    text=texts[i],
                    vector=np.array(embedding_data.embedding),
                    model=self._model,
                    dimensions=self._dimensions
                ))
            return results
        except Exception as e:
            print(f"OpenAI batch embedding error: {e}")
            return []

    def is_available(self) -> bool:
        """Check if OpenAI is configured."""
        return OPENAI_AVAILABLE and self._api_key and self.client is not None
```

**Key Concepts:**
- **Lazy initialization** - Client created only when first used
- **Batch embedding** - More efficient for multiple texts
- **Error handling** - Returns None instead of crashing

---

### Step 1.5: Create `providers/provider_factory.py`

**Purpose:** Factory function to create providers from configuration.

```python
# core/services/embeddings/providers/provider_factory.py

import os
from typing import Optional
from ..embedding_interface import IEmbeddingProvider
from .openai_embeddings import OpenAIEmbeddingProvider


def create_embedding_provider(
    provider_type: Optional[str] = None,
    model: Optional[str] = None,
    api_key: Optional[str] = None
) -> Optional[IEmbeddingProvider]:
    """Create embedding provider from configuration.

    Args:
        provider_type: "openai" (default from EMBEDDING_PROVIDER env)
        model: Model name (default from EMBEDDING_MODEL env)
        api_key: API key (default from OPENAI_API_KEY env)

    Returns:
        Configured provider or None if unavailable
    """
    if provider_type is None:
        provider_type = os.getenv("EMBEDDING_PROVIDER", "openai")

    if provider_type.lower() == "openai":
        if model is None:
            model = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")
        return OpenAIEmbeddingProvider(api_key=api_key, model=model)

    return None
```

**Key Concepts:**
- **Factory pattern** - Centralizes object creation
- **Environment variables** - Configuration without code changes

---

## Phase 2: Pattern Index & Semantic Matcher

### Step 2.1: Create `patterns/ac_patterns.json`

**Purpose:** Define canonical patterns with synonyms.

```json
{
  "version": "1.0",
  "description": "AC patterns for semantic matching",
  "patterns": [
    {
      "id": "action_bring_to_front",
      "canonical": "bring to front",
      "category": "action",
      "subcategory": "z_order",
      "synonyms": [
        "move to front",
        "move above other objects",
        "place on top layer",
        "elevate z-order",
        "bring above all",
        "put in front of everything"
      ],
      "regex_fallback": "(bring|move|send)\\s+(?:to\\s+)?(front|above)"
    },
    {
      "id": "action_send_to_back",
      "canonical": "send to back",
      "category": "action",
      "subcategory": "z_order",
      "synonyms": [
        "move to back",
        "move behind other objects",
        "place on bottom layer",
        "lower z-order",
        "send under all"
      ]
    },
    {
      "id": "action_enable",
      "canonical": "enable",
      "category": "action",
      "subcategory": "state",
      "synonyms": [
        "turn on",
        "activate",
        "make available",
        "switch on"
      ]
    },
    {
      "id": "action_disable",
      "canonical": "disable",
      "category": "action",
      "subcategory": "state",
      "synonyms": [
        "turn off",
        "deactivate",
        "make unavailable",
        "switch off",
        "gray out"
      ]
    },
    {
      "id": "outcome_moves_to_top",
      "canonical": "moves to highest z-order",
      "category": "outcome",
      "subcategory": "z_order",
      "synonyms": [
        "appears above all",
        "rendered on top",
        "displayed in front",
        "moves to top layer"
      ]
    },
    {
      "id": "outcome_is_enabled",
      "canonical": "is enabled",
      "category": "outcome",
      "subcategory": "state",
      "synonyms": [
        "becomes active",
        "is available",
        "can be used",
        "is clickable"
      ]
    },
    {
      "id": "outcome_is_disabled",
      "canonical": "is disabled",
      "category": "outcome",
      "subcategory": "state",
      "synonyms": [
        "is grayed out",
        "cannot be clicked",
        "is inactive",
        "is unavailable"
      ]
    },
    {
      "id": "boundary_no_selection",
      "canonical": "no selection",
      "category": "boundary",
      "synonyms": [
        "nothing selected",
        "no object selected",
        "empty selection",
        "without selection"
      ]
    },
    {
      "id": "boundary_at_top",
      "canonical": "already at top",
      "category": "boundary",
      "synonyms": [
        "at highest z-order",
        "already in front",
        "at top layer"
      ]
    }
  ]
}
```

---

### Step 2.2: Create `pattern_index.py`

**Purpose:** Load patterns and pre-compute embeddings.

```python
# core/services/embeddings/pattern_index.py

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional
import numpy as np

from .embedding_interface import IEmbeddingProvider, EmbeddingResult
from .embedding_cache import EmbeddingCache


@dataclass
class PatternEntry:
    """Single pattern with embedding."""
    pattern_id: str
    canonical: str
    category: str
    subcategory: Optional[str]
    synonyms: List[str]
    embedding: np.ndarray
    regex_fallback: Optional[str] = None


class EmbeddingPatternIndex:
    """Pre-computed pattern embeddings for fast similarity search."""

    def __init__(
        self,
        provider: IEmbeddingProvider,
        cache: Optional[EmbeddingCache] = None,
        patterns_file: str = "patterns/ac_patterns.json"
    ):
        self._provider = provider
        self._cache = cache or EmbeddingCache()
        self._patterns_file = patterns_file
        self._patterns: Dict[str, PatternEntry] = {}
        self._category_index: Dict[str, List[str]] = {}  # category → [pattern_ids]

    def load_patterns(self) -> None:
        """Load patterns from JSON and compute embeddings."""
        patterns_path = Path(self._patterns_file)
        if not patterns_path.exists():
            raise FileNotFoundError(f"Patterns file not found: {self._patterns_file}")

        with open(patterns_path) as f:
            data = json.load(f)

        # Collect all texts to embed
        texts_to_embed = []
        text_to_pattern = {}  # text → (pattern_id, is_canonical)

        for pattern in data["patterns"]:
            pattern_id = pattern["id"]

            # Canonical text
            canonical = pattern["canonical"]
            texts_to_embed.append(canonical)
            text_to_pattern[canonical] = (pattern_id, True)

            # Synonyms
            for synonym in pattern.get("synonyms", []):
                texts_to_embed.append(synonym)
                text_to_pattern[synonym] = (pattern_id, False)

        # Batch embed all texts
        embeddings = self._embed_all(texts_to_embed)

        # Build pattern entries
        for pattern in data["patterns"]:
            pattern_id = pattern["id"]
            canonical = pattern["canonical"]

            # Get canonical embedding
            canonical_embedding = embeddings.get(canonical)
            if canonical_embedding is None:
                continue

            entry = PatternEntry(
                pattern_id=pattern_id,
                canonical=canonical,
                category=pattern["category"],
                subcategory=pattern.get("subcategory"),
                synonyms=pattern.get("synonyms", []),
                embedding=canonical_embedding,
                regex_fallback=pattern.get("regex_fallback")
            )

            self._patterns[pattern_id] = entry

            # Update category index
            category = pattern["category"]
            if category not in self._category_index:
                self._category_index[category] = []
            self._category_index[category].append(pattern_id)

    def _embed_all(self, texts: List[str]) -> Dict[str, np.ndarray]:
        """Embed all texts, using cache where possible."""
        results = {}
        texts_to_compute = []

        # Check cache first
        for text in texts:
            cached = self._cache.get(text, self._provider.model_name)
            if cached:
                results[text] = cached.vector
            else:
                texts_to_compute.append(text)

        # Batch compute remaining
        if texts_to_compute:
            computed = self._provider.embed_batch(texts_to_compute)
            for result in computed:
                results[result.text] = result.vector
                self._cache.set(result)

        return results

    def get_patterns_by_category(self, category: str) -> List[PatternEntry]:
        """Get all patterns in a category."""
        pattern_ids = self._category_index.get(category, [])
        return [self._patterns[pid] for pid in pattern_ids]

    def get_all_embeddings(self, category: Optional[str] = None) -> np.ndarray:
        """Get all embeddings as numpy array for vectorized search."""
        if category:
            patterns = self.get_patterns_by_category(category)
        else:
            patterns = list(self._patterns.values())

        return np.array([p.embedding for p in patterns])

    def get_pattern_by_id(self, pattern_id: str) -> Optional[PatternEntry]:
        """Get pattern by ID."""
        return self._patterns.get(pattern_id)
```

**Key Concepts:**
- **Batch embedding** - More efficient than individual calls
- **Category index** - Fast lookup by category (action, outcome, etc.)
- **Numpy array** - Enables vectorized similarity computation

---

### Step 2.3: Create `semantic_matcher.py`

**Purpose:** Find similar patterns using cosine similarity.

```python
# core/services/embeddings/semantic_matcher.py

from typing import List, Optional
import numpy as np

from .embedding_interface import (
    IEmbeddingProvider,
    SimilarityMatch,
    cosine_similarity
)
from .embedding_cache import EmbeddingCache
from .pattern_index import EmbeddingPatternIndex


class SemanticMatcher:
    """Find similar patterns using embedding similarity."""

    def __init__(
        self,
        provider: IEmbeddingProvider,
        pattern_index: EmbeddingPatternIndex,
        cache: Optional[EmbeddingCache] = None,
        threshold: float = 0.80
    ):
        self._provider = provider
        self._index = pattern_index
        self._cache = cache or EmbeddingCache()
        self._threshold = threshold

    def find_similar(
        self,
        text: str,
        category: Optional[str] = None,
        top_k: int = 5
    ) -> List[SimilarityMatch]:
        """Find most similar patterns to input text.

        Args:
            text: Input text to match
            category: Filter by category (action, outcome, boundary)
            top_k: Number of top matches to return

        Returns:
            List of SimilarityMatch sorted by score (highest first)
        """
        # Get or compute embedding for input text
        cached = self._cache.get(text, self._provider.model_name)
        if cached:
            query_vector = cached.vector
        else:
            result = self._provider.embed(text)
            if result is None:
                return []
            query_vector = result.vector
            self._cache.set(result)

        # Get patterns to compare
        if category:
            patterns = self._index.get_patterns_by_category(category)
        else:
            patterns = list(self._index._patterns.values())

        if not patterns:
            return []

        # Compute similarities
        matches = []
        for pattern in patterns:
            score = cosine_similarity(query_vector, pattern.embedding)

            if score >= self._threshold:
                matches.append(SimilarityMatch(
                    pattern_id=pattern.pattern_id,
                    pattern_text=pattern.canonical,
                    category=pattern.category,
                    similarity_score=score,
                    metadata={"subcategory": pattern.subcategory}
                ))

        # Sort by score and return top_k
        matches.sort(key=lambda m: m.similarity_score, reverse=True)
        return matches[:top_k]

    def match_action(self, text: str) -> Optional[SimilarityMatch]:
        """Find best matching action pattern."""
        matches = self.find_similar(text, category="action", top_k=1)
        return matches[0] if matches else None

    def match_outcome(self, text: str) -> Optional[SimilarityMatch]:
        """Find best matching outcome pattern."""
        matches = self.find_similar(text, category="outcome", top_k=1)
        return matches[0] if matches else None

    def match_boundary(self, text: str) -> Optional[SimilarityMatch]:
        """Find best matching boundary pattern."""
        matches = self.find_similar(text, category="boundary", top_k=1)
        return matches[0] if matches else None
```

---

## Phase 3: Parser Integration

### Step 3.1: Create `nlp/embedding_parser.py`

**Purpose:** Implement `ISemanticParser` using embeddings.

```python
# core/services/nlp/embedding_parser.py

from typing import List, Optional, Tuple

from core.interfaces.semantic_parser import ISemanticParser, SemanticComponents
from core.services.embeddings import (
    IEmbeddingProvider,
    EmbeddingCache,
    EmbeddingPatternIndex,
    SemanticMatcher,
    create_embedding_provider
)


class EmbeddingSemanticParser(ISemanticParser):
    """Semantic parser using embedding similarity matching."""

    def __init__(
        self,
        provider: Optional[IEmbeddingProvider] = None,
        pattern_index: Optional[EmbeddingPatternIndex] = None,
        cache: Optional[EmbeddingCache] = None,
        threshold: float = 0.80
    ):
        self._provider = provider or create_embedding_provider()
        self._cache = cache or EmbeddingCache()
        self._threshold = threshold

        # Initialize pattern index
        if pattern_index:
            self._index = pattern_index
        else:
            self._index = EmbeddingPatternIndex(self._provider, self._cache)
            self._index.load_patterns()

        # Initialize matcher
        self._matcher = SemanticMatcher(
            self._provider,
            self._index,
            self._cache,
            self._threshold
        )

    @property
    def is_available(self) -> bool:
        """Check if parser is ready."""
        return self._provider is not None and self._provider.is_available()

    @property
    def parser_name(self) -> str:
        return "embedding"

    def parse(self, text: str) -> SemanticComponents:
        """Parse text using embedding similarity."""
        if not self.is_available:
            return self._empty_result()

        # Match action
        action_match = self._matcher.match_action(text)

        # Match outcome
        outcome_match = self._matcher.match_outcome(text)

        # Calculate confidence
        confidence = self._calculate_confidence(action_match, outcome_match)

        # Extract action verb from matched pattern
        action_verb = ""
        if action_match:
            # Extract first word of canonical as action verb
            action_verb = action_match.pattern_text.split()[0]

        return SemanticComponents(
            subject="user",
            action_verb=action_verb,
            direct_object=action_match.pattern_text if action_match else "",
            confidence=confidence,
            method="embedding"
        )

    def _calculate_confidence(self, action_match, outcome_match) -> float:
        """Calculate overall confidence from matches."""
        scores = []
        if action_match:
            scores.append(action_match.similarity_score)
        if outcome_match:
            scores.append(outcome_match.similarity_score)

        if not scores:
            return 0.0

        return sum(scores) / len(scores)

    def _empty_result(self) -> SemanticComponents:
        """Return empty result when parser unavailable."""
        return SemanticComponents(
            subject="",
            action_verb="",
            direct_object="",
            confidence=0.0,
            method="embedding"
        )

    def extract_action_target_outcome(self, text: str) -> Tuple[str, str, str]:
        """Extract action-target-outcome triple."""
        result = self.parse(text)
        return result.to_action_target_outcome()

    def extract_entities(self, text: str) -> List[str]:
        """Extract entities (not supported - returns empty)."""
        return []
```

---

### Step 3.2: Modify `hybrid_parser.py`

**Purpose:** Add embedding layer to fallback chain.

```python
# In hybrid_parser.py, modify the parse() method:

def __init__(
    self,
    prefer_nlp: bool = True,
    confidence_threshold: float = 0.7,
    embedding_enabled: bool = False,      # NEW
    embedding_threshold: float = 0.80     # NEW
):
    self._prefer_nlp = prefer_nlp
    self._confidence_threshold = confidence_threshold
    self._embedding_enabled = embedding_enabled
    self._embedding_threshold = embedding_threshold
    self._last_method = "unknown"

    # Initialize parsers
    self._regex_parser = ACParser()
    self._spacy_parser = self._init_spacy_parser()

    # NEW: Initialize embedding parser if enabled
    self._embedding_parser = None
    if embedding_enabled:
        try:
            from core.services.nlp.embedding_parser import EmbeddingSemanticParser
            self._embedding_parser = EmbeddingSemanticParser(
                threshold=embedding_threshold
            )
        except Exception as e:
            print(f"Failed to initialize embedding parser: {e}")


def parse(self, text: str) -> SemanticComponents:
    """Parse with fallback: embedding → spaCy → regex."""
    clean_text = self._clean_text(text)

    # Layer 1: Embedding (NEW)
    if self._embedding_parser and self._embedding_parser.is_available:
        result = self._embedding_parser.parse(clean_text)
        if result.confidence >= self._embedding_threshold:
            self._last_method = "embedding"
            return result

    # Layer 2: spaCy
    if self._prefer_nlp and self._spacy_parser and self._spacy_parser.is_available:
        result = self._spacy_parser.parse(clean_text)
        if result.confidence >= self._confidence_threshold:
            self._last_method = "spacy"
            return result

    # Layer 3: Regex fallback
    regex_result = self._parse_with_regex(clean_text)
    self._last_method = "regex"
    return regex_result
```

---

## Verification

### Test the Complete System

```python
# test_embedding_system.py

from core.services.embeddings import (
    create_embedding_provider,
    EmbeddingCache,
    EmbeddingPatternIndex,
    SemanticMatcher
)

# 1. Test provider
provider = create_embedding_provider()
print(f"Provider available: {provider.is_available()}")

# 2. Test embedding
result = provider.embed("bring to front")
print(f"Embedding dimensions: {result.dimensions}")

# 3. Test pattern index
cache = EmbeddingCache()
index = EmbeddingPatternIndex(provider, cache)
index.load_patterns()
print(f"Patterns loaded: {len(index._patterns)}")

# 4. Test semantic matching
matcher = SemanticMatcher(provider, index, cache)
matches = matcher.find_similar("move above other objects", category="action")
print(f"Best match: {matches[0].pattern_text} ({matches[0].similarity_score:.2f})")

# 5. Test parser
from core.services.nlp.embedding_parser import EmbeddingSemanticParser
parser = EmbeddingSemanticParser()
result = parser.parse("User can move the shape above all other objects")
print(f"Action verb: {result.action_verb}")
print(f"Confidence: {result.confidence:.2f}")
print(f"Method: {result.method}")
```

Expected output:
```
Provider available: True
Embedding dimensions: 1536
Patterns loaded: 9
Best match: bring to front (0.92)
Action verb: bring
Confidence: 0.92
Method: embedding
```
