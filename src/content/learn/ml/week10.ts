import type { StructuredContent } from "@/lib/structured-content";

export const week10Content: Record<string, StructuredContent> = {
  "deep-learning-theory": {
    overview:
      "This chapter introduces convolutional neural networks (CNNs), transfer learning with pretrained models and supervised contrastive learning, with a focus on image tasks such as CIFAR-10.",
    youWillLearn: [
      "How CNNs process images with convolution and pooling",
      "Residual connections in architectures like ResNet",
      "What transfer learning is and when to use it",
      "How supervised contrastive learning shapes representation spaces",
      "The role of data augmentation and learning rate schedules in deep learning",
    ],
    mainContent: [
      {
        heading: "Convolutional Layers and Feature Maps",
        body:
          "CNNs exploit the spatial structure of images. A convolutional layer applies learnable filters (kernels) across the height and width of an input, computing local dot products to produce feature maps. Weight sharing across spatial locations drastically reduces the number of parameters compared to fully-connected layers and encodes translation equivariance: shifting the input shifts the activations in the same way.",
      },
      {
        heading: "Pooling and Hierarchical Features",
        body:
          "Pooling layers, such as max pooling, downsample feature maps by summarising local regions (e.g., 2×2 windows). This builds spatial invariance and reduces dimensionality, allowing deeper networks to capture increasingly abstract features. Early layers detect edges and textures; later ones respond to object parts and whole-object patterns.",
      },
      {
        heading: "Residual Connections and ResNet",
        body:
          "Deep networks suffer from vanishing gradients and degradation as depth increases. Residual networks address this by introducing skip connections: instead of learning H(x) directly, a residual block learns F(x) such that H(x) = F(x) + x. This allows gradients to flow directly along identity paths and enables training of very deep networks.",
      },
      {
        heading: "Transfer Learning",
        body:
          "Training large CNNs from scratch requires substantial data and compute. Transfer learning reuses convolutional layers from a network pretrained on a large dataset (e.g., ImageNet) and adapts them to a new task by replacing and training only the final classification layer or by fine-tuning a subset of layers with a smaller learning rate. This leverages learned low- and mid-level features that are broadly useful across visual tasks.",
      },
      {
        heading: "Supervised Contrastive Learning",
        body:
          "Supervised contrastive learning trains an encoder to produce representations where samples of the same class are close and different classes are far apart. The SupCon loss treats all samples with the same label in a batch as positives and others as negatives, shaping the embedding space before training a simple classifier on top. This often leads to more robust and transferable representations than directly training with cross-entropy on logits.",
      },
    ],
    examples: [
      {
        title: "Freezing Pretrained Layers in PyTorch",
        description:
          "Load a pretrained ResNet and freeze all convolutional blocks.",
        code:
          "import torchvision.models as models\n\nresnet = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)\nfor param in resnet.parameters():\n    param.requires_grad = False\n\n# Replace final FC layer for 10 classes\nin_features = resnet.fc.in_features\nresnet.fc = torch.nn.Linear(in_features, 10)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Training deep networks from scratch on tiny datasets",
        why:
          "Overfitting and poor generalisation are likely; the model capacity is mismatched to data size.",
        fix:
          "Use transfer learning, heavy augmentation, smaller models, or regularisation techniques to cope with limited data.",
      },
      {
        mistake: "Using the same learning rate for all layers during fine-tuning",
        why:
          "Earlier layers contain generic features that should change slowly; later layers are more task-specific.",
        fix:
          "Use discriminative learning rates or freeze most layers and fine-tune only higher layers with a higher rate.",
      },
    ],
    exercises: [
      {
        question:
          "Explain why convolution is more parameter-efficient than a fully connected layer for images.",
        answer:
          "A fully connected layer connecting all input pixels to each output unit needs a separate weight per pixel-output pair. Convolutions use small kernels whose weights are shared across spatial positions, drastically reducing the number of unique parameters.",
      },
      {
        question:
          "Describe a scenario where contrastive pretraining followed by a linear classifier might outperform direct supervised training.",
        answer:
          "On datasets with limited labelled data but many augmented views per sample, contrastive pretraining can learn robust representations by exploiting intra-class invariances. A linear classifier on top of these embeddings may generalise better than a network trained end-to-end with cross-entropy from scratch.",
      },
    ],
    furtherReading: [
      {
        title: "Deep Learning Notebook — CIFAR-10 with ResNet, Transfer Learning & SupCon",
        href: "/learn/ml/10/deep-learning-notebook",
        type: "internal",
      },
      {
        title: "Kaiming He et al., 'Deep Residual Learning for Image Recognition'",
        href: "https://arxiv.org/abs/1512.03385",
        type: "external",
      },
      {
        title: "Khosla et al., 'Supervised Contrastive Learning'",
        href: "https://arxiv.org/abs/2004.11362",
        type: "external",
      },
    ],
  },

  "deep-learning-notebook": {
    overview:
      "This chapter implements and trains ResNet-based classifiers on CIFAR-10, explores transfer learning with frozen ImageNet features, and applies supervised contrastive learning with a linear evaluation protocol.",
    youWillLearn: [
      "Training ResNet18 from scratch on CIFAR-10 with data augmentation",
      "Adapting a pretrained ResNet to CIFAR-10 via feature extraction and fine-tuning",
      "Implementing supervised contrastive loss in PyTorch",
      "Comparing confusion matrices across different training regimes",
    ],
    mainContent: [
      {
        heading: "Training ResNet18 from Scratch",
        body:
          "You define data pipelines for CIFAR-10 with standard augmentations (random crop with padding, horizontal flip, normalisation) and train ResNet18 using SGD with momentum and a learning rate schedule. Tracking training and test accuracy across epochs reveals typical deep learning behaviour: rapid initial improvements, slower later gains, and potential overfitting if training continues too long without regularisation.",
      },
      {
        heading: "Transfer Learning on CIFAR-10",
        body:
          "You compare training from scratch with using an ImageNet-pretrained ResNet18 as a fixed feature extractor (only training the final linear layer) and with full fine-tuning. Feature extraction is fast and competitive; fine-tuning can further improve performance when training data is sufficient, illustrating the power and flexibility of transfer learning.",
      },
      {
        heading: "Supervised Contrastive Training and Linear Evaluation",
        body:
          "You implement supervised contrastive loss by drawing multiple augmented views of each image in a batch, encoding them, and computing pairwise similarities in the embedding space. The loss pulls together embeddings with the same label and pushes apart different labels. After training the encoder, you freeze it and train a linear classifier on top of the embeddings, comparing performance to standard cross-entropy baselines.",
      },
      {
        heading: "Analysing Confusion Matrices",
        body:
          "For each training regime (from scratch, feature extraction, fine-tuning, SupCon + linear head) you compute confusion matrices. These reveal which class pairs (e.g., cat vs dog, truck vs automobile) are systematically confounded and how different approaches shift these patterns. This analysis complements scalar metrics like accuracy and can guide targeted data augmentation or model changes.",
      },
    ],
    examples: [
      {
        title: "Two-Head SupCon Model Sketch",
        description:
          "Encoder + projection head for supervised contrastive learning.",
        code:
          "class SupConModel(nn.Module):\n    def __init__(self, base_encoder: nn.Module, emb_dim: int = 128):\n        super().__init__()\n        self.encoder = base_encoder\n        self.projection = nn.Sequential(\n            nn.Linear(512, 512), nn.ReLU(), nn.Linear(512, emb_dim)\n        )\n\n    def forward(self, x):\n        feats = self.encoder(x)\n        z = self.projection(feats)\n        return F.normalize(z, dim=1)",
      },
    ],
    commonMistakes: [
      {
        mistake: "Neglecting normalisation and augmentation consistent with pretrained weights",
        why:
          "Pretrained models expect inputs preprocessed in specific ways; mismatches degrade transfer performance.",
        fix:
          "Use the normalisation parameters and preprocessing pipeline recommended for the pretrained model.",
      },
      {
        mistake: "Implementing contrastive loss without careful temperature scaling or normalisation",
        why:
          "Unnormalised embeddings and poor temperature choices can slow training and lead to collapsed representations.",
        fix:
          "L2-normalise embeddings and tune the temperature hyperparameter based on validation metrics.",
      },
    ],
    exercises: [
      {
        question:
          "Compare training time and accuracy for (a) ResNet18 from scratch, (b) feature extraction with frozen backbone, and (c) fine-tuning the whole network on CIFAR-10.",
        answer:
          "Feature extraction is fastest and often achieves strong accuracy quickly; fine-tuning can yield the best accuracy but requires more epochs and careful regularisation; training from scratch is typically slowest and may underperform on limited data.",
      },
      {
        question:
          "Visualise embeddings from a SupCon-trained encoder using t-SNE or UMAP. How do class clusters compare to embeddings from a cross-entropy-trained model?",
        answer:
          "SupCon embeddings often show tighter, well-separated clusters for each class, whereas cross-entropy embeddings may be more entangled; this difference reflects the explicit clustering objective of contrastive learning.",
      },
    ],
    furtherReading: [
      {
        title: "Deep Learning — CNNs, Transfer Learning & Contrastive Learning",
        href: "/learn/ml/10/deep-learning-theory",
        type: "internal",
      },
      {
        title: "PyTorch Vision Models",
        href: "https://pytorch.org/vision/stable/models.html",
        type: "external",
      },
    ],
  },
};

