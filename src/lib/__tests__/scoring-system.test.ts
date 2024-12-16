import { calculateResult } from '../scoring-system';

describe('Reindeer Quiz Scoring System', () => {
  // Helper function to convert Q1-Q7 format to 1-7 format
  const formatAnswers = (answers: Record<string, string>): Record<number, string> => {
    return Object.entries(answers).reduce((acc, [q, a]) => {
      const questionNumber = parseInt(q.replace('Q', ''));
      acc[questionNumber] = a;
      return acc;
    }, {} as Record<number, string>);
  };

  describe('Primary Personality Paths', () => {
    test('DASHER - should identify pure speed-focused rapid prototyper', () => {
      const answers = formatAnswers({
        Q1: 'A', Q2: 'A', Q3: 'A', Q4: 'A', Q5: 'A', Q6: 'A', Q7: 'A'
      });
      expect(calculateResult(answers)).toBe('DASHER');
    });

    test('DANCER - should identify social-focused team player', () => {
      const answers = formatAnswers({
        Q1: 'C', Q2: 'C', Q3: 'C', Q4: 'C', Q5: 'C', Q6: 'C', Q7: 'C'
      });
      expect(calculateResult(answers)).toBe('DANCER');
    });

    test('PRANCER - should identify precision-focused professional', () => {
      const answers = formatAnswers({
        Q1: 'B', Q2: 'B', Q3: 'B', Q4: 'B', Q5: 'D', Q6: 'B', Q7: 'B'
      });
      expect(calculateResult(answers)).toBe('PRANCER');
    });

    test('CUPID - should identify community-focused catalyst', () => {
      const answers = formatAnswers({
        Q1: 'C', Q2: 'C', Q3: 'C', Q4: 'C', Q5: 'A', Q6: 'A', Q7: 'A'
      });
      expect(calculateResult(answers)).toBe('CUPID');
    });

    test('RUDOLPH - should identify precision with community influence', () => {
      const answers = formatAnswers({
        Q1: 'B', Q2: 'B', Q3: 'C', Q4: 'B', Q5: 'B', Q6: 'B', Q7: 'B'
      });
      expect(calculateResult(answers)).toBe('RUDOLPH');
    });

    test('DONNER - should identify strategy-focused leader', () => {
      const answers = formatAnswers({
        Q1: 'D', Q2: 'D', Q3: 'D', Q4: 'D', Q5: 'D', Q6: 'B', Q7: 'D'
      });
      expect(calculateResult(answers)).toBe('DONNER');
    });
  });

  describe('Complex Balanced Personalities', () => {
    test('BLITZEN - should identify balanced speed and community traits', () => {
      const answers = formatAnswers({
        Q1: 'A', Q2: 'C', Q3: 'C', Q4: 'A', Q5: 'A', Q6: 'C', Q7: 'A'
      });
      expect(calculateResult(answers)).toBe('BLITZEN');
    });

    test('VIXEN - should identify balanced strategy and speed', () => {
      const answers = formatAnswers({
        Q1: 'D', Q2: 'A', Q3: 'A', Q4: 'D', Q5: 'A', Q6: 'D', Q7: 'A'
      });
      expect(calculateResult(answers)).toBe('VIXEN');
    });

    test('COMET - should identify versatile trait combination', () => {
      const answers = formatAnswers({
        Q1: 'A', Q2: 'B', Q3: 'C', Q4: 'D', Q5: 'A', Q6: 'C', Q7: 'B'
      });
      expect(calculateResult(answers)).toBe('COMET');
    });
  });

  describe('Edge Cases and Specific Scenarios', () => {
    test('CUPID vs DANCER - should correctly distinguish community focus', () => {
      // CUPID path (strong early community with speed transition)
      const cupidAnswers = formatAnswers({
        Q1: 'C', Q2: 'C', Q3: 'C', Q4: 'C', Q5: 'A', Q6: 'A', Q7: 'A'
      });
      expect(calculateResult(cupidAnswers)).toBe('CUPID');

      // DANCER path (consistent social focus)
      const dancerAnswers = formatAnswers({
        Q1: 'C', Q2: 'C', Q3: 'C', Q4: 'C', Q5: 'C', Q6: 'C', Q7: 'C'
      });
      expect(calculateResult(dancerAnswers)).toBe('DANCER');
    });

    test('BLITZEN vs DASHER - should correctly distinguish balanced traits', () => {
      // BLITZEN path (balanced speed and community)
      const blitzenAnswers = formatAnswers({
        Q1: 'A', Q2: 'C', Q3: 'C', Q4: 'A', Q5: 'A', Q6: 'C', Q7: 'A'
      });
      expect(calculateResult(blitzenAnswers)).toBe('BLITZEN');

      // DASHER path (pure speed focus)
      const dasherAnswers = formatAnswers({
        Q1: 'A', Q2: 'A', Q3: 'A', Q4: 'A', Q5: 'A', Q6: 'A', Q7: 'A'
      });
      expect(calculateResult(dasherAnswers)).toBe('DASHER');
    });

    test('COMET requirements - should require diverse answers and Q5:A', () => {
      // Valid COMET path
      const validCometAnswers = formatAnswers({
        Q1: 'A', Q2: 'B', Q3: 'C', Q4: 'D', Q5: 'A', Q6: 'C', Q7: 'B'
      });
      expect(calculateResult(validCometAnswers)).toBe('COMET');

      // Invalid path - missing Q5:A
      const invalidCometAnswers = formatAnswers({
        Q1: 'A', Q2: 'B', Q3: 'C', Q4: 'D', Q5: 'B', Q6: 'C', Q7: 'B'
      });
      expect(calculateResult(invalidCometAnswers)).not.toBe('COMET');
    });

    test('RUDOLPH vs PRANCER - should distinguish community influence', () => {
      // RUDOLPH path (precision with community)
      const rudolphAnswers = formatAnswers({
        Q1: 'B', Q2: 'B', Q3: 'C', Q4: 'B', Q5: 'B', Q6: 'B', Q7: 'B'
      });
      expect(calculateResult(rudolphAnswers)).toBe('RUDOLPH');

      // PRANCER path (precision with strategy)
      const prancerAnswers = formatAnswers({
        Q1: 'B', Q2: 'B', Q3: 'B', Q4: 'B', Q5: 'D', Q6: 'B', Q7: 'B'
      });
      expect(calculateResult(prancerAnswers)).toBe('PRANCER');
    });
  });
});