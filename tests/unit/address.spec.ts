import { describe, expect, it } from '@jest/globals';
import { formatAddress } from '@utils/address';

describe('formatAddress', () => {
  it('should format normal address', () => {
    expect(formatAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234...5678');
  });

  it('should handle empty address', () => {
    expect(formatAddress('')).toBe('');
  });

  it('should handle short address', () => {
    expect(formatAddress('0x1234')).toBe('0x1234');
  });

  it('should handle custom lengths', () => {
    expect(formatAddress('0x1234567890abcdef1234567890abcdef12345678', 8, 6)).toBe(
      '0x123456...345678'
    );
  });

  it('should handle address with exact length as prefix + suffix', () => {
    expect(formatAddress('0x12345678', 4, 4)).toBe('0x12345678');
  });

  // 添加更多边界情况测试
  it('should handle address shorter than prefix length', () => {
    expect(formatAddress('0x123', 4, 4)).toBe('0x123');
  });

  it('should handle zero prefix length', () => {
    expect(formatAddress('0x1234567890', 0, 4)).toBe('...7890');
  });

  it('should handle zero suffix length', () => {
    expect(formatAddress('0x1234567890', 4, 0)).toBe('0x12...');
  });
});
