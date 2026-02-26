# Python Hero Roadmap: 0 to Senior in 6 Months

**Background:** 10 years Java → Python
**Daily commitment:** 90 min deep work
**Learning style:** Hands-on > Theory (implement everything!)

---

## Overview: 6-Month Journey

| Month | Focus | Goal |
|-------|-------|------|
| 1 | Python Fundamentals | Think in Python, not Java-translated |
| 2 | Pythonic Patterns & OOP | Master Python idioms |
| 3 | Advanced Python | Decorators, generators, metaclasses |
| 4 | Design Patterns & Architecture | Clean code, SOLID in Python |
| 5 | DSA & LeetCode | Interview-ready problem solving |
| 6 | System Design & Integration | Senior-level thinking |

**Total:** ~270 hours of focused learning

---

## Month 1: Python Fundamentals (Fast-Track)

> **Goal:** Stop writing "Java in Python" - think Pythonically

### Week 1-2: Core Syntax & Data Structures

**Java → Python Quick Wins:**
```
Java                          Python
----                          ------
ArrayList<String>         →   list[str] or just []
HashMap<String, Integer>  →   dict[str, int] or just {}
for(int i=0; i<n; i++)   →   for i in range(n):
str.equals(other)         →   str == other
null                      →   None
this                      →   self
System.out.println()      →   print()
```

**Daily Practice (Week 1):**
- [ ] Day 1: Lists, tuples, sets - when to use which
- [ ] Day 2: Dictionaries deep dive (defaultdict, Counter)
- [ ] Day 3: List comprehensions vs loops
- [ ] Day 4: String formatting (f-strings, .format())
- [ ] Day 5: File I/O (with statement = try-with-resources)
- [ ] Day 6-7: Mini-project: Rewrite a Java utility in Pythonic way

**Key Concepts:**
- [ ] Mutable vs immutable (list vs tuple)
- [ ] Everything is an object (even functions)
- [ ] Duck typing ("If it quacks like a duck...")
- [ ] EAFP vs LBYL (Ask forgiveness, not permission)

### Week 3-4: Functions & Modules

**Java → Python:**
```
Java                              Python
----                              ------
method overloading            →   default args, *args, **kwargs
static method                 →   @staticmethod or module function
final                         →   Convention: UPPER_CASE
private                       →   Convention: _prefix
package                       →   module/package (__init__.py)
import com.example.MyClass    →   from package.module import MyClass
```

**Daily Practice (Week 3-4):**
- [ ] Day 1: *args, **kwargs - variadic functions
- [ ] Day 2: Lambda functions and when to use them
- [ ] Day 3: map(), filter(), reduce() vs comprehensions
- [ ] Day 4: Modules and packages (__init__.py)
- [ ] Day 5: Virtual environments (venv, requirements.txt)
- [ ] Day 6-7: Mini-project: Create a reusable module for test-gen

**Apply to test-gen:**
- Refactor one utility function to use Pythonic idioms
- Add type hints to one module

---

## Month 2: Pythonic Patterns & OOP

> **Goal:** Master Python's unique approach to OOP

### Week 5-6: Classes & OOP

**Java → Python:**
```
Java                              Python
----                              ------
interface                     →   ABC + @abstractmethod
implements                    →   class MyClass(Interface):
extends                       →   class Child(Parent):
constructor                   →   __init__(self)
toString()                    →   __str__(self)
equals()                      →   __eq__(self, other)
hashCode()                    →   __hash__(self)
getters/setters              →   @property decorator
```

**Daily Practice:**
- [ ] Day 1: Classes, __init__, self
- [ ] Day 2: @property, @setter (no more getX/setX!)
- [ ] Day 3: Magic methods (__str__, __repr__, __eq__, __hash__)
- [ ] Day 4: ABC and @abstractmethod (you did this!)
- [ ] Day 5: Multiple inheritance & MRO
- [ ] Day 6-7: Mini-project: Refactor test-gen class with properties

**Dunder Methods Cheat Sheet:**
```python
__init__     # Constructor
__str__      # Human-readable string (print())
__repr__     # Developer string (debugging)
__eq__       # Equality comparison (==)
__hash__     # For dict keys, set membership
__len__      # len(obj)
__iter__     # for x in obj
__getitem__  # obj[key]
__call__     # obj() - make instance callable
```

### Week 7-8: Pythonic Idioms

