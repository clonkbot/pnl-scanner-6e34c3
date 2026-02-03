import { useState } from 'react';
import { WalletData } from '../utils/mockData';

interface WalletTableProps {
  wallets: WalletData[];
}

export function WalletTable({ wallets }: WalletTableProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getPnlClass = (pnl: number) => {
    if (pnl > 50) return 'pnl-mega';
    if (pnl > 10) return 'pnl-high';
    if (pnl > 0) return 'pnl-positive';
    if (pnl > -10) return 'pnl-negative';
    return 'pnl-rekt';
  };

  const getWinRateClass = (rate: number) => {
    if (rate >= 70) return 'rate-excellent';
    if (rate >= 50) return 'rate-good';
    return 'rate-poor';
  };

  return (
    <div className="wallet-table-container">
      <div className="table-header-row">
        <span className="bracket">[</span>
        <span>WALLET_DATA</span>
        <span className="bracket">]</span>
        <span className="table-subtitle">// click address to copy</span>
      </div>
      <div className="table-wrapper">
        <table className="wallet-table">
          <thead>
            <tr>
              <th>#</th>
              <th>WALLET</th>
              <th>PNL (SOL)</th>
              <th>WIN RATE</th>
              <th>TRADES</th>
              <th>AVG HOLD</th>
              <th>LAST ACTIVE</th>
              <th>GRADE</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet, index) => (
              <tr key={wallet.address} className="wallet-row" style={{ animationDelay: `${index * 0.05}s` }}>
                <td className="rank">{index + 1}</td>
                <td className="address-cell">
                  <button
                    className={`address-btn ${copiedAddress === wallet.address ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(wallet.address)}
                  >
                    {copiedAddress === wallet.address ? 'COPIED!' : formatAddress(wallet.address)}
                  </button>
                </td>
                <td className={`pnl-cell ${getPnlClass(wallet.pnl)}`}>
                  {wallet.pnl >= 0 ? '+' : ''}{wallet.pnl.toFixed(2)}
                </td>
                <td className={`winrate-cell ${getWinRateClass(wallet.winRate)}`}>
                  {wallet.winRate.toFixed(1)}%
                </td>
                <td className="trades-cell">{wallet.totalTrades}</td>
                <td className="hold-cell">{wallet.avgHoldTime}</td>
                <td className="active-cell">{wallet.lastActive}</td>
                <td className="grade-cell">
                  <span className={`grade grade-${wallet.grade.toLowerCase()}`}>
                    {wallet.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
