import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function HypeCheck() {
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I am your WealthPath AI. Paste any stock tip, penny stock claim, or SIP recommendation you saw on social media to audit its risk level against actual earnings baseline.",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    // 1. Add User Message to Chat
    const userMsg = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 2. Call your Backend API or Serverless Function
      const response = await fetch("/api/hype-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmedInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach Hype Check AI server.");
      }

      const data = await response.json();

      // 3. Add AI Response to Chat
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          isAudit: true,
          content: {
            title: data.title || "Hype Audit Result",
            points: data.points || [],
            recommendation: data.recommendation || "",
          },
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I encountered an error auditing that claim. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={styles.container}>
      {/* ... Your existing JSX layout ... */}

      <div className="chat-input">
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            loading
              ? "Auditing claim with AI..."
              : "e.g., 'An Instagram Reel said XYZ Stock will 3x in 1 month, should I buy?'"
          }
        />
        <button className="send-btn" onClick={handleSend} disabled={loading}>
          {loading ? "Auditing..." : "Check Hype"}
        </button>
      </div>
    </div>
  );
}