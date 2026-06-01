export type CoachRequest = {
  currentRound: string;
  selectedAugments: string[];
  currentUnits?: string[];
  currentItems?: string[];
};

export type CoachResponse = {
  recommendedComp: string;
  confidence: 'low' | 'medium' | 'high';
  reasoning: string;
  gamePlan: string[];
  pivotOptions: string[];
};