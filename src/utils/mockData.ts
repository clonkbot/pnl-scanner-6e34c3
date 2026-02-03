export interface WalletData {
  address: string;
  pnl: number;
  winRate: number;
  totalTrades: number;
  avgHoldTime: string;
  lastActive: string;
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
}

const generateAddress = (): string => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const holdTimes = ['2m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '1d', '3d', '7d'];
const lastActiveTimes = ['1m ago', '5m ago', '15m ago', '30m ago', '1h ago', '2h ago', '6h ago', '12h ago', '1d ago', '3d ago'];

const getGrade = (pnl: number, winRate: number): WalletData['grade'] => {
  const score = (pnl / 10) + (winRate / 20);
  if (score > 8) return 'S';
  if (score > 5) return 'A';
  if (score > 3) return 'B';
  if (score > 1) return 'C';
  if (score > -1) return 'D';
  return 'F';
};

export const generateMockWallets = (count: number): WalletData[] => {
  const wallets: WalletData[] = [];

  for (let i = 0; i < count; i++) {
    // Weighted distribution - most wallets are average, few are exceptional
    const random = Math.random();
    let pnl: number;

    if (random > 0.95) {
      // 5% chance: whale-tier gains
      pnl = 50 + Math.random() * 200;
    } else if (random > 0.8) {
      // 15% chance: solid gains
      pnl = 10 + Math.random() * 40;
    } else if (random > 0.5) {
      // 30% chance: small gains
      pnl = Math.random() * 10;
    } else if (random > 0.2) {
      // 30% chance: small losses
      pnl = -Math.random() * 10;
    } else {
      // 20% chance: rekt
      pnl = -10 - Math.random() * 30;
    }

    const winRate = Math.max(10, Math.min(95, 50 + (pnl / 5) + (Math.random() * 20 - 10)));
    const totalTrades = Math.floor(5 + Math.random() * 95);

    wallets.push({
      address: generateAddress(),
      pnl: Math.round(pnl * 100) / 100,
      winRate: Math.round(winRate * 10) / 10,
      totalTrades,
      avgHoldTime: holdTimes[Math.floor(Math.random() * holdTimes.length)],
      lastActive: lastActiveTimes[Math.floor(Math.random() * lastActiveTimes.length)],
      grade: getGrade(pnl, winRate),
    });
  }

  return wallets;
};
