import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend, onStop, isLoading }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
    textareaRef.current.style.height = "auto";
  };

  return (
    <div className="input-shell">
      <div className="input-box">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ARIA…"
          rows={1}
          disabled={isLoading}
          className="msg-textarea"
        />
        <div className="input-actions">
          {isLoading ? (
            <button onClick={onStop} className="send-btn stop-btn" title="Stop generating">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!value.trim()}
              className="send-btn"
              title="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <p className="shortcut-hint">Enter to send · Shift+Enter for new line</p>
    </div>
  );
}
