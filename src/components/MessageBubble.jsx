import { useState } from "react";

function formatContent(text) {
  // Code blocks
  text = text.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) =>
    `<pre class="code-block${lang ? ` lang-${lang}` : ''}"><code>${escHtml(code.trim())}</code></pre>`
  );
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Numbered lists
  text = text.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>\n?)+/g, '<ol>$&</ol>');
  // Bullet lists
  text = text.replace(/^[-•]\s(.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    if (!match.includes('<ol>')) return `<ul>${match}</ul>`;
    return match;
  });
  // Line breaks
  text = text.replace(/\n/g, '<br/>');
  return text;
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ message, index }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`message-row ${isUser ? "user-row" : "assistant-row"}`}
      style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}
    >
      {!isUser && (
        <div className="avatar ai-avatar">
          <div className="avatar-inner" />
        </div>
      )}

      <div className={`bubble-wrapper ${isUser ? "user-bubble-wrapper" : "ai-bubble-wrapper"}`}>
        <div className={`bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>
          {isUser ? (
            <p className="bubble-text">{message.content}</p>
          ) : (
            <div
              className="bubble-text prose"
              dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
            />
          )}
        </div>
        <div className={`bubble-meta ${isUser ? "meta-right" : "meta-left"}`}>
          <span className="msg-time">{formatTime(message.ts)}</span>
          {!isUser && (
            <button className="copy-btn" onClick={handleCopy} title="Copy">
              {copied ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="avatar user-avatar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
}
