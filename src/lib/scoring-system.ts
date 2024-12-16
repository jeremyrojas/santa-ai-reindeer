// scoring-system.ts

type TraitScores = {
  speed: number;
  precision: number;
  community: number;
  strategy: number;
  social: number;
  versatility: number;
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
    A: { speed: 1, versatility: 3 },
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

function countEarlyAnswers(answers: Record<number, string>, targetAnswer: string): number {
  return [1, 2, 3, 4].filter(q => answers[q] === targetAnswer).length;
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

  // Early pattern analysis
  const earlyCCount = countEarlyAnswers(answers, 'C');
  const earlyACount = countEarlyAnswers(answers, 'A');

  // Check for COMET first
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

  const sortedTraits = Object.entries(scores)
    .filter(([trait]) => trait !== 'versatility')
    .sort(([, a], [, b]) => b - a);
  
  const [primaryTrait, primaryScore] = sortedTraits[0];
  const [secondaryTrait, secondaryScore] = sortedTraits[1];

  // CUPID specific check - must have strong early community presence
  if (earlyCCount >= 3 && scores.community >= 5 && scores.speed > 0) {
    return 'CUPID';
  }

  // DANCER check
  if (primaryTrait === 'social' && scores.community >= 2) {
    return 'DANCER';
  }

  // BLITZEN check - strong speed with community balance
  if (
    scores.speed >= 6 &&
    scores.community >= 4 &&
    earlyACount >= 2 && // Ensure early speed presence
    Math.abs(scores.speed - scores.community) <= 4
  ) {
    return 'BLITZEN';
  }

  // DASHER check - pure speed focus
  if (primaryTrait === 'speed' && secondaryTrait !== 'strategy' && scores.speed >= 8) {
    return 'DASHER';
  }

  // RUDOLPH check
  if (primaryTrait === 'precision' && scores.community > 0 && scores.strategy <= scores.community) {
    return 'RUDOLPH';
  }

  // PRANCER check
  if (primaryTrait === 'precision' && scores.strategy > scores.community) {
    return 'PRANCER';
  }

  // DONNER check
  if (primaryTrait === 'strategy' && scores.precision >= 2) {
    return 'DONNER';
  }

  // VIXEN check
  if ((primaryTrait === 'strategy' && secondaryTrait === 'speed') ||
      (primaryTrait === 'speed' && secondaryTrait === 'strategy') && primaryScore - secondaryScore <= 4) {
    return 'VIXEN';
  }

  // Fallback
  const traitToReindeer: Record<string, string> = {
    'speed': 'DASHER',
    'precision': 'PRANCER',
    'community': 'CUPID',
    'strategy': 'DONNER',
    'social': 'DANCER'
  };

  return traitToReindeer[primaryTrait] || 'COMET';
}