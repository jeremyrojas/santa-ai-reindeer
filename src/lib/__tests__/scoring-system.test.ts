import { calculateScore } from '../scoring-system';

describe('scoring-system', () => {
  it('should calculate percentage score correctly', () => {
    const result = calculateScore(5, 10);
    expect(result).toBe(50);
  });
}); 