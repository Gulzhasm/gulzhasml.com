export interface ExamQuestion {
  id: number;
  set: number;
  question: string;
  choices: string[];
  correctIndex: number;
}

export interface PracticeSet {
  id: number;
  title: string;
  description: string;
  questionCount: number;
}
