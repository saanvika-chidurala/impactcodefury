import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState("signin");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleTabSwitch = (mode) => {
    setCurrentMode(mode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLevel) {
      alert("Please select your experience level before proceeding.");
      return;
    }

    // Save selected experience level locally
    localStorage.setItem("wealthpath_category", selectedLevel);

    // Navigate to classification or dashboard page
    navigate("/classification");
  };

  return (
    <div style={styles.body}>
      <style>{customStyles}</style>

      <div className="container">
        {/* Left Half: Brand & Pitch */}
        <div className="hero-section">
          <div className="brand-logo">
            <span>🌱</span> WealthPath
          </div>

          <div className="hero-content">
            <h1 className="hero-title">Master your wealth, step by step.</h1>
            <p className="hero-description">
              Personalized financial planning built around your experience. Monitor
              investments, track milestones, and scale your strategy efficiently.
            </p>
          </div>

          <div className="hero-footer">
            © WealthPath Finance Hub. All rights reserved.
          </div>
        </div>

        {/* Right Half: Sign In / Sign Up Form */}
        <div className="form-section">
          <div className="card">
            {/* Tab Navigation */}
            <div className="auth-tabs">
              <button
                type="button"
                className={`tab-btn ${currentMode === "signin" ? "active" : ""}`}
                onClick={() => handleTabSwitch("signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`tab-btn ${currentMode === "signup" ? "active" : ""}`}
                onClick={() => handleTabSwitch("signup")}
              >
                Sign Up
              </button>
            </div>

            <h1>
              {currentMode === "signin" ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="subtitle">
              {selectedLevel ? (
                <>
                  {currentMode === "signin"
                    ? "Signing in as: "
                    : "Registering as: "}
                  <span className="selected-badge">{selectedLevel}</span>
                </>
              ) : (
                "Select your experience level to customize your workspace."
              )}
            </p>

            <p className="level-label">I am a:</p>
            <div className="level-options">
              {["Student", "Amateur", "Professional"].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`level-btn ${
                    selectedLevel === level ? "selected" : ""
                  }`}
                  onClick={() => handleLevelSelect(level)}
                >
                  {level}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Full Name field (Only shown for Sign Up) */}
              {currentMode === "signup" && (
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                {currentMode === "signin"
                  ? "Continue to Portal →"
                  : "Create Account →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline CSS Styles
const styles = {
  body: {
    backgroundColor: "#EDEBE6",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#403B33",
    margin: 0,
    minHeight: "100vh",
    display: "flex",
  },
};

const customStyles = `
  * { 
    box-sizing: border-box; 
    transition: all 0.2s ease-in-out;
  }

  .container {
    display: flex;
    width: 100vw;
    min-height: 100vh;
  }

  .hero-section {
    flex: 1;
    background-color: #D6E1C7;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    font-weight: 800;
    color: #403B33;
  }

  .brand-logo span {
    background-color: #FFFFFF;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .hero-content {
    max-width: 480px;
  }

  .hero-title {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.15;
    margin: 0 0 20px 0;
    color: #403B33;
    letter-spacing: -1px;
  }

  .hero-description {
    font-size: 18px;
    line-height: 1.6;
    color: #555047;
    margin: 0;
  }

  .hero-footer {
    font-size: 13px;
    color: #666055;
    font-weight: 600;
  }

  .form-section {
    flex: 1;
    background-color: #EDEBE6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
  }

  .card {
    background-color: #FFFFFF;
    padding: 40px 36px;
    border-radius: 20px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 15px 35px -5px rgba(64, 59, 51, 0.08), 0 8px 15px -6px rgba(64, 59, 51, 0.04);
    border: 2px solid #D6E1C7;
  }

  .auth-tabs {
    display: flex;
    border-bottom: 2px solid #EDEBE6;
    margin-bottom: 24px;
  }

  .tab-btn {
    flex: 1;
    padding: 12px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 700;
    color: #999999;
    cursor: pointer;
    text-align: center;
    position: relative;
  }

  .tab-btn.active {
    color: #403B33;
  }

  .tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #D3643B;
    border-radius: 3px 3px 0 0;
  }

  h1 {
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
  }

  p.subtitle {
    margin-top: 0;
    color: #666666;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 24px;
  }

  .level-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #666666;
    margin: 0 0 10px 0;
  }

  .level-options {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }

  .level-btn {
    flex: 1;
    padding: 10px 4px;
    border: 2px solid #D6E1C7;
    background-color: #EDEBE6;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    color: #403B33;
    outline: none;
  }

  .level-btn:hover {
    border-color: #94C7B6;
    background-color: #F4F3F0;
  }

  .level-btn.selected {
    background-color: #94C7B6;
    border-color: #94C7B6;
    color: #403B33;
    box-shadow: 0 4px 12px rgba(148, 199, 182, 0.35);
  }

  .form-group {
    margin-bottom: 16px;
  }

  label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #403B33;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #D6E1C7;
    background-color: #FAF9F6;
    border-radius: 8px;
    font-size: 14px;
    color: #403B33;
    outline: none;
  }

  input::placeholder {
    color: #999999;
  }

  input:focus {
    border-color: #94C7B6;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 4px rgba(148, 199, 182, 0.25);
  }

  button.submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #D3643B;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 8px;
    box-shadow: 0 4px 14px rgba(211, 100, 59, 0.3);
  }

  button.submit-btn:hover {
    background-color: #C0552E;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(211, 100, 59, 0.4);
  }

  button.submit-btn:active {
    transform: translateY(0);
  }

  .selected-badge {
    display: inline-block;
    background-color: #EDEBE6;
    color: #D3643B;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 700;
  }

  @media (max-width: 900px) {
    .container {
      flex-direction: column;
    }
    .hero-section {
      padding: 40px 24px;
      min-height: auto;
    }
    .hero-title {
      font-size: 32px;
    }
    .form-section {
      padding: 30px 20px 50px 20px;
    }
  }
`;