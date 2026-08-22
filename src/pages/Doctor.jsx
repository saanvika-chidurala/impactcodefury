import { useState } from "react";
import "./Doctor.css";

function Doctor() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const suggestions = [
    {
      icon: "🎯",
      title: "Check my goal",
      text: "Am I on track to reach my financial goal?",
    },
    {
      icon: "📊",
      title: "Review my portfolio",
      text: "How should I think about my portfolio?",
    },
    {
      icon: "💡",
      title: "Explain investing",
      text: "Explain an investment concept simply.",
    },
    {
      icon: "📈",
      title: "Market question",
      text: "Help me understand what's happening in the market.",
    },
  ];

  async function sendMessage(e, customMessage = null) {
    if (e) e.preventDefault();

    const userMessage = (customMessage || message).trim();

    if (!userMessage || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong"
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            data.response ||
            data.message ||
            "I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't connect to WealthPath Buddy right now. Please make sure the backend server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestion(text) {
    sendMessage(null, text);
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="buddy-page">

      {/* HEADER */}
      <div className="buddy-topbar">
        <div>
          <p className="buddy-eyebrow">
            WEALTHPATH INTELLIGENCE
          </p>

          <h1>WealthPath Buddy</h1>

          <p className="buddy-subtitle">
            Your personal financial copilot.
          </p>
        </div>

        <div className="ai-status">
          <span className="ai-status-dot"></span>
          AI ONLINE
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="buddy-card">

        {!hasMessages ? (
          <div className="buddy-welcome">

            <div className="buddy-orb">
              ✦
            </div>

            <p className="welcome-eyebrow">
              YOUR MONEY, UNDERSTOOD
            </p>

            <h2>
              What would you like
              <br />
              to understand today?
            </h2>

            <p className="welcome-description">
              Ask me about your goals, investments,
              portfolio, or anything you're unsure about.
            </p>

            {/* SUGGESTIONS */}
            <div className="suggestion-grid">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  className="suggestion-card"
                  onClick={() =>
                    handleSuggestion(item.text)
                  }
                >
                  <span className="suggestion-icon">
                    {item.icon}
                  </span>

                  <span className="suggestion-title">
                    {item.title}
                  </span>

                  <span className="suggestion-text">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

          </div>
        ) : (
          <div className="conversation">

            <div className="conversation-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-row ${
                    msg.role === "user"
                      ? "message-user"
                      : "message-buddy"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="buddy-avatar">
                      W
                    </div>
                  )}

                  <div
                    className={`message-bubble ${
                      msg.role === "user"
                        ? "user-bubble"
                        : "buddy-bubble"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="message-name">
                        WealthPath Buddy
                      </div>
                    )}

                    <div>{msg.content}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row message-buddy">
                  <div className="buddy-avatar">
                    W
                  </div>

                  <div className="message-bubble buddy-bubble">
                    <div className="message-name">
                      WealthPath Buddy
                    </div>

                    <div className="typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="conversation-label">
              Conversation
            </div>

          </div>
        )}

        {/* INPUT */}
        <form
          className="buddy-input"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask WealthPath Buddy anything..."
            disabled={loading}
          />

          <button
            type="submit"
            disabled={
              loading || !message.trim()
            }
            aria-label="Send message"
          >
            →
          </button>
        </form>

      </div>

      {/* FOOTNOTE */}
      <div className="buddy-footer">
        <span>✦</span>
        WealthPath Buddy provides educational insights,
        not personalized financial advice.
      </div>

    </div>
  );
}

export default Doctor;