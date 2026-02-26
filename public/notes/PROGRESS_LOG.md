## Thursday - [29/01/2026]

### Deep Work: Google AI/MLOps Prep (60 min)

#### Done
- [x] Researched Google AI/MLOps role requirements  - Done
- [x] Completed skills gap self-assessment - Done
- [x] Created 90-day learning roadmap - yes, there is a roadmap, i just skimmed through and opened suggested courses on docker, kubernetes, and google ml crash course pages and planned for tomorrow 
- [x] Defined 4 actions for this week - Done

#### Key Insights
- MLOps = bridging ML research and production
- My test-gen project can become a portfolio piece
- Top gaps to address: 
### Top 3 Gaps to Address First

1. **Gap 1**: Python, Docker, Kubernetes, NLP - hugging face
2. **Gap 2**: KubeFlow/VertexAI
3. **Gap 3**: TensorFlow/PyTorch

#### This Week's Focus
- Docker basics + containerize one script
- Get Started with Kubernetes
- Integrate Jira/TestRail into the ai-test-gen
- Start "Designing ML Systems" book

#### Next Session
- Friday: Implement embeddings (also builds MLOps skills!)

---

## Friday - [30/01/2026]

### Deep Work: Embeddings & NLP Foundations (60-90 min)

#### Done
- [x] Read OpenAI API embedding documentation
- [x] Started HuggingFace free course - nearly completed Chapter 1 (Introduction)
- [x] Learned transformers architecture: encoders vs decoders
- [x] Began integrating OpenAI embeddings into ACParser (surface level)

#### Key Insights
- Understanding WHY embeddings matter for semantic matching
- Transformers = foundation of modern NLP (BERT, GPT, etc.)
- Embeddings can enhance test-gen framework for smarter AC parsing

#### Reflection
| Metric | Rating |
|--------|--------|
| Focus Quality | 3/5 |
| Energy Before | 4/5 |
| Energy After | 5/5 |
| Distractions | Some (daughter) |
| What Worked | Just starting felt great! |

---

## Monday - [03/02/2026]

### Deep Work: Docker & Workflow Improvements

#### Done
- [x] Fixed `update-objectives` workflow - now fetches test cases directly from ADO (no CSV required)
- [x] Added `get_test_cases_in_suite()` method to ADO repository
- [x] **Docker Course Started** - learned fundamentals and containerized test-gen project:
  - Core concepts: Images, containers, layers, registries
  - Dockerfile basics: FROM, RUN, COPY, WORKDIR, CMD, ENTRYPOINT
  - Built first image: `docker build -t test-gen:v1 .`
  - Created `.dockerignore` for optimized builds
  - Successfully ran workflows in Docker container
- [x] Created team documentation:
  - Added Docker section to README.md
  - Created DOCKER_QUICKSTART.md for team onboarding
- [x] Completed HuggingFace Chapter 1 - models, encoders, decoders, sequence-to-sequence models

#### Not Started
- [ ] Kubernetes - planned for next session
- [x] ~~Design embeddings architecture~~ - completed in previous days
- [x] ~~Create `core/services/embeddings/` folder structure~~ - completed in previous days

#### Key Insights
- Docker layer caching: put things that change LEAST at TOP of Dockerfile
- `--env-file .env` keeps secrets out of commands
- `-v $(pwd)/output:/app/output` persists generated files outside container
- Team can now use test-gen without installing Python/dependencies

#### Docker Commands Learned
```bash
docker build -t test-gen:v1 .           # Build image
docker run test-gen:v1                   # Run container
docker run --env-file .env ...           # Pass environment
docker run -v host:container ...         # Mount volumes
docker run -it --entrypoint /bin/bash    # Debug inside container
```

#### Next Session
- Continue Docker learning and usages
- Start ChromaDB
- Start Kubernetes basics
- Continue HuggingFace Chapter 2 (Using Transformers)

---

## Friday - [06/02/2026]

### Deep Work: HuggingFace Chapter 2 (60-90 min) - SINGLE FOCUS

#### Done
- [x] Completed HuggingFace Chapter 2 (Using Transformers) - all sections
- [x] Ran code examples hands-on
- [x] Understood tokenizers, models, and how they connect

#### Key Insights
- Tokenizer converts text → tokens → IDs the model understands
- Model processes token IDs → produces embeddings/predictions
- Pipeline: Text → Tokenizer → Model → Output
- Single-focus approach = deeper learning, better retention

#### Reflection
| Metric | Rating |
|--------|--------|
| Focus Quality | 5/5 |
| Energy Before | 5/5 |
| Energy After | 5/5 |
| Distractions | 0 |
| Single-focus helped? | Yes |

#### Next Session (ONE focus)
- ChromaDB introduction - apply tokenizer/model knowledge to vector storage

---

## Monday - [09/02/2026]

### Deep Work: ChromaDB Integration (60-90 min) - SINGLE FOCUS

