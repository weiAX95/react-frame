import { describe, expect, it } from '@jest/globals';
import { sum } from '@utils/index';

describe('sum', () => {
  it('should return 0 for empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('should correctly sum numbers', () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([0, -1, 1])).toBe(0);
    expect(sum([-1, -2, -3])).toBe(-6);
  });

  it('should handle decimal numbers', () => {
    expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
  });

  it('should throw error for non-number values', () => {
    // @ts-expect-error: Testing invalid input
    expect(() => sum([1, '2', 3])).toThrow('Array must contain only numbers');
  });

  it('should handle single number array', () => {
    expect(sum([5])).toBe(5);
  });

  it('should handle large numbers', () => {
    const largeNumbers = [Number.MAX_SAFE_INTEGER, 1, -1];
    expect(sum(largeNumbers)).toBe(Number.MAX_SAFE_INTEGER);
  });
});
