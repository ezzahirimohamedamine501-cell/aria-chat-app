export default function Header({ onClear, hasMessages }) {
  return (
    <header className="chat-header">
      <div className="header-brand">
        <div className="brand-dot" />
        <span className="brand-name">ARIA</span>
        <span className="brand-tag">AI Assistant</span>
      </div>
      {hasMessages && (
        <button onClick={onClear} className="clear-btn" title="Clear chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
          Clear chat
        </button>
      )}
    </header>
  );
}
