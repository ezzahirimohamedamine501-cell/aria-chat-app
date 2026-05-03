const SUGGESTIONS = [
  { icon: "✦", text: "Explain quantum computing in simple terms" },
  { icon: "✦", text: "Write a Python script to sort a list of dictionaries" },
  { icon: "✦", text: "What are the best practices for React performance?" },
  { icon: "✦", text: "Help me write a professional email to my team" },
];

export default function EmptyState({ onSuggestion }) {
  return (
    <div className="empty-state">
      <div className="empty-glyph">
        <div className="glyph-ring ring-1" />
        <div className="glyph-ring ring-2" />
        <div className="glyph-core" />
      </div>
      <h1 className="empty-title">How can I help you today?</h1>
      <p className="empty-sub">Ask me anything — I'm here to assist.</p>
      <div className="suggestion-grid">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className="suggestion-card"
            onClick={() => onSuggestion(s.text)}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="sug-icon">{s.icon}</span>
            <span className="sug-text">{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
