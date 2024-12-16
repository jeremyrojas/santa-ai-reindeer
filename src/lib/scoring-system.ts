// scoring-system.ts

// Define the types first
type TraitScores = {
  speed: number;
  precision: number;
  community: number;
  strategy: number;
  social: number;
};

type AnswerWeight = {
  [trait in keyof TraitScores]?: number;
};

type QuestionWeights = {
  [key: string]: AnswerWeight;
};

type AnswerWeights = {
  [key: string]: QuestionWeights;
};

// Export the weights with proper typing
export const ANSWER_WEIGHTS: AnswerWeights = {
  Q1: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { social: 1, community: 1 },
    D: { strategy: 2 }
  },
  Q2: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { community: 2 },
    D: { strategy: 2 }
  },
  Q3: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { community: 2 },
    D: { strategy: 2 }
  },
  Q4: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { social: 2 },
    D: { strategy: 2 }
  },
  Q5: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { social: 2 },
    D: { strategy: 2 }
  },
  Q6: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { social: 2 },
    D: { strategy: 2 }
  },
  Q7: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { social: 2 },
    D: { strategy: 2 }
  }
};

export function calculateResult(answers: Record<number, string>): string {
  const scores: TraitScores = {
    speed: 0,
    precision: 0,
    community: 0,
    strategy: 0,
    social: 0
  };

  // Calculate scores (same as before)
  Object.entries(answers).forEach(([question, answer]) => {
    const questionNum = `Q${question}`;
    const weights = ANSWER_WEIGHTS[questionNum]?.[answer] || {};
    
    Object.entries(weights).forEach(([trait, value]) => {
      if (trait in scores) {
        scores[trait as keyof TraitScores] += value;
      }
    });
  });

  const sortedTraits = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);
  
  const [primaryTrait, primaryScore] = sortedTraits[0];
  const [secondaryTrait, secondaryScore] = sortedTraits[1];

  // Keep working personalities exactly the same
  if (primaryTrait === 'social' && scores.community >= 2) {
    return 'DANCER';
  }

  if (primaryTrait === 'community' && scores.speed > 0 && scores.community > scores.speed) {
    return 'CUPID';
  }

  // Modified BLITZEN check - make it trigger before DASHER
  if (scores.speed >= 6 && scores.community >= 4 && Math.abs(scores.speed - scores.community) <= 4) {
    return 'BLITZEN';
  }

  if (primaryTrait === 'speed' && secondaryTrait !== 'strategy') {
    return 'DASHER';
  }

  if (primaryTrait === 'precision' && scores.community > 0 && scores.strategy <= scores.community) {
    return 'RUDOLPH';
  }

  if (primaryTrait === 'precision' && scores.strategy > scores.community) {
    return 'PRANCER';
  }

  if (primaryTrait === 'strategy' && scores.precision >= 2) {
    return 'DONNER';
  }

  if ((primaryTrait === 'strategy' && secondaryTrait === 'speed') ||
      (primaryTrait === 'speed' && secondaryTrait === 'strategy') && primaryScore - secondaryScore <= 4) {
    return 'VIXEN';
  }

  // Check for COMET - true versatility
  const nonZeroTraits = Object.values(scores).filter(score => score > 0).length;
  const maxScore = Math.max(...Object.values(scores));
  const minPositiveScore = Math.min(...Object.values(scores).filter(score => score > 0));
  
  // For COMET: need at least 4 traits with points, and max difference of 2 between any non-zero scores
  if (nonZeroTraits >= 4 && (maxScore - minPositiveScore <= 2)) {
    return 'COMET';
  }

  // Fallback unchanged
  const traitToReindeer: Record<string, string> = {
    'speed': 'DASHER',
    'precision': 'PRANCER',
    'community': 'CUPID',
    'strategy': 'DONNER',
    'social': 'DANCER'
  };

  return traitToReindeer[primaryTrait] || 'COMET';
}