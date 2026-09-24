import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function HypeCheck() {
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [input, setInput] = useState("");
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

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add User Message
    const updatedMessages = [
      ...messages,
      { sender: "user", text: trimmedInput },
    ];
    setMessages(updatedMessages);
    setInput("");

    // Simulate AI Hype Audit Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          isAudit: true,
          content: {
            title: "Hype Audit: High Risk Alert ⚠️",
            points: [
              '1. Short-term "3x guaranteed returns" claims violate SEBI guidelines.',
              "2. Historical volatility for this asset class is above 45%.",
            ],
            recommendation:
              "Consider index funds or verified flexi-cap mutual funds aligned with your moderate risk score.",
          },
        },
      ]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <style>{customStyles}</style>

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div className="brand-logo">
            <span>🌱</span> WealthPath
          </div>
          <div className="nav-links">
            <Link
              to="/dashboard"
              className={`nav-item ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/predictions"
              className={`nav-item ${
                location.pathname === "/predictions" ? "active" : ""
              }`}
            >
              🎯 Predictions
            </Link>
            <Link
              to="/aggregator"
              className={`nav-item ${
                location.pathname === "/aggregator" ? "active" : ""
              }`}
            >
              🔗 Portfolio Aggregator
            </Link>
            <Link
              to="/hype-check"
              className={`nav-item ${
                location.pathname === "/hype-check" ? "active" : ""
              }`}
            >
              🤖 AI Hype Check
            </Link>
          </div>
        </div>
        <Link to="/options" className="nav-item back-btn">
          ← Main Menu
        </Link>
      </aside>

      {/* Main Workspace */}
      <main className="main-content">
        <div className="header">
          <h1>Hype Check & Decision Assistant</h1>
          <p>
            Paste investment claims from Instagram Reels or Finfluencers to audit financial data objectively.
          </p>
        </div>

        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
              >
                {msg.isAudit ? (
                  <div>
                    <strong>{msg.content.title}</strong>
                    <br />
                    {msg.content.points.map((point, i) => (
                      <span key={i}>
                        {point}
                        <br />
                      </span>
                    ))}
                    <strong>Recommendation:</strong> {msg.content.recommendation}
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 'An Instagram Reel said XYZ Stock will 3x in 1 month, should I buy?'"
            />
            <button className="send-btn" onClick={handleSend}>
              Check Hype
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Global Layout CSS Styles
const styles = {
  container: {
    backgroundColor: "#EDEBE6",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#403B33",
    margin: 0,
    display: "flex",
    minHeight: "100vh",
  },
};

const customStyles = `
  * { 
    box-sizing: border-box; 
    transition: all 0.2s ease-in-out; 
  }

  /* Navigation Sidebar */
  .sidebar {
    width: 260px;
    background-color: #FFFFFF;
    border-right: 2px solid #D6E1C7;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 800;
    color: #403B33;
    margin-bottom: 36px;
  }

  .brand-logo span { 
    background-color: #D6E1C7; 
    padding: 6px 10px; 
    border-radius: 8px; 
    font-size: 16px; 
  }

  .nav-links { 
    display: flex; 
    flex-direction: column; 
    gap: 8px; 
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 8px;
    text-decoration: none;
    color: #403B33;
    font-weight: 700;
    font-size: 14px;
    border: 2px solid transparent;
  }

  .nav-item:hover { 
    background-color: #F4F3F0; 
    border-color: #D6E1C7; 
  }

  .nav-item.active { 
    background-color: #94C7B6; 
    color: #403B33; 
    box-shadow: 0 4px 12px rgba(148, 199, 182, 0.35); 
  }

  .nav-item.back-btn { 
    color: #D3643B; 
  }

  /* Main Area */
  .main-content { 
    flex: 1; 
    padding: 40px 48px; 
    display: flex; 
    flex-direction: column; 
    height: 100vh; 
    overflow-y: hidden; 
  }

  .header h1 { 
    font-size: 32px; 
    font-weight: 800; 
    margin: 0 0 6px 0; 
    letter-spacing: -0.5px; 
  }

  .header p { 
    color: #666; 
    font-size: 14px; 
    margin: 0 0 24px 0; 
  }

  .chat-box {
    flex: 1;
    background: #FFFFFF;
    border: 2px solid #D6E1C7;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 25px -5px rgba(64, 59, 51, 0.04);
    margin-bottom: 20px;
    overflow: hidden;
  }

  .messages { 
    overflow-y: auto; 
    display: flex; 
    flex-direction: column; 
    gap: 16px; 
    flex: 1; 
    padding-right: 8px; 
  }

  .message { 
    padding: 14px 18px; 
    border-radius: 12px; 
    max-width: 80%; 
    font-size: 14px; 
    line-height: 1.5; 
  }

  .message.bot { 
    background-color: #EDEBE6; 
    align-self: flex-start; 
    border-left: 4px solid #94C7B6; 
  }

  .message.user { 
    background-color: #D3643B; 
    color: #FFFFFF; 
    align-self: flex-end; 
  }

  .chat-input { 
    display: flex; 
    gap: 12px; 
    margin-top: 20px; 
  }

  .chat-input input {
    flex: 1;
    padding: 14px;
    border: 2px solid #D6E1C7;
    border-radius: 8px;
    background-color: #FAF9F6;
    outline: none;
    font-size: 14px;
  }

  .send-btn {
    background-color: #D3643B;
    color: #FFFFFF;
    border: none;
    padding: 0 24px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
  }

  .send-btn:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
      height: auto;
    }
    .main-content {
      height: auto;
      padding: 24px 16px;
    }
  }
`;