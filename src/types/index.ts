// CBTI 관련 타입 정의
export interface CBTIType {
  name: string;
  character: string;
  description: string;
  symbol: string;
  traits: string[];
  recommendedServices: string[];
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface Option {
  text: string;
  trait: string;
}

export interface TestAnswer {
  questionId: number;
  selectedTrait: string;
}

export interface UserInfo {
  gender: 'male' | 'female';
  ageGroup: '20s' | '30s' | '40s' | '50s';
}

export interface TestResult {
  type: string;
  cbtiData: CBTIType;
  userInfo: UserInfo;
}