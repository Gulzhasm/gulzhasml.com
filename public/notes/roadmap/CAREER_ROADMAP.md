# Career Roadmap: SDET → AI Engineer

**Timeline:** Feb 2026 → August 2026
**Philosophy:** Build to learn. One thing at a time. Deep work.
**Daily commitment:** 60-90 min focused block
**Learning style:** Hands-on > Theory (10 years Java → Python through building)
**Milestone:** AWS Machine Learning Specialty Certification — end of May 2026

---

## Where I Am Now (Feb 2026)

### Already Built
- [x] Multi-agent LLM orchestration pipeline (test-gen)
- [x] RAG with ChromaDB (all-MiniLM-L6-v2 embeddings)
- [x] Clean Architecture in Python (interfaces, domain, infrastructure)
- [x] Multi-provider LLM factory (OpenAI, Gemini, Anthropic, Ollama)
- [x] MCP server integration
- [x] NLP parsing with spaCy
- [x] ADO integration (read stories, upload tests)
- [x] Docker containerization
- [x] Gap-trader MVP: Flask app with scanner, trade journal, watchlist, performance dashboard
- [x] yfinance data pipeline (70 liquid US stocks, batch OHLCV download)
- [x] P&L engine (long/short, win rate, profit factor, consecutive streaks)

### Skills Developing
- [x] Prompt engineering
- [x] Python fundamentals (Month 1 — in progress)
- [x] HuggingFace Transformers (Ch 1-2 done)
- [ ] Pythonic patterns & advanced Python
- [ ] ML fundamentals & evaluation
- [ ] Cloud deployment

---

## The 6-Month Plan

### Phase 1: Foundations (Feb-Mar) — "Think in Python"

**Goal:** Python fluency + ML fundamentals + keep test-gen alive

| Week | Python Focus | AI/ML Focus | AWS ML Cert | test-gen |
|------|-------------|-------------|-------------|----------|
| 1-2 | Data structures, functions, comprehensions | HuggingFace Ch 1-2 | — | Bug fixes, improvements |
| 3-4 | OOP, properties, dunder methods | HuggingFace Ch 3-4 | — | Refactor with Pythonic patterns |
| 5-6 | Decorators, generators | Embeddings deep dive | Domain 1: Data Engineering | Improve ChromaDB pipeline |
| 7-8 | Async, concurrency, type hints | Evaluation metrics (precision/recall/F1) | Domain 2: Exploratory Data Analysis | Add evaluation to test-gen |

**Deliverables:**
- [ ] Python: No more "Java in Python" — think Pythonically
- [ ] ML: Understand tokenizers, embeddings, evaluation metrics
- [ ] test-gen: Small improvements pushed to GitHub monthly
- [ ] QMUL: Make ML coursework visible (clean repo)
- [ ] Read: Start "Designing ML Systems" by Chip Huyen
- [ ] AWS: Understand Data Engineering + EDA domains through hands-on

---

### Phase 2: Gap-Trader ML Layer + AWS Cert (Apr-May) — "Add the brain"

**Goal:** Add ML prediction to the existing gap-trader MVP + pass AWS ML Specialty by end of May

**The project:** An ML-powered gap-trader that scans for overnight gaps on US stocks, predicts which gaps will fill, and executes trades on a small risk account. You'll actually use this with real money.

#### What Already Exists (MVP — Built Feb 2026)

```
DONE (Flask MVP):                     NEXT (ML + Production):
────────────────                      ──────────────────────
✅ Gap scanner (70 US stocks)         → Add ML prediction layer
✅ Trade journal (CRUD + P&L)         → Connect to Interactive Brokers
✅ Watchlist management               → Auto-suggest from ML signals
✅ Performance dashboard              → Add model accuracy tracking
✅ yfinance data pipeline             → Feature engineering pipeline
✅ SQLite + SQLAlchemy                → Add model artifacts storage
✅ Bootstrap + Chart.js UI            → Add prediction confidence display
✅ Catalyst/Order/Risk models (ORM)   → Wire into routes + enforce rules
```

