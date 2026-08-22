function Portfolio() {
  return (
    <div className="portfolio-page">

      {/* HEADER */}

      <div className="portfolio-header">

        <div>
          <p className="eyebrow">
            PORTFOLIO X-RAY
          </p>

          <h1>
            See what's really inside your portfolio.
          </h1>

          <p>
            WealthPath looks beyond the names of your investments
            to understand your actual exposure.
          </p>
        </div>

        <div className="last-updated">
          Last updated
          <strong>Today, 10:42 PM</strong>
        </div>

      </div>


      {/* TOP METRICS */}

      <div className="portfolio-metrics">

        <div className="portfolio-metric">

          <span>Total Portfolio</span>

          <strong>
            ₹12,48,320
          </strong>

          <small className="positive">
            ↑ 8.42% this year
          </small>

        </div>


        <div className="portfolio-metric">

          <span>Portfolio Risk</span>

          <strong>
            7.4<span>/10</span>
          </strong>

          <small>
            Moderately aggressive
          </small>

        </div>


        <div className="portfolio-metric">

          <span>True XIRR</span>

          <strong>
            12.8%
          </strong>

          <small className="positive">
            +2.1% vs benchmark
          </small>

        </div>


        <div className="portfolio-metric">

          <span>Investments</span>

          <strong>
            14
          </strong>

          <small>
            Across 4 sources
          </small>

        </div>

      </div>


      {/* ASSET ALLOCATION */}

      <section className="xray-card">

        <div className="section-heading">

          <div>

            <p className="eyebrow">
              ASSET ALLOCATION
            </p>

            <h2>
              Where your money actually sits
            </h2>

          </div>

          <span>
            ₹12.48L total
          </span>

        </div>


        <div className="allocation-visual">

          <div className="allocation-donut">

            <div className="donut-inner">

              <strong>
                68%
              </strong>

              <span>
                Equity
              </span>

            </div>

          </div>


          <div className="allocation-list">

            <div className="allocation-item">

              <span className="allocation-dot equity"></span>

              <div>
                <strong>Equity</strong>
                <small>₹8.49L</small>
              </div>

              <b>68%</b>

            </div>


            <div className="allocation-item">

              <span className="allocation-dot debt"></span>

              <div>
                <strong>Debt</strong>
                <small>₹2.99L</small>
              </div>

              <b>24%</b>

            </div>


            <div className="allocation-item">

              <span className="allocation-dot gold"></span>

              <div>
                <strong>Gold</strong>
                <small>₹99K</small>
              </div>

              <b>8%</b>

            </div>

          </div>

        </div>

      </section>


      {/* OVERLAP WARNING */}

      <section className="overlap-card">

        <div className="overlap-top">

          <div>

            <p className="eyebrow">
              ⚠ CONCENTRATION ALERT
            </p>

            <h2>
              You're diversified by fund,
              not by underlying stocks.
            </h2>

            <p>
              We found significant overlap between several
              large-cap funds in your portfolio.
            </p>

          </div>

          <div className="overlap-score">

            <strong>
              87%
            </strong>

            <span>
              overlap
            </span>

          </div>

        </div>


        {/* FUND COMPARISON */}

        <div className="fund-comparison">

          <div className="fund-row">

            <div className="fund-name">

              <strong>
                Parag Parikh Flexi Cap
              </strong>

              <span>
                ₹1.85L invested
              </span>

            </div>

            <div className="overlap-bar">

              <div style={{ width: "87%" }}></div>

            </div>

            <strong>
              87%
            </strong>

          </div>


          <div className="fund-row">

            <div className="fund-name">

              <strong>
                HDFC Flexi Cap
              </strong>

              <span>
                ₹1.42L invested
              </span>

            </div>

            <div className="overlap-bar">

              <div style={{ width: "74%" }}></div>

            </div>

            <strong>
              74%
            </strong>

          </div>


          <div className="fund-row">

            <div className="fund-name">

              <strong>
                SBI Large & Midcap
              </strong>

              <span>
                ₹98K invested
              </span>

            </div>

            <div className="overlap-bar">

              <div style={{ width: "63%" }}></div>

            </div>

            <strong>
              63%
            </strong>

          </div>

        </div>


        <div className="overlap-explanation">

          <strong>
            What this means
          </strong>

          <p>
            Holding multiple funds doesn't automatically mean
            diversification. These funds have substantial exposure
            to the same underlying companies.
          </p>

        </div>

      </section>


      {/* SOURCES */}

      <section className="xray-card">

        <div className="section-heading">

          <div>

            <p className="eyebrow">
              CONSOLIDATED SOURCES
            </p>

            <h2>
              Where your investments live
            </h2>

          </div>

          <span>
            4 connected sources
          </span>

        </div>


        <div className="source-grid">

          <div className="source-item">

            <div className="source-icon">
              G
            </div>

            <div>

              <strong>
                Groww
              </strong>

              <span>
                Mutual Funds · Stocks
              </span>

            </div>

            <b>
              ₹4.82L
            </b>

          </div>


          <div className="source-item">

            <div className="source-icon">
              Z
            </div>

            <div>

              <strong>
                Zerodha
              </strong>

              <span>
                Stocks
              </span>

            </div>

            <b>
              ₹3.10L
            </b>

          </div>


          <div className="source-item">

            <div className="source-icon">
              N
            </div>

            <div>

              <strong>
                NPS
              </strong>

              <span>
                Retirement
              </span>

            </div>

            <b>
              ₹1.80L
            </b>

          </div>


          <div className="source-item">

            <div className="source-icon">
              E
            </div>

            <div>

              <strong>
                EPFO
              </strong>

              <span>
                Provident Fund
              </span>

            </div>

            <b>
              ₹1.38L
            </b>

          </div>

        </div>

      </section>


      {/* INSIGHT */}

      <section className="portfolio-insight">

        <div className="insight-symbol">
          ✦
        </div>

        <div>

          <p className="eyebrow">
            WealthPath INSIGHT
          </p>

          <h3>
            Your biggest risk isn't volatility.
            It's concentration.
          </h3>

          <p>
            Your portfolio contains 14 investments, but several
            funds hold similar large-cap companies. Adding another
            large-cap fund may increase complexity without adding
            meaningful diversification.
          </p>

        </div>

      </section>

    </div>
  )
}

export default Portfolio