import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import MetaMaskCard from '@components/connectorCards/MetaMaskCard';
import { hooks } from '@connectors/metaMask';
import Button from '@mui/material/Button';
import { utils, Contract } from 'ethers';
import InfoAbi from '@abis/InfoContract.json';
import { InfoContract, InfoContract__factory } from '@abis/types';
import { RedPacket, RedPacket__factory } from '@abis/types';
import RedPacketAbi from '@abis/RedPacket.json';

function HomePage() {
  // 找到合约地址 5777 是 Ganache（一个本地以太坊开发环境）默认的网络 ID。
  /**
   * Network IDs:
   * 1: Ethereum Mainnet
   * 5: Goerli Testnet
   * 11155111: Sepolia Testnet
   * 5777: Ganache Local Network
   */
  const address = RedPacketAbi.networks['5777'].address;

  // 通过 useProvider 连接到 MetaMask 提供程序
  const { useProvider } = hooks;
  const provider = useProvider();
  const signer = provider?.getSigner();
  // 通过合约地址和签名者创建合约实例
  const contract = signer ? RedPacket__factory.connect(address, signer) : undefined; // 合约实例
  const [isPending, setIsPending] = useState(false); // 是否在等待交易
  const [amount, setAmount] = useState(''); // 红包金额
  const [count, setCount] = useState(''); // 合约调用次数
  const [isEqual, setIsEqual] = useState(true); // 是否是等额

  return (
    <HelmetProvider>
      <Helmet>
        <title>Home Page</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="p-4">
        <MetaMaskCard />
        <div className="space-x-4">
          <Button
            variant="contained"
            onClick={async () => {
              if (!contract) return;
              setIsPending(true);
              const result = await contract.grabRedPacket(utils.parseEther(amount), parseInt(count), isEqual);
              const transactionReceipt = await provider?.waitForTransaction(result.hash);
              console.log('transactionReceipt', transactionReceipt);
              if (transactionReceipt?.status === 1 && transactionReceipt.logs.length > 0) {
                console.log('调度合约成功');
                setIsPending(false);
              }
            }}
          >
            调度合约
          </Button>

          <Button
            variant="contained"
            onClick={async () => {
              if (!contract) return;
              setIsPending(true);
              const result = await contract.getInfo();
              console.log('读出合约', result);
              setIsPending(false);
            }}
          >
            读出合约
          </Button>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default HomePage;
