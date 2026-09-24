import { Link } from "react-router-dom";

export default function Classification() {
  const classificationModules = [
    {
      title: "Asset Class Categorization",
      description:
        "Classify holdings across Equities, Debt, Hybrid, Gold, and Real Estate to monitor asset allocation balance.",
      icon: "🏷️",
      path: "/classify/assets",
      action: "Classify Assets",
    },
    {
      title: "Risk & Volatility Profiling",
      description:
        "Segment investments by risk levels—High, Moderate, or Low Risk—based on market beta and volatility metrics.",
      icon: "⚖️",
      path: "/classify/risk",
      action: "Profile Risk",
    },
    {
      title: "Tax & Lock-in Buckets",
      description:
        "Categorize assets by tax implications (LTCG, STCG) and liquidity availability (ELSS lock-ins, FDs, Liquid funds).",
      icon: "📂",
      path: "/classify/tax",
      action: "Manage Buckets",
    },
    {
      title: "Sector & Market Cap Breakdown",
      description:
        "Tag holdings into Large, Mid, Small Cap, and specific sectors (Tech, Pharma, Banking) to spot concentration risks.",
      icon: "📊",
      path: "/classify/sectors",
      action: "View Sector Breakdown",
    },
  ];

  return (
    <div style={styles.body}>
      <style>{customStyles}</style>

      <div className="header">
        <div className="brand-logo">
          <span>🌱</span> WealthPath
        </div>
        <h1>Portfolio Classification Center</h1>
        <p>
          Organize, tag, and structure your investments to optimize asset allocation and risk management. Select a classification module below.
        </p>
      </div>

      <div className="options-grid">
        {classificationModules.map((item) => (
          <Link key={item.title} to={item.path} className="option-card">
            <div>
              <div className="icon-wrapper">{item.icon}</div>
              <h2 className="card-title">{item.title}</h2>
              <p className="card-desc">{item.description}</p>
            </div>
            <div className="card-action">{item.action}</div>
          </Link>
        ))}
      </div>

      <Link to="/options" className="footer-btn">
        ← Back to Main Navigation
      </Link>
    </div>
  );
}

// Layout Container Styles
const styles = {
  body: {
    backgroundColor: "#EDEBE6",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#403B33",
    margin: 0,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 24px",
  },
};

// CSS Stylesheet
const customStyles = `
  * { 
    box-sizing: border-box; 
    transition: all 0.2s ease-in-out; 
  }

  .header {
    text-align: center;
    max-width: 640px;
    margin-bottom: 40px;
  }

  .brand-logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 800;
    color: #403B33;
    margin-bottom: 12px;
  }

  .brand-logo span { 
    background-color: #D6E1C7; 
    padding: 6px 12px; 
    border-radius: 10px; 
    font-size: 20px; 
  }

  .header h1 { 
    font-size: 32px; 
    font-weight: 800; 
    margin: 8px 0; 
    letter-spacing: -0.5px; 
  }

  .header p { 
    color: #666; 
    font-size: 15px; 
    line-height: 1.5; 
    margin: 0; 
  }

  .options-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(280px, 340px));
    gap: 24px;
    width: 100%;
    max-width: 720px;
  }

  .option-card {
    background: #FFFFFF;
    border: 2px solid #D6E1C7;
    border-radius: 18px;
    padding: 28px 24px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 25px -5px rgba(64, 59, 51, 0.04);
    position: relative;
    overflow: hidden;
  }

  .option-card:hover {
    transform: translateY(-4px);
    border-color: #94C7B6;
    box-shadow: 0 16px 32px -6px rgba(64, 59, 51, 0.1);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    background-color: #EDEBE6;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 20px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 800;
    margin: 0 0 8px 0;
    color: #403B33;
  }

  .card-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    margin: 0 0 20px 0;
  }

  .card-action {
    font-size: 13px;
    font-weight: 700;
    color: #D3643B;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .card-action::after {
    content: '→';
    transition: transform 0.2s ease;
  }

  .option-card:hover .card-action::after {
    transform: translateX(4px);
  }

  .footer-btn {
    margin-top: 36px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 700;
    color: #666;
    padding: 8px 16px;
    border-radius: 8px;
  }

  .footer-btn:hover { 
    background-color: rgba(64, 59, 51, 0.05); 
    color: #403B33; 
  }

  @media (max-width: 680px) {
    .options-grid { 
      grid-template-columns: 1fr; 
    }
  }
`;