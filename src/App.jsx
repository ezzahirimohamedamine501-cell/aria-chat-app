import { useState, useRef, useEffect, useCallback } from "react";
import MessageBubble from "./components/MessageBubble";
import TypingIndicator from "./components/TypingIndicator";
import ChatInput from "./components/ChatInput";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header";
import { sendMessage } from "./utils/api";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;
    setError(null);

    const userMsg = { id: Date.now(), role: "user", content: text, ts: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await sendMessage(history, controller.signal);

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: reply, ts: new Date() },
      ]);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleStop = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="app-root">
      <div className="chat-shell">
        <Header onClear={handleClear} hasMessages={messages.length > 0} />

        <main className="message-area">
          {messages.length === 0 && !isLoading ? (
            <EmptyState onSuggestion={handleSend} />
          ) : (
            <div className="message-list">
              {messages.map((msg, i) => (
                <MessageBubble key={msg.id} message={msg} index={i} />
              ))}
              {isLoading && <TypingIndicator />}
              {error && (
                <div className="error-pill">
                  <span className="error-icon">⚠</span>
                  {error}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </main>

        <footer className="input-area">
          <ChatInput onSend={handleSend} onStop={handleStop} isLoading={isLoading} />
          <p className="disclaimer">AI can make mistakes. Verify important information.</p>
        </footer>
      </div>
    </div>
  );
}
