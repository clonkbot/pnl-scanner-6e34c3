import { useState, useCallback } from 'react';
import { WalletTable } from './components/WalletTable';
import { InputPanel } from './components/InputPanel';
import { StatsPanel } from './components/StatsPanel';
import { ScanLines } from './components/ScanLines';
import { GlitchText } from './components/GlitchText';
import { generateMockWallets, WalletData } from './utils/mockData';
import './styles.css';

function App() {
  const [dexLink, setDexLink] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [sortBy, setSortBy] = useState<'pnl' | 'winRate' | 'trades'>('pnl');
  const [filterMinPnl, setFilterMinPnl] = useState(0);
  const [showOnlyProfitable, setShowOnlyProfitable] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [statusText, setStatusText] = useState('AWAITING INPUT...');

  const handleAnalyze = useCallback(() => {
    if (!dexLink.includes('dexscreener') && !dexLink.includes('t.co')) {
      setStatusText('ERROR: INVALID DEXSCREENER LINK');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setWallets([]);

    const steps = [
      'CONNECTING TO DEXSCREENER...',
      'FETCHING TOKEN DATA...',
      'SCANNING TRANSACTION HISTORY...',
      'EXTRACTING WALLET ADDRESSES...',
      'CALCULATING PNL METRICS...',
      'ANALYZING WIN RATES...',
      'SORTING BY PROFITABILITY...',
      'ANALYSIS COMPLETE'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setStatusText(steps[step]);
        step++;
      } else {
        clearInterval(interval);
        setWallets(generateMockWallets(25));
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }
    }, 400);
  }, [dexLink]);

  const sortedWallets = [...wallets]
    .filter(w => {
      if (showOnlyProfitable && w.pnl < 0) return false;
      if (w.pnl < filterMinPnl) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'pnl') return b.pnl - a.pnl;
      if (sortBy === 'winRate') return b.winRate - a.winRate;
      return b.totalTrades - a.totalTrades;
    });

  const stats = {
    totalWallets: wallets.length,
    profitableWallets: wallets.filter(w => w.pnl > 0).length,
    avgPnl: wallets.length > 0 ? wallets.reduce((sum, w) => sum + w.pnl, 0) / wallets.length : 0,
    topPnl: wallets.length > 0 ? Math.max(...wallets.map(w => w.pnl)) : 0,
  };

  return (
    <div className="app">
      <ScanLines />

      <div className="noise-overlay" />

      <header className="header">
        <div className="logo-section">
          <div className="logo-icon">
            <div className="pulse-ring" />
            <div className="logo-inner">$</div>
          </div>
          <div className="logo-text">
            <GlitchText text="PNL_SCANNER" />
            <span className="version">v2.0.4</span>
          </div>
        </div>
        <div className="status-bar">
          <span className="status-indicator" data-active={isAnalyzing || analysisComplete} />
          <span className="status-text">{statusText}</span>
        </div>
      </header>

      <main className="main-content">
        <InputPanel
          dexLink={dexLink}
          setDexLink={setDexLink}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />

        {analysisComplete && (
          <>
            <StatsPanel stats={stats} />

            <div className="filters-panel">
              <div className="filter-group">
                <label>SORT BY:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
                  <option value="pnl">PNL (HIGH → LOW)</option>
                  <option value="winRate">WIN RATE</option>
                  <option value="trades">TOTAL TRADES</option>
                </select>
              </div>
              <div className="filter-group">
                <label>MIN PNL:</label>
                <input
                  type="number"
                  value={filterMinPnl}
                  onChange={(e) => setFilterMinPnl(Number(e.target.value))}
                  placeholder="0"
                />
                <span className="unit">SOL</span>
              </div>
              <div className="filter-group checkbox-group">
                <input
                  type="checkbox"
                  id="profitable"
                  checked={showOnlyProfitable}
                  onChange={(e) => setShowOnlyProfitable(e.target.checked)}
                />
                <label htmlFor="profitable">PROFITABLE ONLY</label>
              </div>
              <div className="results-count">
                SHOWING {sortedWallets.length} / {wallets.length} WALLETS
              </div>
            </div>

            <WalletTable wallets={sortedWallets} />
          </>
        )}
      </main>

      <footer className="footer">
        <span>Requested by @gary66eth · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;
