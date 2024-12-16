type TraitScores = {
  speed: number;
  precision: number;
  community: number;
  strategy: number;
};

// Simple +2 scoring for primary traits
export const ANSWER_WEIGHTS = {
  Q1: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { community: 2 },
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
    C: { community: 2 },
    D: { strategy: 2 }
  },
  Q5: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { community: 2 },
    D: { strategy: 2 }
  },
  Q6: {
    A: { speed: 2 },
    B: { precision: 2 },
    C: { community: 2 },
    D: { strategy: 2 }
  }
};

export function calculateResult(answers: Record<number, string>): string {
  // Initialize scores
  const scores: TraitScores = {
    speed: 0,
    precision: 0,
    community: 0,
    strategy: 0
  };

  // Calculate total scores
  Object.entries(answers).forEach(([question, answer]) => {
    const questionNum = `Q${question}` as keyof typeof ANSWER_WEIGHTS;
    const weights = ANSWER_WEIGHTS[questionNum][answer as keyof typeof ANSWER_WEIGHTS[typeof questionNum]];
    
    Object.entries(weights).forEach(([trait, value]) => {
      scores[trait as keyof TraitScores] += value;
    });
  });

  // Find highest and second highest traits
  const sortedTraits = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);
  
  const [primaryTrait] = sortedTraits[0];
  const [secondaryTrait] = sortedTraits[1];

  // Determine reindeer based on trait combinations
  if (primaryTrait === 'speed' && secondaryTrait === 'community') {
    return 'DASHER';
  }
  if (primaryTrait === 'precision' && secondaryTrait === 'strategy') {
    return 'PRANCER';
  }
  if (primaryTrait === 'community' && secondaryTrait === 'speed') {
    return 'CUPID';
  }
  if (primaryTrait === 'strategy' && secondaryTrait === 'precision') {
    return 'DONNER';
  }

  // Check for balanced traits
  const difference = sortedTraits[0][1] - sortedTraits[1][1];
  if (difference <= 2) { // Consider traits balanced if within 2 points
    if ((primaryTrait === 'speed' && secondaryTrait === 'community') ||
        (primaryTrait === 'community' && secondaryTrait === 'speed')) {
      return 'BLITZEN';
    }
    if ((primaryTrait === 'precision' && secondaryTrait === 'community') ||
        (primaryTrait === 'community' && secondaryTrait === 'precision')) {
      return 'RUDOLPH';
    }
    if ((primaryTrait === 'strategy' && secondaryTrait === 'speed') ||
        (primaryTrait === 'speed' && secondaryTrait === 'strategy')) {
      return 'VIXEN';
    }
  }

  // If all traits are within 3 points of each other
  if (sortedTraits[0][1] - sortedTraits[3][1] <= 3) {
    return 'COMET';
  }

  // Default fallback based on highest trait
  return 'COMET';
} 