#### What Interviewers Will See

```
What interviewers see:                What you're actually doing:
─────────────────────                 ─────────────────────────
Data engineering pipeline       ←     yfinance → feature engineering → model input
Feature engineering             ←     Gap size, volume ratio, sector momentum, etc.
ML classification model         ←     Predict: will this gap fill today? (yes/no/partial)
Backtesting & evaluation        ←     Test strategy on historical data with real metrics
Model serving via API           ←     Flask endpoint with prediction confidence
Monitoring & observability      ←     P&L tracking, model drift, prediction accuracy
Risk management                 ←     Position sizing, stop-loss, max daily loss
Live trading                    ←     Interactive Brokers integration, real money
```

#### 8-Week Build Plan

| Week | Focus | AWS ML Cert | Deliverable |
|------|-------|-------------|-------------|
| 9-10 | Feature engineering: build training dataset from historical gaps | Domain 3: Modeling (train/tune/evaluate) | Dataset with 20+ features per gap |
| 11-12 | ML model: train gap-fill classifier + backtesting | Domain 3: Modeling (hyperparams, regularization) | Model with backtest results + accuracy metrics |
| 13-14 | Wire IB broker + risk management + model into app | Domain 4: ML Implementation & Operations | Paper trading with ML signals |
| 15-16 | Catalyst detection (Finnhub) + polish | **Exam cram week: dumps + weak areas** | Full app working + **PASS EXAM** |

#### Current Architecture (Flask MVP)

```
gap-trader/                          # Already exists!
├── app.py                           # ✅ Flask app factory
├── config.py                        # ✅ Dev/Test/Prod config
├── models.py                        # ✅ Trade, Watchlist, Catalyst, Order, RiskConfig
├── routes/
│   ├── api_scanner.py               # ✅ GET /api/scanner/gaps
│   ├── api_trades.py                # ✅ CRUD trades
│   ├── api_watchlist.py             # ✅ CRUD watchlist
│   └── api_stats.py                 # ✅ Performance stats
├── services/
│   ├── gap_scanner.py               # ✅ Gap detection (yfinance)
│   ├── trade_service.py             # ✅ P&L calculations
│   ├── stats_service.py             # ✅ Performance analytics
│   └── symbols.py                   # ✅ 70 liquid US stocks
├── templates/                       # ✅ Dashboard, journal, watchlist, performance
├── static/                          # ✅ CSS + JS
│
│   ---- PHASE 2: ADD THESE ----
│
├── ml/                              # NEW: ML pipeline
│   ├── features.py                  # Feature engineering from OHLCV data
│   ├── dataset.py                   # Build training dataset from historical gaps
│   ├── train.py                     # Train gap-fill classifier
│   ├── predict.py                   # Inference: gap → fill probability
│   ├── backtest.py                  # Backtest strategy on historical data
│   └── models/                      # Saved model artifacts (.pkl)
├── services/
│   ├── ib_service.py                # NEW: Interactive Brokers integration
│   ├── risk_service.py              # NEW: Position sizing + stop-loss enforcement
│   └── catalyst_service.py          # NEW: Finnhub catalyst detection
└── routes/
    ├── api_predictions.py           # NEW: GET /api/predictions (ML signals)
    └── api_risk.py                  # NEW: Risk config endpoints
```

**Deliverables:**
- [x] Gap-trader MVP: Scanner, journal, watchlist, performance (DONE)
- [ ] Feature engineering: 20+ features per gap (volume, sector, pre-market, etc.)
- [ ] ML model: Gap-fill classifier with measured accuracy (precision, recall, F1)
- [ ] Backtesting: Historical evaluation with Sharpe ratio, win rate, P&L
- [ ] IB integration: Paper trading with Interactive Brokers
- [ ] Risk management: Position sizing, stop-loss, max daily loss enforced
- [ ] Catalyst detection: Finnhub earnings/news integration
- [ ] **AWS Machine Learning Specialty — PASSED (end of May)**

