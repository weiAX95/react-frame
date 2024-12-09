import { useEffect, useState } from 'react';
import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  // 状态管理：存储每个账户的余额
  const [balances, setBalances] = useState<BigNumber[] | undefined>();
  // 确保provider和账户都存在
  useEffect(() => {
    if (provider && accounts?.length) {
      // 用于防止在组件卸载后设置状态
      let stale = false;
      // 并行获取所有账户余额
      void Promise.all(accounts.map(account => provider.getBalance(account))).then(balances => {
        // 如果组件已卸载，不更新状态
        if (stale) return;
        setBalances(balances);
      });
      // 清理函数
      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]); // 依赖于provider和accounts的变化

  return balances;
}

export function Accounts({
  accounts, // 账户地址数组
  provider, // Web3 provider
  ENSNames, // ENS域名数组
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
}) {
  // 使用自定义Hook获取账户余额
  const balances = useBalances(provider, accounts);
  // 如果没有账户信息，不渲染任何内容
  if (accounts === undefined) return null;

  return (
    <div>
      Accounts:{' '}
      <b>
        {accounts.length === 0
          ? 'None' // 如果没有连接的账户，显示“None”
          : accounts?.map((account, i) => (
              // 为每个账户创建列表项s
              <ul key={account} style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ENSNames?.[i] ?? account}
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </ul>
            ))}
      </b>
    </div>
  );
}
