export interface Option {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isCorrect?: boolean;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  options: Option[];
}

export interface UserSelections {
  [questionId: string]: Option;
}

export type SkinTone = 'light' | 'medium' | 'dark';