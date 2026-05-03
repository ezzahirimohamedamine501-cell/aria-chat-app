export default function TypingIndicator() {
  return (
    <div className="message-row assistant-row">
      <div className="avatar ai-avatar">
        <div className="avatar-inner" />
      </div>
      <div className="bubble ai-bubble typing-bubble">
        <span className="dot" style={{ animationDelay: "0ms" }} />
        <span className="dot" style={{ animationDelay: "160ms" }} />
        <span className="dot" style={{ animationDelay: "320ms" }} />
      </div>
    </div>
  );
}
