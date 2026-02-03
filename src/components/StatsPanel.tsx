interface StatsPanelProps {
  stats: {
    totalWallets: number;
    profitableWallets: number;
    avgPnl: number;
    topPnl: number;
  };
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-label">WALLETS FOUND</div>
        <div className="stat-value">{stats.totalWallets}</div>
      </div>
      <div className="stat-card profitable">
        <div className="stat-label">PROFITABLE</div>
        <div className="stat-value">
          {stats.profitableWallets}
          <span className="stat-percent">
            ({((stats.profitableWallets / stats.totalWallets) * 100).toFixed(1)}%)
          </span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">AVG PNL</div>
        <div className={`stat-value ${stats.avgPnl >= 0 ? 'positive' : 'negative'}`}>
          {stats.avgPnl >= 0 ? '+' : ''}{stats.avgPnl.toFixed(2)} SOL
        </div>
      </div>
      <div className="stat-card highlight">
        <div className="stat-label">TOP PNL</div>
        <div className="stat-value positive">+{stats.topPnl.toFixed(2)} SOL</div>
      </div>
    </div>
  );
}