**Stop doing Java in Python:**
```python
# BAD (Java style)
if len(my_list) > 0:
    pass

# GOOD (Pythonic)
if my_list:  # Empty list is falsy
    pass

# BAD
for i in range(len(items)):
    print(items[i])

# GOOD
for item in items:
    print(item)

# GOOD (with index)
for i, item in enumerate(items):
    print(i, item)
```

**Daily Practice:**
- [ ] Day 1: Truthiness (None, 0, "", [], {} are falsy)
- [ ] Day 2: enumerate(), zip(), unpacking
- [ ] Day 3: Context managers (with statement)
- [ ] Day 4: Exceptions (try/except/else/finally)
- [ ] Day 5: namedtuple, dataclasses
- [ ] Day 6-7: Code review: Find Java-isms in test-gen, refactor

---

## Month 3: Advanced Python

> **Goal:** Master Python's power features

### Week 9-10: Decorators & Generators

**Decorators (like Java annotations, but more powerful):**
```python
# Simple decorator
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
```

**Generators (lazy evaluation):**
```python
# Memory efficient - yields one at a time
def read_large_file(file_path):
    with open(file_path) as f:
        for line in f:
            yield line.strip()

# Generator expression
squares = (x**2 for x in range(1000000))  # No memory used yet!
```

**Daily Practice:**
- [ ] Day 1: Simple decorators
- [ ] Day 2: Decorators with arguments
- [ ] Day 3: @functools.wraps, @property, @classmethod
- [ ] Day 4: Generators and yield
- [ ] Day 5: Generator expressions
- [ ] Day 6-7: Mini-project: Add @timer decorator to test-gen

### Week 11-12: Advanced Topics

**Concurrency:**
```python
# Threading (I/O bound)
from concurrent.futures import ThreadPoolExecutor

# Multiprocessing (CPU bound)
from concurrent.futures import ProcessPoolExecutor

# Async/await (I/O bound, single thread)
async def fetch_data():
    await some_async_operation()
```

**Daily Practice:**
- [ ] Day 1: Threading basics
- [ ] Day 2: concurrent.futures (ThreadPoolExecutor)
- [ ] Day 3: Async/await basics
- [ ] Day 4: Metaclasses (advanced OOP)
- [ ] Day 5: Type hints deep dive (Generic, Protocol, TypeVar)
- [ ] Day 6-7: Mini-project: Parallelize test generation

---

## Month 4: Design Patterns & Architecture

> **Goal:** Write production-quality, maintainable code

### Week 13-14: Creational & Structural Patterns

**Singleton (Python style):**
```python
# Java: private static instance + getInstance()
# Python: Module-level instance (modules are singletons!)

# config.py
class Config:
    def __init__(self):
        self.setting = "value"

config = Config()  # Module-level singleton

# usage.py
from config import config  # Same instance everywhere
```

**Factory (Python style):**
```python
# Java: FactoryClass with create() method
# Python: @classmethod or simple function

class Animal:
    @classmethod
    def from_string(cls, animal_type: str) -> "Animal":
        """Factory method"""
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        raise ValueError(f"Unknown: {animal_type}")
```

**Daily Practice:**
- [ ] Day 1: Singleton - module-level vs class-based
- [ ] Day 2: Factory - @classmethod factories
- [ ] Day 3: Builder - fluent interfaces
- [ ] Day 4: Adapter pattern
- [ ] Day 5: Decorator pattern (vs @decorator)
- [ ] Day 6-7: Apply one pattern to test-gen

### Week 15-16: Behavioral Patterns & SOLID

**Strategy Pattern:**
```python
# Java: Interface + multiple implementations
# Python: Just pass a function!

def process_data(data, strategy):
    """Strategy is just a function"""
    return strategy(data)

# Usage
process_data(data, lambda x: x.upper())
process_data(data, custom_function)
```

**SOLID in Python:**
- **S**ingle Responsibility: Small, focused classes
- **O**pen/Closed: Use composition, not inheritance
- **L**iskov Substitution: Duck typing helps!
- **I**nterface Segregation: ABC with minimal methods
- **D**ependency Inversion: Inject dependencies via __init__

**Daily Practice:**
- [ ] Day 1: Strategy pattern (functions as strategies)
- [ ] Day 2: Observer pattern (callbacks, events)
- [ ] Day 3: Command pattern
- [ ] Day 4: SOLID principles review
- [ ] Day 5: Clean code practices
- [ ] Day 6-7: Refactor test-gen with SOLID principles

---

