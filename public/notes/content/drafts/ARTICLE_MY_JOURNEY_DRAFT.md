# DRAFT: I Built an AI That Writes Test Cases from User Stories

**Status:** Outline
**Target:** LinkedIn (400 words) + Medium (2000 words)
**Estimated write time:** 1-2 deep work sessions

---

## LinkedIn Version (400 words)

### Hook (First 2 lines - visible in preview)
```
I spent 3 months building an AI that turns user stories into test cases.

Here's what I learned (and what surprised me):
```

### Body

**The Problem (50 words)**
- Our QA team spent hours manually writing test cases from ADO stories
- Inconsistent formats, missed edge cases, knowledge silos
- Sprint velocity suffered

**The Solution (100 words)**
- Built a Python framework that:
  - Reads user stories from Azure DevOps
  - Parses acceptance criteria using NLP
  - Generates test cases via OpenAI API
  - Uploads directly to test suites
- Configurable per project (YAML configs)

**Key Results (50 words)**
- [X]% reduction in test case creation time
- Consistent format across all tests
- Edge cases automatically suggested
- Team can focus on exploratory testing

**3 Surprises (100 words)**
1. Prompt engineering > model selection
2. Domain context matters more than I expected
3. The "corrector" step improved quality by [X]%

**What's Next (50 words)**
- Adding embeddings for test step reuse
- Building semantic search for similar tests
- Working on self-healing capabilities

**CTA (50 words)**
```
This started as my Master's thesis - now it's a real tool my team uses daily.

If you're interested in AI + QA, I'm writing a series on this. Follow for more.

What's your biggest pain point in test automation? 👇
```

---

## Medium Version (2000 words)

### Title Options
- "I Built an AI That Writes Test Cases from User Stories"
- "How I Automated Test Case Creation with LLMs (A Technical Deep Dive)"
- "From User Story to Test Case in Seconds: Building an AI Testing Framework"

### Subtitle
_A practical guide to building LLM-powered test automation, with architecture decisions, code examples, and lessons learned._

---

### Section 1: The Spark (300 words)

**Opening Hook:**
```
"Can you write test cases for story 272780?"

I typed this into my terminal and watched as 12 detailed test cases appeared
in my Azure DevOps test suite. Each with steps, expected results, and proper
formatting. What used to take 45 minutes took 30 seconds.

This is the story of how I built it.
```