#### Done
- [x] Installed ChromaDB in venv310
- [x] Created `IVectorStore` abstract interface (`core/interfaces/vector_store.py`)
- [x] Implemented `ChromaRepository` concrete class (`infrastructure/vector_db/chroma_repository.py`)
- [x] Created integration test - verified add, query, count work
- [x] Understood ChromaDB storage: `./db/chroma.sqlite3` + collection folders
- [x] Sketched integration with test-gen workflow

#### Key Insights
- Abstract classes in Python: `ABC` + `@abstractmethod` (similar to Java interfaces)
- ChromaDB auto-embeds with `all-MiniLM-L6-v2` model
- PersistentClient stores data in `./db/` folder
- Query "authenticate" found similar steps "Click login", "Enter username"
- Clean architecture: Interface in `core/`, implementation in `infrastructure/`

#### Code Created
```
core/interfaces/vector_store.py      # IVectorStore interface
infrastructure/vector_db/
├── chroma_repository.py             # ChromaDB implementation
└── (deleted base.py - not needed)
tests/integration/test_chromadb.py   # Integration test
```

#### Reflection
| Metric | Rating |
|--------|--------|
| Focus Quality | 5/5 |
| Energy Before | 5/5 |
| Energy After | 5/5 |
| Distractions | 0 |
| Single-focus helped? | Yes |

#### Next Session (ONE focus)
- Integrate ChromaDB into test_generator.py (store/query test cases)

---

## Tuesday - [10/02/2026]

### Deep Work: ChromaDB Integration into Test Generator (60-90 min) - SINGLE FOCUS

#### Done
- [x] Created `TestStepEmbedder` service (`core/services/embeddings/test_step_embedder.py`)
- [x] Implemented composition pattern: TestStepEmbedder HAS-A ChromaRepository
- [x] Added `store_steps()`, `find_similar()`, `get_reference_steps()` methods
- [x] Integrated into `test_generator.py` - stores steps after generation
- [x] Wired reference steps into `corrector.py` LLM prompt
- [x] End-to-end verified: 141 steps stored, 10 reference steps found for corrections

#### Key Insights
- Python `__init__` = Java constructor (coming from 10 years Java background)
- Composition: `self.store = ChromaRepository()` creates HAS-A relationship
- `enumerate(list, start=1)` for getting index + value (fixed step indexing bug)
- ChromaDB distance metric: 0.2 = very similar, 1.5+ = less similar
- Reference steps help LLM use consistent wording across test cases

#### Code Created/Modified
```
core/services/embeddings/test_step_embedder.py   # NEW - semantic step matching
core/services/test_generator.py                   # Added embedder integration
core/services/llm/corrector.py                    # Added reference_steps param
workflows.py                                       # Wired reference steps
```

#### Reflection
| Metric | Rating |
|--------|--------|
| Focus Quality | 5/5 |
| Energy Before | 5/5 |
| Energy After | 5/5 |
| Distractions | 0 |
| Single-focus helped? | Yes |

#### Next Session (ONE focus)
- python baby steps (converting java skills, a muscle memory to an expert pyhton developer)
- Design patterns, clean architecture from java to python
- Focus on NLP task - tokenizer, embeddings, BERT

---

## Monday - [16/02/2026]

### Deep Work: Python Fundamentals - Data Structures (60 min) - SINGLE FOCUS

#### Done
- [x] Created `notes/pyhtonic/day1.py` - hands-on Python data structures practice
- [x] Covered all 4 core collection types: List, Tuple, Set, Dictionary
- [x] Practiced key operations: slicing, unpacking, set operations, dict methods
- [x] Completed 3 exercises connecting Python concepts to test-gen domain:
  - Exercise 1: Building test steps list with `enumerate()`
  - Exercise 2: Deduplicating test IDs with `set()` and `dict.fromkeys()`
  - Exercise 3: Tuple unpacking for test results
- [x] Also updated test-gen project: added Title Case enforcement for test titles (prompt_builder + corrector post-processing)

#### Key Concepts Practiced (Java -> Python)
- **List** = ArrayList (mutable, ordered, duplicates OK)
- **Tuple** = immutable list, can be dict keys, great for return values
- **Set** = HashSet (unique, unordered, union/intersection/difference operators)
- **Dictionary** = HashMap (key-value pairs, `.get()` with default, `.pop()` with fallback)
- Slice syntax `[start:stop:step]` - no Java equivalent, very Pythonic
- `dict.fromkeys()` for order-preserving deduplication

#### Reflection
| Metric | Rating |
|--------|--------|
| Focus Quality | 5/5 |
| Energy Before | 5/5 |
| Energy After | 5/5 |
| Distractions | 0 |
| Single-focus helped? | Yes |

#### Next Session (ONE focus)
- Python Day 2: Functions, comprehensions, and lambda (build on collections knowledge)