---

### AWS ML Cert Strategy

```
Phase 1 (Mar):  Understand domains 1-2 through building (test-gen + ChromaDB = real data eng)
Phase 2 (Apr):  Understand domains 3-4 through gap-trader (training, serving, evaluation)
Cram (May W4):  Dumps from colleague + fill gaps. You're good at memorizing — trust it.
```

**4 Exam Domains → Mapped to What You're Building:**

| Domain | Weight | You're Learning This Through... |
|--------|--------|-------------------------------|
| 1. Data Engineering | 20% | Market data pipeline, feature engineering, ChromaDB in test-gen |
| 2. Exploratory Data Analysis | 24% | Gap pattern analysis, feature selection, backtest visualization |
| 3. Modeling | 36% | Gap-fill classifier: training, hyperparams, cross-validation, evaluation |
| 4. Implementation & Operations | 20% | FastAPI serving, model deployment, monitoring, SageMaker basics |

**The secret:** By the time you hit the dumps in late May, 80% of the concepts won't be new — you'll have *built* things using them. The dumps just fill in AWS-specific naming and edge cases.

---

### Phase 3: Deploy + MLOps (Jun-Jul) — "Production mindset"

**Goal:** Cloud deployment + CI/CD + go live with real money (AWS cert already in hand)

| Week | Focus | Deliverable |
|------|-------|-------------|
| 17-18 | AWS deployment (Lambda scheduled scan, S3 data) | Gap-trader running on AWS |
| 19-20 | Go live: small-account real trading + CI/CD | Real trades executing, backtest runs on PR |
| 21-22 | Monitoring + model accuracy tracking | Model drift detection, prediction vs actual |
| 23-24 | Polish & documentation | Both projects README'd and demo-ready |

**Deliverables:**
- [ ] Cloud: Gap-trader deployed to AWS (you have the cert, now prove it)
- [ ] Live trading: Running on small risk account with real money via IB
- [ ] CI/CD: GitHub Actions running backtest on PR
- [ ] Monitoring: Model accuracy tracking (predicted fill vs actual)
- [ ] Portfolio: Both projects polished on GitHub
- [ ] Interview prep: Start ML system design practice

---

### Phase 4: Apply (August) — "Ship it"

**Goal:** Resume ready, portfolio strong, applications out

- [ ] Resume: "AI Engineer with 10+ years software engineering + AWS ML Specialty"
- [ ] **test-gen:** Multi-agent LLM orchestration (NLP, RAG, structured output)
- [ ] **gap-trader:** Full ML lifecycle (data pipeline → model → deployment → live trading)
- [ ] **AWS ML Specialty** cert + QMUL coursework visible
- [ ] Target roles: AI Engineer, MLOps, ML Platform
- [ ] 10+ targeted applications
- [ ] Mock interviews (system design + behavioral)

---

## Daily Learning System

### Structure: 60-90 Min Deep Work Block

```
┌─────────────────────────────────────────┐
│  DAILY DEEP WORK BLOCK                  │
├─────────────────────────────────────────┤
│  0-5 min:   Review yesterday's notes    │
│  5-45 min:  Main learning (ONE topic)   │
│  45-75 min: Apply to project            │
│  75-85 min: Document what I learned     │
│  85-90 min: Write tomorrow's ONE focus  │
└─────────────────────────────────────────┘
```

### Rules
1. **ONE focus per session** — no multitasking
2. **Type code by hand** — not copy-paste
3. **Apply to real project** — every concept connects to test-gen or gap-trader
4. **Document learnings** — daily notes in `notes/daily/`
5. **Definition of Done** before starting — know what "finished" looks like

