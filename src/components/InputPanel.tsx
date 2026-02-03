interface InputPanelProps {
  dexLink: string;
  setDexLink: (link: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function InputPanel({ dexLink, setDexLink, onAnalyze, isAnalyzing }: InputPanelProps) {
  return (
    <div className="input-panel">
      <div className="panel-header">
        <span className="bracket">[</span>
        <span>INPUT_TERMINAL</span>
        <span className="bracket">]</span>
      </div>
      <div className="input-content">
        <div className="input-row">
          <span className="prompt">&gt;&gt;</span>
          <input
            type="text"
            value={dexLink}
            onChange={(e) => setDexLink(e.target.value)}
            placeholder="PASTE DEXSCREENER LINK HERE..."
            className="dex-input"
            disabled={isAnalyzing}
          />
        </div>
        <button
          className="analyze-btn"
          onClick={onAnalyze}
          disabled={isAnalyzing || !dexLink}
        >
          {isAnalyzing ? (
            <span className="loading-text">
              <span className="spinner" />
              ANALYZING...
            </span>
          ) : (
            <>
              <span className="btn-icon">◉</span>
              SCAN_WALLETS
            </>
          )}
        </button>
      </div>
      <div className="input-hint">
        SUPPORTED: dexscreener.com/solana/*, t.co/* (shortened links)
      </div>
    </div>
  );
}