**Context:**
- Who I am (QA engineer, Master's student, company context)
- The daily reality: manual test case creation from ADO stories
- The trigger: repetitive work + thesis requirement = opportunity

**The Question:**
_"What if I could teach an AI to understand our acceptance criteria and generate test cases that actually make sense?"_

---

### Section 2: The Problem Deep Dive (300 words)

**Manual Test Creation Pain Points:**

| Pain Point | Impact |
|------------|--------|
| Time consuming | 30-60 min per story |
| Inconsistent quality | Depends on who writes it |
| Missed edge cases | Human oversight |
| Knowledge silos | Only certain people know the domain |
| Delayed feedback | Tests written after development |

**What I Tried First:**
- ChatGPT copy-paste (worked but manual)
- Generic test generation tools (too generic)
- Template-based approaches (rigid, didn't adapt)

**The Gap:**
- No tool connected ADO → NLP → LLM → TestRail in one pipeline
- Commercial tools expensive and not customizable
- Needed domain-specific understanding

---

### Section 3: The Architecture (500 words)

**High-Level Flow:**
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Azure     │────▶│    NLP      │────▶│    LLM      │────▶│  TestRail/  │
│   DevOps    │     │   Parser    │     │  Generator  │     │    ADO      │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
     │                    │                   │                    │
   Story +            Structured          Test Cases           Uploaded
    ACs                 ACs               (JSON)              Test Suite
```

**Key Components:**

**1. ADO Integration (`infrastructure/ado/`)**
```python
# Simplified example
story = ado_client.get_work_item(story_id=272780)
acceptance_criteria = story.fields["Microsoft.VSTS.Common.AcceptanceCriteria"]
```
- Fetches story title, description, acceptance criteria
- Handles HTML parsing from ADO fields

**2. AC Parser (`core/services/ac_parser.py`)**
```python
# Extract structured acceptance criteria
parsed_acs = ac_parser.parse(raw_html)
# Returns: [{"id": 1, "text": "User can login...", "type": "functional"}]
```
- Cleans HTML artifacts
- Identifies AC patterns (Given/When/Then, bullet points)
- Classifies AC types (functional, UI, edge case)

**3. Prompt Builder (`core/services/llm/prompt_builder.py`)**
```python
# Build context-aware prompt
prompt = prompt_builder.build(
    story=story,
    parsed_acs=parsed_acs,
    project_config=config  # Domain-specific instructions
)
```
- Injects project context (what's a "drawing"? what's "environment"?)
- Formats examples for few-shot learning
- Structures output format requirements

**4. Test Generator (`core/services/test_generator.py`)**
```python
# Generate via OpenAI
test_cases = generator.generate(prompt)
# Returns structured test cases with steps
```
- Calls OpenAI API
- Parses response into TestCase objects
- Handles retries and error cases

**5. Corrector (`core/services/llm/corrector.py`)**
```python
# Quality check and fix
corrected = corrector.correct(test_cases, validation_rules)
```
- Validates against project rules
- Fixes common issues (missing expected results, vague steps)
- This step improved quality by ~30%

**Why This Architecture:**
- Clean separation of concerns
- Each component testable independently
- Easy to swap LLM providers
- Project configs make it reusable

---

### Section 4: The Secret Sauce - Project Configs (300 words)

**The Insight:**
_Generic prompts produce generic tests. Domain knowledge is everything._

**YAML Config Example:**
```yaml
# projects/configs/env-quickdraw.yaml
project_name: "Environment Quickdraw"
domain_context: |
  This is a CAD drawing management system.
  "Drawing" = technical engineering document
  "Environment" = project workspace

test_format:
  style: "action-based"
  include_preconditions: true

common_steps:
  - "Login to the application"
  - "Navigate to Drawing List"

edge_cases_to_consider:
  - "Empty states"
  - "Permission denied scenarios"
  - "Large file handling"
```

**Impact:**
- Same framework, different configs = different projects
- New team members don't need to know all domain context
- Consistent test quality across the organization

---

### Section 5: Results & Metrics (200 words)

**Quantitative:**
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Time per story | 45 min | 5 min | 89% reduction |
| Test cases per sprint | ~20 | ~50 | 2.5x increase |
| Format consistency | Variable | 95%+ | Standardized |

**Qualitative:**
- QA team focuses on exploratory testing now
- Edge cases we used to miss are auto-suggested
- Onboarding new QA is faster (framework knows the domain)

**What's NOT Automated:**
- Reviewing generated tests (human in the loop)
- Complex integration scenarios
- Performance test design

---

### Section 6: Lessons Learned (300 words)

**1. Prompt Engineering > Model Selection**
- Spent weeks on prompts, hours on model choice
- Specific instructions beat clever techniques
- Examples (few-shot) dramatically improve output

**2. The Corrector Step is Essential**
- First-pass generation is ~70% quality
- Corrector brings it to ~95%
- Validation rules catch common LLM mistakes

**3. Domain Context is Non-Negotiable**
- "Drawing" means different things in different contexts
- Acronyms, workflows, business rules matter
- Invested time in YAML configs paid off 10x

**4. Start Simple, Iterate**
- V1 was just "story → ChatGPT → copy-paste"
- Each iteration added one capability
- Dockerized only after core was solid

**5. Human in the Loop (For Now)**
- AI generates, human reviews
- Trust builds over time
- Eventually: confidence scores for auto-approval

---

### Section 7: What's Next (200 words)

**Immediate Roadmap:**
- **Embeddings**: Store test steps as vectors for semantic search
- **Test Reuse**: "Find similar tests" before generating new ones
- **ChromaDB**: Vector database for test library

**Future Vision:**
- **Self-Healing**: Auto-fix broken locators using ML
- **Autonomous Agent**: Monitor ADO → generate → execute → report
- **Multi-Platform**: Support Jira, TestRail, qTest

**The Thesis:**
- Formalizing this as Master's research
- Comparing against commercial tools
- Publishing findings

---

### Section 8: Try It Yourself (100 words)

**If You Want to Build Something Similar:**

1. Start with a single workflow (one story type)
2. Get prompt engineering right before scaling
3. Invest in project-specific context
4. Add validation/correction layer
5. Dockerize for team adoption

**Resources:**
- OpenAI API docs
- LangChain for orchestration
- HuggingFace for embeddings

---

### Closing

```
Three months ago, I wondered if AI could help with the tedious parts of QA.

Today, my team generates test cases in seconds instead of hours.

The technology exists. The tools are accessible. The gap is in connecting
them to real workflows.

If you're a QA engineer tired of repetitive work, start experimenting.
The future of testing is hybrid: AI generates, humans validate and improve.

What would you automate in your testing process?
```

---

### Call to Action

```
👋 I'm [Name], a QA engineer and Master's student researching AI in software testing.

This is Part 3 of my series on building AI-powered test automation:
- Part 1: The Manual Testing Crisis
- Part 2: AI Testing Tools Landscape
- Part 3: My Journey Building (this article)
- Part 4: The Research Gap

Follow me for more, and let me know your questions in the comments.
```

---

## Writing Checklist

- [ ] Write LinkedIn version first (forces conciseness)
- [ ] Expand to Medium with code examples
- [ ] Add architecture diagram (Mermaid or draw.io)
- [ ] Include real metrics from your project
- [ ] Get 1-2 people to review before publishing
- [ ] Prepare 3 comments to post after publishing (boost engagement)

---

## Next Session

**ONE Focus:** Write the LinkedIn version (400 words)

Time estimate: 45-60 minutes