## Month 5: DSA & LeetCode

> **Goal:** Interview-ready problem solving

### Week 17-18: Core Data Structures

**Python's Built-in Superpowers:**
```python
from collections import deque, Counter, defaultdict, OrderedDict
from heapq import heappush, heappop, heapify
from bisect import bisect_left, bisect_right

# Counter - frequency counting
Counter("aabbc")  # {'a': 2, 'b': 2, 'c': 1}

# defaultdict - no KeyError
d = defaultdict(list)
d["key"].append(1)  # No need to check if key exists

# deque - O(1) append/pop from both ends
q = deque([1, 2, 3])
q.appendleft(0)
q.pop()
```

**LeetCode Pattern Focus:**
| Pattern | Problems | Python Edge |
|---------|----------|-------------|
| Two Pointers | 15, 167, 283 | Slicing, enumerate |
| Sliding Window | 3, 76, 438 | defaultdict, Counter |
| Hash Maps | 1, 49, 128 | dict comprehensions |
| Stack/Queue | 20, 155, 232 | list as stack, deque |

**Daily Practice (45 min LeetCode + 45 min concepts):**
- [ ] Week 17: Arrays & Strings (Easy/Medium)
- [ ] Week 18: Hash Tables & Sets

### Week 19-20: Trees, Graphs, DP

**LeetCode Pattern Focus:**
| Pattern | Problems | Python Edge |
|---------|----------|-------------|
| BFS/DFS | 102, 200, 994 | deque, recursion limit |
| Binary Search | 33, 153, 704 | bisect module |
| Dynamic Programming | 70, 198, 322 | @lru_cache |
| Backtracking | 39, 46, 78 | yield, generators |

**Python DP Trick:**
```python
from functools import lru_cache

@lru_cache(maxsize=None)  # Memoization for free!
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)
```

**Daily Practice:**
- [ ] Week 19: Trees & Graphs
- [ ] Week 20: DP & Backtracking

---

## Month 6: System Design & Senior Skills

> **Goal:** Think like a senior engineer

### Week 21-22: System Design Basics

**Topics:**
- [ ] API design (REST, versioning)
- [ ] Database design (SQL vs NoSQL)
- [ ] Caching strategies
- [ ] Message queues (Redis, RabbitMQ)
- [ ] Load balancing concepts

**Apply to test-gen:**
- Design scalable test generation service
- Add caching layer for LLM responses
- Design API for test-gen as a service

### Week 23-24: Production Python

**Topics:**
- [ ] Logging (structured logging)
- [ ] Configuration management
- [ ] Error handling patterns
- [ ] Testing (pytest, mocking)
- [ ] CI/CD integration
- [ ] Docker & deployment

**Final Project:**
- Productionize test-gen with proper logging, config, tests
- Deploy as containerized service

---

## Daily Schedule Template

```
┌─────────────────────────────────────────┐
│  90-MIN DEEP WORK BLOCK                 │
├─────────────────────────────────────────┤
│  0-10 min:  Review yesterday's notes    │
│  10-50 min: Main learning/coding        │
│  50-80 min: Apply to test-gen project   │
│  80-90 min: Document learnings          │
└─────────────────────────────────────────┘
```

---

## Resources

### Books (Priority Order)
1. **Fluent Python** (Luciano Ramalho) - Python idioms
2. **Python Cookbook** (David Beazley) - Recipes
3. **Clean Code in Python** - Architecture
4. **Designing Data-Intensive Applications** - System design

### Online
- **LeetCode** - 2-3 problems daily in Month 5
- **Real Python** - Tutorials
- **Python docs** - Official reference

### Practice Projects
- [ ] CLI tool with Click
- [ ] REST API with FastAPI
- [ ] Async scraper
- [ ] Your test-gen project!

---

## Progress Tracking

Use daily notes format:
```markdown
# Day X - [Topic]

## What I learned
-

## Code I wrote
```python
# paste code
```

## Applied to test-gen
-

## Tomorrow's focus
-
```

---

## Success Metrics

**Month 1:** Can write Pythonic code without thinking
**Month 2:** Comfortable with OOP, no Java-isms
**Month 3:** Using decorators, generators confidently
**Month 4:** Code is clean, testable, SOLID
**Month 5:** Solving Medium LeetCode in 30 min
**Month 6:** Can design and build production systems

---

*Remember: Learning by DOING > Reading theory*
*Every concept should be applied to test-gen or a mini-project*
