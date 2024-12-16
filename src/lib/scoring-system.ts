console.log('Loading scoring-system.ts');

// scoring-system.ts

type TraitScores = {
  speed: number;
  precision: number;
  community: number;
  strategy: number;
  social: number;
  versatility: number; // New trait specifically for tracking tool mastery
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

// Updated weights with versatility scoring
export const ANSWER_WEIGHTS: AnswerWeights = {
  Q1: {
    A: { speed: 2, versatility: 1 },
    B: { precision: 2, versatility: 1 },
    C: { social: 1, community: 1, versatility: 1 },
    D: { strategy: 2, versatility: 1 }
  },
  Q2: {
    A: { speed: 2, versatility: 1 },
    B: { precision: 2, versatility: 1 },
    C: { community: 2, versatility: 1 },
    D: { strategy: 2, versatility: 1 }
  },
  Q3: {
    A: { speed: 2, versatility: 1 },
    B: { precision: 2, versatility: 1 },
    C: { community: 2, versatility: 1 },
    D: { strategy: 2, versatility: 1 }
  },
  Q4: {
    A: { speed: 2, versatility: 1 },
    B: { precision: 2, versatility: 1 },
    C: { social: 2, versatility: 1 },
    D: { strategy: 2, versatility: 1 }
  },
  Q5: {
    A: { speed: 1, versatility: 3 }, // Increased versatility points for "all tools" answer
    B: { precision: 2 },
    C: { social: 2 },
    D: { strategy: 2 }
  },
  Q6: {
    A: { speed: 2, versatility: 1 },
    B: { precision: 2, versatility: 1 },
    C: { social: 2, versatility: 1 },
    D: { strategy: 2, versatility: 1 }
  },
  Q7: {
    A: { speed: 2, versatility: 1 },
    B: { precision: 2, versatility: 1 },
    C: { social: 2, versatility: 1 },
    D: { strategy: 2, versatility: 1 }
  }
};

export function calculateScore(correctAnswers: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function calculateResult(answers: Record<number, string>): string {
  const scores: TraitScores = {
    speed: 0,
    precision: 0,
    community: 0,
    strategy: 0,
    social: 0,
    versatility: 0
  };

  // Calculate scores
  Object.entries(answers).forEach(([question, answer]) => {
    const questionNum = `Q${question}`;
    const weights = ANSWER_WEIGHTS[questionNum]?.[answer] || {};
    
    Object.entries(weights).forEach(([trait, value]) => {
      if (trait in scores) {
        scores[trait as keyof TraitScores] += value;
      }
    });
  });

  // Count unique answer types (A, B, C, D)
  const uniqueAnswers = new Set(Object.values(answers)).size;

  // Check for COMET first - New clearer conditions
  if (
    answers[5] === 'A' &&
    uniqueAnswers >= 4 &&
    scores.versatility >= 6 &&
    Object.entries(scores)
      .filter(([trait]) => trait !== 'versatility')
      .every(([, score]) => score > 0)
  ) {
    return 'COMET';
  }

  // Rest of the personality checks remain the same
  const sortedTraits = Object.entries(scores)
    .filter(([trait]) => trait !== 'versatility')
    .sort(([, a], [, b]) => b - a);
  
  const [primaryTrait, primaryScore] = sortedTraits[0];
  const [secondaryTrait, secondaryScore] = sortedTraits[1];

  if (primaryTrait === 'social' && scores.community >= 2) {
    return 'DANCER';
  }

  // Modified BLITZEN check - more specific conditions
  if (
    scores.speed >= 6 && // Increased minimum speed requirement
    scores.community >= 4 &&
    scores.speed + scores.community >= 10 &&
    Math.abs(scores.speed - scores.community) <= 4 &&
    primaryTrait === 'speed' // Must be primarily speed-focused
  ) {
    return 'BLITZEN';
  }

  if (primaryTrait === 'community' && scores.speed > 0) {
    return 'CUPID';
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