function Dashboard() {
  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <p className="eyebrow">
            FINANCIAL OVERVIEW
          </p>

          <h1>
            Good evening, Mihad 👋
          </h1>

          <p>
            Here's how your money is doing across everything you own.
          </p>
        </div>

        <div className="sync-status">
          <span className="status-dot"></span>
          Data synced just now
        </div>

      </div>


      {/* TOTAL WEALTH */}

      <section className="wealth-card">

        <div>

          <p>
            TOTAL PORTFOLIO
          </p>

          <h2>
            ₹12,48,320
          </h2>

          <span className="positive">
            ↑ 8.42%
          </span>

          <span className="wealth-caption">
            ₹97,420 growth this year
          </span>

        </div>


        <div className="wealth-mini-chart">

          <div className="chart-bar b1"></div>
          <div className="chart-bar b2"></div>
          <div className="chart-bar b3"></div>
          <div className="chart-bar b4"></div>
          <div className="chart-bar b5"></div>
          <div className="chart-bar b6"></div>
          <div className="chart-bar b7"></div>
          <div className="chart-bar b8"></div>

        </div>

      </section>


      {/* ASSET CARDS */}

      <div className="asset-grid">

        <div className="asset-card">

          <span>Mutual Funds</span>

          <strong>
            ₹5.20L
          </strong>

          <small>
            41.7% of portfolio
          </small>

        </div>


        <div className="asset-card">

          <span>Stocks</span>

          <strong>
            ₹3.10L
          </strong>

          <small>
            24.8% of portfolio
          </small>

        </div>


        <div className="asset-card">

          <span>NPS</span>

          <strong>
            ₹1.80L
          </strong>

          <small>
            14.4% of portfolio
          </small>

        </div>


        <div className="asset-card">

          <span>EPF</span>

          <strong>
            ₹1.38L
          </strong>

          <small>
            11.1% of portfolio
          </small>

        </div>

      </div>


      {/* MAIN GRID */}

      <div className="dashboard-grid">


        {/* PORTFOLIO HEALTH */}

        <section className="dashboard-card">

          <div className="card-heading">

            <div>

              <p className="eyebrow">
                PORTFOLIO X-RAY
              </p>

              <h2>
                Portfolio Health
              </h2>

            </div>

            <span className="health-score">
              7.4
              <small>/10</small>
            </span>

          </div>


          <div className="allocation">

            <div className="allocation-row">

              <span>Equity</span>

              <strong>68%</strong>

              <div className="allocation-bar">
                <div style={{ width: '68%' }}></div>
              </div>

            </div>


            <div className="allocation-row">

              <span>Debt</span>

              <strong>24%</strong>

              <div className="allocation-bar">
                <div style={{ width: '24%' }}></div>
              </div>

            </div>


            <div className="allocation-row">

              <span>Gold</span>

              <strong>8%</strong>

              <div className="allocation-bar">
                <div style={{ width: '8%' }}></div>
              </div>

            </div>

          </div>

        </section>


        {/* GOALS */}

        <section className="dashboard-card">

          <div className="card-heading">

            <div>

              <p className="eyebrow">
                GOAL TRACKER
              </p>

              <h2>
                Your Goals
              </h2>

            </div>

            <a href="/goals">
              View all →
            </a>

          </div>


          <div className="goal-row">

            <div className="goal-icon">
              🏠
            </div>

            <div className="goal-info">

              <strong>
                House
              </strong>

              <span>
                ₹30L target · 6 years
              </span>

            </div>

            <strong className="goal-percent">
              68%
            </strong>

          </div>


          <div className="goal-progress">

            <div style={{ width: '68%' }}></div>

          </div>


          <div className="goal-row">

            <div className="goal-icon">
              🎓
            </div>

            <div className="goal-info">

              <strong>
                Education
              </strong>

              <span>
                ₹20L target · 8 years
              </span>

            </div>

            <strong className="goal-percent">
              84%
            </strong>

          </div>


          <div className="goal-progress">

            <div style={{ width: '84%' }}></div>

          </div>

        </section>


      </div>


      {/* X-RAY WARNING */}

      <section className="insight-card">

        <div className="insight-icon">
          ⚠
        </div>

        <div>

          <p className="eyebrow">
            PORTFOLIO X-RAY
          </p>

          <h3>
            Your diversification may be misleading.
          </h3>

          <p>
            We detected <strong>87% underlying overlap</strong>
            across 4 large-cap funds. You may own different
            funds but many of the same companies underneath.
          </p>

        </div>

        <button>
          Investigate →
        </button>

      </section>


      {/* WealthPath INSIGHT */}

      <section className="doctor-insight">

        <div className="doctor-icon">
          ✦
        </div>

        <div>

          <p className="eyebrow">
            WealthPAth INSIGHT
          </p>

          <h3>
            Your portfolio is more concentrated than it appears.
          </h3>

          <p>
            Multiple funds are giving you exposure to similar
            large-cap companies. Consider checking the underlying
            holdings before adding another fund.
          </p>

        </div>

      </section>

    </div>
  )
}

export default Dashboard