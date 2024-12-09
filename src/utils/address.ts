// utils/address.ts

/**
 * 格式化地址，保留头尾，中间省略
 * @param address 钱包地址
 * @param prefixLength 前缀长度，默认 6
 * @param suffixLength 后缀长度，默认 4
 * @returns 格式化后的地址
 */
export const formatAddress = (
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4
): string => {
  if (!address) return '';

  // 如果地址长度小于或等于前缀+后缀长度，直接返回原地址
  if (address.length <= prefixLength + suffixLength) return address;

  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
};
