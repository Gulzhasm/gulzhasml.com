import type { StructuredContent } from "@/lib/structured-content";

export const awsMlBasicsContent: StructuredContent = {
  overview:
    "The AWS Certified Machine Learning – Specialty exam is not just about memorising services. It expects you to design end-to-end ML solutions on AWS: picking the right data stores, cleaning and featurising data, choosing and tuning algorithms (built-in, SageMaker, or custom), deploying safely, and operating systems in production.",

  youWillLearn: [
    "How the exam is structured across data engineering, exploratory data analysis (EDA), modelling, and ML operations",
    "How core AWS services (S3, Glue, Athena, Redshift, Kinesis, SageMaker, CloudWatch, IAM) fit together in typical ML architectures",
    "How to recognise common exam patterns and traps (data leakage, skew, over/underfitting, wrong metric, wrong service)",
    "How to translate a vague business problem into the right AWS-native ML workflow",
    "How to read long question stems quickly and eliminate obviously wrong answer choices",
  ],

  mainContent: [
    {
      heading: "Exam Blueprint and Domains",
      body:
        "The official blueprint divides the exam into four domains: (1) Data Engineering (~20%), (2) Exploratory Data Analysis (~24%), (3) Modelling (~36%), and (4) ML Implementation & Operations (~20%). Every question is a scenario that mixes AWS building blocks with core ML judgement. Instead of asking 'What does SageMaker do?', you will see stories like: 'You ingest clickstream data at 1 TB/day, must keep 2 years of history, and train daily recommendation models; which storage pattern and processing architecture is most cost-effective while keeping training times acceptable?'. To pass consistently, you need both conceptual ML depth (bias–variance, data leakage, metrics, cross-validation, regularisation) and enough AWS familiarity to know which service to reach for in each domain.",
    },
    {
      heading: "Data Engineering on AWS",
      body:
        "Data engineering questions revolve around the journey from raw data to a training-ready dataset. You should be comfortable with S3 as the central data lake, Glue Crawlers and Glue Jobs for schema inference and ETL, Athena and Redshift Spectrum for serverless querying over S3, Kinesis and Firehose for streaming ingestion, and DynamoDB or RDS as transactional sources. Key exam patterns: choosing columnar formats (Parquet/ORC) over CSV for analytical workloads, partitioning S3 data by high-cardinality keys like date and customer to reduce scan cost, using Glue Data Catalog as a central metastore, and building pipelines that are idempotent and fault-tolerant. When you see '1 TB/day, batch every hour, near-real-time dashboard', think Kinesis → Firehose → S3 → Glue/Athena/Redshift. When you see 'ML training every night on historical logs', think S3 + Glue Jobs + SageMaker Processing or Training jobs.",
    },
    {
      heading: "Exploratory Data Analysis and Feature Engineering",
      body:
        "The EDA domain tests whether you can spot issues before modelling: missing values, outliers, skew, leakage, and data imbalance. On AWS, this often appears as: 'You have data in S3, need to explore it and create features; which tool do you choose?'. The safe answers are SageMaker Studio notebooks, SageMaker Processing jobs, Athena queries, or EMR/Spark for very large datasets. Feature engineering concepts (one-hot encoding, target encoding, normalisation, bucketing, TF-IDF, word embeddings) are tested conceptually, sometimes framed as 'Which transformation is appropriate for this variable?'. Expect questions where the correct answer is to go back and fix data (e.g. remove highly correlated features, handle leakage from future-dated fields) rather than blindly tuning models.",
    },
    {
      heading: "Modelling: Algorithms, Tuning, and Evaluation",
      body:
        "The modelling domain combines generic ML knowledge with SageMaker specifics. You should recognise when to use built-in algorithms (XGBoost for tabular classification/regression, Linear Learner for GLMs, Object Detection/Image Classification algorithms, Seq2Seq for translation, etc.) versus bringing your own model via custom containers or frameworks like PyTorch and TensorFlow. Hyperparameter tuning is usually asked in the context of SageMaker Automatic Model Tuning (HPO): understanding ranges, objective metrics, early stopping, and budget constraints. Evaluation patterns include picking the right metric for the problem (ROC AUC vs. F1 vs. precision/recall vs. MSE), understanding cross-validation, and avoiding leakage between training and validation sets. The best answers balance AWS features (e.g. SageMaker built-in cross-validation, managed spot training) with sound ML practice.",
    },
    {
      heading: "Implementation and Operations (MLOps) on AWS",
      body:
        "Implementation questions focus on deploying, monitoring, and maintaining ML systems. You should know when to use SageMaker hosting endpoints, batch transform, or offline scoring pipelines. Deployment patterns include blue/green and canary deployments with SageMaker, using endpoint variants for A/B tests, and autoscaling based on invocations per minute or latency. Monitoring involves CloudWatch metrics and alarms, SageMaker Model Monitor for data and concept drift, and logging for debugging. Security and governance show up via IAM roles (principle of least privilege), KMS encryption for data at rest and in transit, VPC endpoints, and private connectivity. A strong answer often mentions both functionality and security (e.g. 'deploy behind a private VPC endpoint, encrypt S3 buckets with KMS, restrict IAM roles to only required actions').",
    },
  ],

  examples: [
    {
      title: "Typical Scenario Question Decomposition",
      description:
        "How to systematically dissect a long exam stem into constraints and then match them to AWS patterns.",
      code: `# Question (paraphrased):
# "You have 3 years of web event logs stored as CSV in S3 (~50 TB). 
#  Data scientists run interactive SQL queries and train daily fraud models.
#  Queries are slow and expensive. What is the MOST cost-effective improvement?"

# Reasoning sketch:
# - Data is large, historical, append-only -> data lake pattern.
# - CSV is inefficient for scanning columns -> consider columnar format.
# - Interactive SQL suggests Athena or Redshift Spectrum, possibly Redshift for heavy joins.
# - "Most cost-effective" nudges toward S3 + Athena with columnar storage and partitioning.

# Likely answer:
# "Convert CSV to partitioned Parquet in S3 using AWS Glue, update Glue Data Catalog,
#  and query with Amazon Athena (or Redshift Spectrum) to reduce scan size and cost."`,
    },
  ],

  commonMistakes: [
    {
      mistake: "Memorising service names without understanding ML fundamentals",
      why:
        "Many distractor options mention the 'right' AWS service but propose an ML design that is statistically wrong (data leakage, wrong metric, poor evaluation setup).",
      fix:
        "Always sanity-check the ML logic first (data splits, evaluation, metrics) and only then ask which AWS tool best implements that design.",
    },
    {
      mistake: "Ignoring cost and operational simplicity in favour of 'fancy' architectures",
      why:
        "The exam often rewards solutions that meet requirements with the simplest managed service, not the most complex pipeline you can imagine.",
      fix:
        "Prefer serverless and managed offerings (Athena, Glue, SageMaker built-ins) unless the scenario explicitly demands low-level control (e.g. custom training container, EMR).",
    },
    {
      mistake: "Overlooking security and compliance requirements in scenario questions",
      why:
        "Questions mentioning PHI, PII, or regulated environments often have security and isolation as hidden constraints, making some otherwise valid options wrong.",
      fix:
        "Scan each scenario for hints about data sensitivity and governance; include encryption, IAM scoping, and VPC isolation in your reasoning.",
    },
  ],

  exercises: [
    {
      question:
        "Write down, from memory, the four AWS ML Specialty domains and give one concrete AWS service or feature that is central to each.",
      answer:
        "Typical answer: (1) Data Engineering — S3 data lake with Glue + Athena; (2) EDA — SageMaker Studio notebooks or Processing jobs; (3) Modelling — SageMaker built-in algorithms and Automatic Model Tuning; (4) ML Implementation & Operations — SageMaker endpoints with CloudWatch metrics and SageMaker Model Monitor for drift.",
    },
    {
      question:
        "A startup wants to detect churn using historical usage logs in S3 and a small RDS user table. They have one data scientist, minimal ops staff, and unpredictable traffic. Sketch an end-to-end AWS ML design that balances cost, simplicity, and robustness.",
      answer:
        "Ingest logs to S3 (possibly via Kinesis Firehose), join with RDS user data using Glue Jobs or Athena, and store training datasets in S3 as partitioned Parquet. Use SageMaker Studio or Processing for feature engineering, train an XGBoost model with SageMaker Training + Automatic Model Tuning, and deploy via a SageMaker endpoint with autoscaling. Monitor predictions and data drift with CloudWatch and SageMaker Model Monitor. Secure everything with IAM roles limited to required buckets and KMS-encrypted storage.",
    },
  ],

  furtherReading: [
    {
      title: "Machine Learning Specialty — Official Exam Guide",
      href: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
      type: "external",
    },
    {
      title: "SageMaker Developer Guide: Training and Inference",
      href: "https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-training.html",
      type: "external",
    },
  ],
};

