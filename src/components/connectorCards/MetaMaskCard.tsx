import { useEffect, useState } from 'react';
import { Card } from '@pages/Card';

import { hooks, metaMask } from '../../connectors/metaMask';

// import { Card } from '../Card';
/**
 *  useChainId,      // 获取当前链ID的钩子
    useAccounts,     // 获取账户信息的钩子
    useIsActivating, // 检查是否正在激活连接的钩子
    useIsActive,     // 检查连接是否激活的钩子
    useProvider,     // 获取 Web3 Provider 的钩子
    useENSNames      // 获取 ENS 名称的钩子
 */
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

export default function MetaMaskCard() {
  // 获取当前链ID
  const chainId = useChainId();
  // 获取连接的账户
  const accounts = useAccounts();
  // 获取是否正在激活状态
  const isActivating = useIsActivating();
  // 获取是否已激活状态
  const isActive = useIsActive();
  // 获取 Web3 Provider
  const provider = useProvider();
  // 获取 ENS 名称
  const ENSNames = useENSNames(provider);
  // 定义错误状态
  const [error, setError] = useState<Error | undefined>(undefined);

  // 组件挂载时尝试自动连接 MetaMask
  // attempt to connect eagerly on mount
  useEffect(() => {
    // void 操作符用于显式表明我们不关心 Promise 的返回值
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []); // 空依赖数组表示仅在组件挂载时执行一次

  // 渲染 Card 组件，传入所有必要的 props
  return (
    <Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
