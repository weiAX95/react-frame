import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import MetaMaskCard from '@components/connectorCards/MetaMaskCard';
import { hooks } from '@connectors/metaMask';
import { Button, TextField, Switch, FormControlLabel, Card, Typography, CircularProgress } from '@mui/material';
import { utils, Contract } from 'ethers';
import { RedPacket, RedPacket__factory } from '@abis/types';
import RedPacketAbi from '@abis/RedPacket.json';
// 假设已经引入了这些图标组件
import { Clock, Wallet, Gift, Users, Repeat, Send } from 'lucide-react';

function HomePage() {
  const address = RedPacketAbi.networks['5777'].address;
  const { useProvider } = hooks;
  const provider = useProvider();
  const signer = provider?.getSigner();
  const contract = signer ? RedPacket__factory.connect(address, signer) : undefined;

  const [isPending, setIsPending] = useState(false);
  const [amount, setAmount] = useState('');
  const [count, setCount] = useState('');
  const [isEqual, setIsEqual] = useState(true);
  const [expireHours, setExpireHours] = useState('24');
  const [packetInfo, setPacketInfo] = useState<any>(null);
  const [myGrabbedAmount, setMyGrabbedAmount] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  // 添加状态检查
  const [canRefund, setCanRefund] = useState(false);


  // 获取红包信息
  const updatePacketInfo = async () => {
    if (!contract || !signer) return;
    try {
      const info = await contract.getRedPacketInfo();
      setPacketInfo({
        remaining: utils.formatEther(info.remaining),
        remainingCount: info.remainingCount.toString(),
        equalDistribution: info.equalDistribution,
        expiryTime: new Date(info.expiryTime.toNumber() * 1000),
        active: info.active
      });

      const address = await signer.getAddress();
      const grabbed = await contract.getGrabbedAmount(address);
      setMyGrabbedAmount(utils.formatEther(grabbed));
    } catch (error) {
      console.error('Error getting packet info:', error);
    }
  };
  // 检查是否可以退款
  const checkRefundability = async () => {
    if (!contract || !signer) return;
    try {
      const [owner, currentAddress, info] = await Promise.all([
        contract.owner(),
        signer.getAddress(),
        contract.getRedPacketInfo()
      ]);

      const isOwner = owner.toLowerCase() === currentAddress.toLowerCase();
      const isExpired = Date.now() / 1000 >= info.expiryTime.toNumber();
      debugger
      setCanRefund(
        isOwner && // 是合约拥有者
        info.active && // 红包激活
        isExpired && // 已过期
        info.remaining.gt(0) // 有余额
      );
    } catch (error) {
      console.error('Error checking refundability:', error);
    }
  };

  useEffect(() => {
    checkRefundability();
  }, [contract, signer]);


  useEffect(() => {
    if (contract) {
      updatePacketInfo();
      // 设置事件监听
      contract.on('DepositMade', updatePacketInfo);
      contract.on('GrabSuccess', updatePacketInfo);
      contract.on('RefundMade', updatePacketInfo);

      return () => {
        contract.removeAllListeners();
      };
    }
  }, [contract]);

  // 发红包
  const handleDeposit = async () => {
    if (!contract) return;
    try {
      setIsPending(true);
      const value = utils.parseEther(amount);
      console.log('Deposit params:', {
        count: parseInt(count),
        isEqual,
        expireHours: parseInt(expireHours),
        value: utils.parseEther(amount)
      });

      const tx = await contract.deposit(
        parseInt(count),
        isEqual,
        parseInt(expireHours),
        {
          value: utils.parseEther(amount),
          gasLimit: 300000 // 添加gas限制
        }
      );
      await tx.wait();
      await updatePacketInfo();
    } catch (error) {
      console.error('Error depositing:', error);
    } finally {
      setIsPending(false);
    }
  };



  const handleError = (error: any) => {
    console.error('Transaction error:', error);

    let errorMessage = '交易失败';

    if (error.code === 4001) {
      errorMessage = '用户取消了交易';
    } else if (error.code === -32603) {
      errorMessage = '请检查账户余额和Gas费用';
    }

    alert(errorMessage);
  };
  // 抢红包
  const handleGrab = async () => {
    if (!contract) return;
    try {
      setIsPending(true);
      const address = await signer?.getAddress();
      if (address) {
        const grabbed = await contract.getGrabbedAmount(address);
        if (grabbed.gt(0)) {
          alert('您已经抢过这个红包了');
          return;
        }
      }
      const tx = await contract.grabRedPacket();
      await tx.wait();
      await updatePacketInfo();
    } catch (error) {
      handleError(error);
    } finally {
      setIsPending(false);
    }
  };

  // 退款
  const handleRefund = async () => {
    if (!contract || !signer) return;
    try {
      setIsPending(true);
      // 检查是否是合约拥有者
      const owner = await contract.owner();
      const currentAddress = await signer.getAddress();
      if (owner.toLowerCase() !== currentAddress.toLowerCase()) {
        alert('只有红包发送者才能退回红包');
        return;
      }

      // 检查红包状态
      const info = await contract.getRedPacketInfo();
      if (!info.active) {
        alert('没有活跃的红包可以退回');
        return;
      }

      // 检查是否过期
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < info.expiryTime.toNumber()) {
        alert('红包还未过期，无法退回');
        return;
      }

      const tx = await contract.refund();
      await tx.wait();
      await updatePacketInfo();
      alert('退款成功');
    } catch (error: any) {
      console.error('Refund error:', error);
      // 处理特定错误
      if (error.data?.message?.includes('Not expired yet')) {
        alert('红包还未过期');
      } else if (error.data?.message?.includes('No active red packet')) {
        alert('没有活跃的红包');
      } else if (error.data?.message?.includes('Only owner')) {
        alert('只有红包发送者才能退回');
      } else {
        alert('退款失败: ' + (error.message || '未知错误'));
      }
      // handleError(error);
      // console.error('Error refunding:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700">
      <div className="container mx-auto p-4 md:p-6">
        {/* 钱包连接卡片 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 flex justify-between items-center">
          <MetaMaskCard />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 发红包卡片 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-2 mb-6">
              <Gift className="w-6 h-6" />
              <h2 className="text-xl font-bold">发送新红包</h2>
            </div>

            <div className="space-y-4">
              {/* 金额输入 */}
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-300" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="红包金额 (ETH)"
                  className="w-full bg-white/20 rounded-lg py-3 pl-12 pr-4 outline-none placeholder-red-200"
                />
              </div>

              {/* 数量输入 */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-300" />
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="红包数量"
                  className="w-full bg-white/20 rounded-lg py-3 pl-12 pr-4 outline-none placeholder-red-200"
                />
              </div>

              {/* 过期时间 */}
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-300" />
                <input
                  type="number"
                  value={expireHours}
                  onChange={(e) => setExpireHours(e.target.value)}
                  placeholder="有效期(小时)"
                  className="w-full bg-white/20 rounded-lg py-3 pl-12 pr-4 outline-none placeholder-red-200"
                />
              </div>

              {/* 红包类型切换 */}
              <div className="flex bg-white/20 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${isEqual ? 'bg-red-500' : ''}`}
                  onClick={() => setIsEqual(true)}
                >
                  均分红包
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${!isEqual ? 'bg-red-500' : ''}`}
                  onClick={() => setIsEqual(false)}
                >
                  随机红包
                </button>
              </div>

              <button
                onClick={handleDeposit}
                disabled={isPending || !amount || !count}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 
                          disabled:from-gray-400 disabled:to-gray-500 py-3 rounded-lg font-bold text-red-900 
                          transition-all transform hover:scale-105 disabled:hover:scale-100"
              >
                {isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-900"></div>
                    <span>处理中...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>发送红包</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* 当前红包状态卡片 */}
          {packetInfo && packetInfo.active && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Gift className="w-6 h-6" />
                <span>当前红包</span>
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm text-red-200">剩余金额</div>
                    <div className="text-xl font-bold">{packetInfo.remaining} ETH</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm text-red-200">剩余数量</div>
                    <div className="text-xl font-bold">{packetInfo.remainingCount}</div>
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm text-red-200">过期时间</div>
                  <div className="text-lg">{packetInfo.expiryTime.toLocaleString()}</div>
                </div>

                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm text-red-200">我抢到的金额</div>
                  <div className="text-xl font-bold">{myGrabbedAmount} ETH</div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleGrab}
                    disabled={isPending}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                              disabled:from-gray-400 disabled:to-gray-500 py-3 rounded-lg font-bold
                              transition-all transform hover:scale-105 disabled:hover:scale-100"
                  >
                    抢红包
                  </button>
                  <button
                    onClick={handleRefund}
                    disabled={isPending || !canRefund}
                    className="flex-1 bg-white/20 hover:bg-white/30 disabled:bg-white/10 
                              py-3 rounded-lg font-bold transition-all"
                  >
                    退回红包
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;