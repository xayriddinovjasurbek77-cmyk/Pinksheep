export type SheepLevelId = 1 | 2 | 3;

export interface SheepLevel {
  id: SheepLevelId;
  name: string; // e.g. "Oddiy Qo'y", "Ijodkor Qo'y", "Afsonaviy Qo'y"
  englishName: string;
  minCoins: number;
  maxCoins: number | null;
  benefits: string[];
  lockedBenefits: string[];
  color: string;
}

export interface SheepAvatar {
  id: number;
  name: string;
  coatColor: string;
  hatColor: string;
  bgHex: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatarId: number;
  level: SheepLevelId;
  pinkCoins: number;
  isOnline: boolean;
  joinedDate: string;
  streakDays: number;
  isAuthenticated: boolean;
}

export interface UserStats {
  essaysCompleted: number;
  analysesRun: number;
  gamesPlayed: number;
  victories: number;
  rank: number;
}

export interface CoinTransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: 'signup' | 'essay' | 'analysis' | 'game' | 'daily';
  timestamp: string;
  balanceAfter: number;
}

export interface GrammarMistake {
  original: string;
  correction: string;
  explanation: string;
  ruleType: string;
}

export interface VocabularyImprovement {
  weakWord: string;
  suggestedAlternatives: string[];
  context: string;
  explanation: string;
}

export interface SentenceImprovement {
  original: string;
  improved: string;
  explanation: string;
}

export interface ImprovementPlanStep {
  step: number;
  title: string;
  action: string;
}

export interface EssayScores {
  grammar: number; // max 20
  vocabulary: number; // max 20
  coherence: number; // max 20
  taskAchievement: number; // max 20
  sentenceStructure: number; // max 20
}

export interface EssayAnalysis {
  overallScore: number;
  scores: EssayScores;
  grammarMistakes: GrammarMistake[];
  vocabularyImprovements: VocabularyImprovement[];
  weakSentences: SentenceImprovement[];
  strengths: string[];
  areasNeedingImprovement: string[];
  personalizedPlan: ImprovementPlanStep[];
  improvedFullEssay: string;
  verdict: string;
  isAiPowered: boolean;
  mode?: string;
  analyzedAt: string;
}

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type EssayType =
  | 'Argumentative'
  | 'Discursive'
  | 'IELTS Task 2'
  | 'Scholarship / Statement of Purpose'
  | 'Problem & Solution'
  | 'Narrative / Personal';

export interface EssayItem {
  id: string;
  title: string;
  topic: string;
  essayType: EssayType;
  category?: string;
  targetLevel: EnglishLevel;
  content: string;
  wordCount: number;
  status: 'draft' | 'analyzed';
  score?: number;
  analysis?: EssayAnalysis;
  updatedAt: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  rewardCoins: number;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatarId: number;
  level: SheepLevelId;
  pinkCoins: number;
  essays: number;
  victories: number;
  isOnline: boolean;
  isCurrentUser?: boolean;
}
