// utils/sum.ts

/**
 * 计算数组中所有数字的总和
 * @param numbers 数字数组
 * @returns 总和，如果数组为空返回0
 * @throws 如果数组中包含非数字值则抛出错误
 */
export const sum = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;

  return numbers.reduce((acc, curr) => {
    if (typeof curr !== 'number') {
      throw new Error('Array must contain only numbers');
    }
    return acc + curr;
  }, 0);
};
