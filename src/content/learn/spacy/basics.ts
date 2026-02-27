import type { StructuredContent } from "@/lib/structured-content";

export const spacyBasicsContent: StructuredContent = {
  overview:
    "spaCy is an industrial-strength NLP library focused on performance and clean APIs. This chapter gives you a deep understanding of its pipeline, Doc/Token/Span objects, and how to extend it with custom components so you can build real production text processing systems.",

  youWillLearn: [
    "The spaCy processing pipeline and how components pass a Doc object along",
    "How to work with Doc, Token, and Span objects instead of raw strings",
    "How tokenisation, POS tagging, dependency parsing, and NER fit together",
    "How to write and register custom pipeline components for domain logic",
    "How to use pattern matchers like Matcher and PhraseMatcher",
    "How to think about integrating spaCy with downstream ML and LLM systems",
  ],

  mainContent: [
    {
      heading: "The Pipeline and the Doc Object",
      body:
        "In spaCy, everything revolves around the `Doc` object. When you call `nlp(text)`, spaCy tokenises the string and then passes the resulting Doc through a sequence of pipeline components: tagger, parser, named entity recogniser, lemmatiser, and any custom components you have added. Each component reads and writes attributes on the Doc, its Tokens, or Spans. The mental model is a conveyor belt: the text goes in at one end, and as it moves along, components enrich it with annotations like part-of-speech tags, dependency arcs, and entity labels. Understanding that the Doc is the single source of truth — not the raw string — is the first step towards writing clean spaCy code.",
    },
    {
      heading: "Tokens, Spans, and Linguistic Annotations",
      body:
        "A `Token` in spaCy is more than a substring: it carries linguistic features such as `token.text`, `token.lemma_`, `token.pos_`, `token.tag_`, `token.dep_`, and `token.head`. A `Span` is a slice of a Doc that behaves like a view into the original text but can also have a label (e.g. an entity type or custom category). Named entities in spaCy are just Spans with labels like `ORG`, `PERSON`, or `PRODUCT`. Because Doc, Token, and Span objects are hashable and lightweight, you can safely attach them to other data structures, store references, or use them as keys in maps — which is essential in larger systems where you thread text annotations into downstream logic.",
    },
    {
      heading: "Pattern Matching with Matcher and PhraseMatcher",
      body:
        "Not every NLP problem requires a neural network. spaCy's `Matcher` and `PhraseMatcher` let you write deterministic patterns over token attributes. For example, you can find all occurrences of a verb followed by a noun phrase, or all instances of a particular product name, using patterns that match on `LOWER`, `LEMMA`, `POS`, or custom attributes. The Matcher runs on the Doc and returns Span objects for each match, which you can then label, aggregate, or feed into business rules. In many production pipelines (including ai-test-gen style systems) a hybrid of pattern matching plus ML gives you the best of both worlds: speed, interpretability, and robustness.",
    },
    {
      heading: "Custom Pipeline Components and Doc Extensions",
      body:
        "One of spaCy's strengths is how easy it is to extend. You can register custom pipeline components — simple Python callables that take a Doc and return it — and insert them anywhere in the `nlp.pipe_names` sequence. Inside a component, you can compute domain-specific features (e.g. whether a requirement mentions accessibility, whether a sentence describes a UI action) and store them on the Doc, Span, or Token using spaCy's extension system (`Doc.set_extension`, `Span.set_extension`, `Token.set_extension`). This lets you attach rich, structured metadata to the text and later use it in rule engines, ML models, or LLM prompts.",
    },
    {
      heading: "spaCy, ML Models, and LLM-Oriented Workflows",
      body:
        "spaCy is often the first stage in a larger pipeline: it cleans and structures raw text before it reaches a classifier, a rule engine, or an LLM. For example, in an AI test generation system you might use spaCy to parse acceptance criteria, identify verbs and objects, detect UI surfaces, and chunk text into stories and steps. Those structured outputs then feed into downstream components like scikit-learn models, PyTorch classifiers, or prompt builders for large language models. The key design principle is to keep spaCy responsible for deterministic, reproducible linguistic analysis, and let heavier models operate on the clean, structured representation it produces.",
    },
  ],

  examples: [
    {
      title: "Inspecting a Parsed Doc",
      description:
        "Running a simple English pipeline, then examining tokens, POS tags, dependencies, and entities.",
      code: `import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("The ai-test-gen system generates test cases from user stories.")

for token in doc:
    print(token.text, token.lemma_, token.pos_, token.dep_, "->", token.head.text)

for ent in doc.ents:
    print("ENTITY:", ent.text, ent.label_)`,
    },
    {
      title: "Custom Component with a Doc Extension",
      description:
        "Marking a Doc as 'requirements_like' if it contains certain cue phrases, and storing the result as a custom attribute.",
      code: `import spacy
from spacy.language import Language
from spacy.tokens import Doc

Doc.set_extension("requirements_like", default=False)

@Language.component("requirements_flagger")
def requirements_flagger(doc: Doc) -> Doc:
    cues = ["shall", "must", "should", "user can", "system shall"]
    text_lower = doc.text.lower()
    doc._.requirements_like = any(cue in text_lower for cue in cues)
    return doc

nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("requirements_flagger", last=True)

doc = nlp("The system shall allow the user to upload a profile picture.")
print(doc._.requirements_like)  # True`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Treating Docs as plain strings and re-tokenising manually",
      why:
        "If you split text yourself and then feed pieces back into spaCy, you lose global context and waste computation; you also risk misaligning token indices and spans.",
      fix:
        "Let spaCy handle tokenisation once at the document level. Slice subspans using `doc[start:end]` and reuse the same Doc throughout your pipeline.",
    },
    {
      mistake: "Mutating pipeline order without understanding dependencies",
      why:
        "Placing custom components before the tagger or parser can mean that expected attributes (like `token.pos_` or `token.dep_`) are not yet set, leading to brittle code.",
      fix:
        "Check `nlp.pipe_names` and only insert components before or after the stages whose annotations you need. Use `nlp.add_pipe(name, before=\"ner\")` or `after=\"tagger\"` explicitly.",
    },
    {
      mistake: "Using the small English model for tasks that require high-quality parsing or NER",
      why:
        "The `en_core_web_sm` model is compact and fast but sacrifices accuracy; complex applications may silently degrade in quality.",
      fix:
        "For serious work, use larger models like `en_core_web_md` or `en_core_web_trf` (transformer-based) and benchmark performance and accuracy tradeoffs.",
    },
  ],

  exercises: [
    {
      question:
        "Design a spaCy pipeline that detects sentences in acceptance criteria that describe UI actions (e.g. clicks, selections, navigations). How would you combine linguistic features and simple rules to achieve this?",
      answer:
        "Load an English model, then add a custom component that iterates over sentences in `doc.sents`. For each sentence, look for verbs with lemmas like 'click', 'select', 'open', 'navigate', and check their direct objects or prepositional phrases (via dependency labels like `dobj`, `prep`, `pobj`). Mark sentences that contain these patterns as UI actions by storing a boolean or label on a Span extension. This hybrid of POS tags, lemmas, and dep labels yields robust, interpretable rules.",
    },
    {
      question:
        "You want to integrate spaCy with an LLM that generates test cases. How can spaCy help you structure prompts so that the LLM has less room to hallucinate?",
      answer:
        "Use spaCy to parse acceptance criteria and extract structured fields: verbs (actions), direct objects (UI elements), conditions (subordinate clauses), and named entities (dates, amounts). Then build prompts that present these fields explicitly (e.g. 'Action: click Save button, Object: Save button on Settings page, Condition: when changes are valid'), rather than raw text. This reduces ambiguity and constrains the LLM's task to filling in missing details within a well-defined structure.",
    },
  ],

  furtherReading: [
    {
      title: "spaCy Usage Documentation",
      href: "https://spacy.io/usage",
      type: "external",
    },
    {
      title: "spaCy Pipeline and Components",
      href: "https://spacy.io/usage/processing-pipelines",
      type: "external",
    },
  ],
};