### Weekly Rhythm
- **Weekdays:** Python + AI/ML learning (60-90 min)
- **Saturday:** Project building session (2-3 hours focused)
- **Sunday:** Week review + plan next week
- **Monthly:** Review progress against this roadmap

---

## Weekly Tracker

Use this template at the start of each week:

```markdown
# Week of [DATE]

## Phase: [1/2/3/4] | Week: [X/32]

### This Week's Focus
- Python: [topic]
- AI/ML: [topic]
- Project: [what to build/improve]

### Daily Log
| Day | Done | Focus Quality (1-5) | Notes |
|-----|------|---------------------|-------|
| Mon | | | |
| Tue | | | |
| Wed | | | |
| Thu | | | |
| Fri | | | |
| Sat | | | |
| Sun | Review + Plan | | |

### Week Summary
- Hours logged:
- Key win:
- Key challenge:
- Next week focus:
```

---

## Project 2: Gap-Trader (US Stocks)

**What:** ML-powered gap trading app for US stocks. Scan overnight gaps, predict fill probability, execute trades.
**Why:** Real money on the line = real motivation. Covers the full ML lifecycle: data → features → model → serve → monitor.
**Risk:** Small account, amount you're willing to lose. Paper trade first (Phase 2), live trade later (Phase 3).
**Repo:** `/Users/gulzhasmailybayeva/Desktop/gap-trader`
**Status:** MVP complete (Feb 2026) — scanner, journal, watchlist, performance dashboard all working.

**Interview story:**
> "I built an ML-powered trading system that ingests daily market data, engineers features from gap patterns, trains a classifier to predict gap-fill probability, and runs live on a small account with automated risk management via Interactive Brokers. Backtest showed X% win rate with Y Sharpe ratio."

**Key tech:** Python, Flask, SQLAlchemy, scikit-learn, yfinance, Interactive Brokers (ib_insync), Finnhub, AWS (Lambda + S3)

---

## Key Resources

### Books
- "Designing Machine Learning Systems" — Chip Huyen (Phase 1-2)
- "Building LLM Apps" — practical patterns (Phase 2-3)

### Courses
- HuggingFace NLP Course (free) — Phase 1
- FastAPI docs — Phase 2
- MLflow docs — Phase 2

### AWS ML Specialty Prep
- **Phase 1-2 (Mar-Apr):** AWS ML learning path — understand concepts while building
- **Cram week (May W4):** Exam dumps from colleague — fill gaps, memorize AWS-specific details
- AWS SageMaker docs — hands-on during Phase 2-3
- AWS free tier — practice deploying

### Reference
- `notes/roadmap/PYTHON_HERO_6MONTH.md` — detailed daily Python exercises
- `notes/daily/` — daily session logs

---

## Monthly Check-in

Copy at start of each month:

```markdown
## [Month] Check-in

### Last Month
- Sessions completed: X/20
- Average focus quality: X/5
- Key win:
- Key challenge:

### This Month Goals (max 3)
1. [ ]
2. [ ]
3. [ ]

### Am I on track for August?
- [ ] Yes / [ ] Need to adjust because:
```

---

## Progress Snapshot

| Month | Phase | Status | Key Achievement |
|-------|-------|--------|-----------------|
| Feb | 1 - Foundations | IN PROGRESS | Python basics, test-gen improvements, **gap-trader MVP done** |
| Mar | 1 - Foundations | | AWS domains 1-2, advanced Python |
| Apr | 2 - Gap-Trader ML + AWS | | Feature engineering + ML model + AWS domain 3 |
| May | 2 - Gap-Trader ML + AWS | | IB paper trading + **AWS ML EXAM (end of month)** |
| Jun | 3 - Deploy + Live | | Gap-trader on AWS, live small-account trading |
| Jul | 3 - Deploy + Live | | Monitoring, polish portfolio |
| Aug | 4 - Apply | | Applications out |
