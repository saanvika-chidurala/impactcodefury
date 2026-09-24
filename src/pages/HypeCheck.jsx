import { useState } from "react"

function HypeCheck() {

  const [content, setContent] = useState("")
  const [result, setResult] = useState(null)

  function analyzeHype() {

    if (!content.trim()) {
      return
    }

    setResult({
      stock: "XYZ Industries",
      ticker: "XYZ",
      return3m: "+312%",
      pe: "42.1x",
      sectorPE: "10.0x",
      valuationPercentile: "96th",
      similarCases: 18,
      medianReturn: "-7.4%"
    })
  }

  return (
    <div className="hype-page">

      <div className="hype-header">

        <p className="eyebrow">
          HYPE CHECK
        </p>

        <h1>
          Before you believe the hype,
          check the data.
        </h1>

        <p>
          Paste a stock tip, social-media claim or message.
          WealthPath turns the hype into historical context.
        </p>

      </div>


      <section className="hype-input-card">

        <h2>
          What did you see?
        </h2>

        <p>
          Paste the message, post or stock claim below.
        </p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Example: XYZ is going to 10x 🚀 Buy before everyone else finds out!"
        />

        <div className="input-footer">

          <span>
            Data-only analysis. No buy/sell calls.
          </span>

          <button onClick={analyzeHype}>
            Analyze Claim →
          </button>

        </div>

      </section>


      {!result ? (

        <section className="hype-empty">

          <div className="hype-empty-icon">
            ◌
          </div>

          <h2>
            Your analysis will appear here
          </h2>

          <p>
            We'll compare the claim against valuation,
            performance and historical patterns.
          </p>

        </section>

      ) : (

        <section className="hype-result">

          <div className="stock-header">

            <div>

              <p className="eyebrow">
                DETECTED SECURITY
              </p>

              <h2>
                {result.stock}
              </h2>

              <span>
                NSE · {result.ticker}
              </span>

            </div>

            <div className="stock-return">

              <small>
                3-MONTH RETURN
              </small>

              <strong>
                {result.return3m}
              </strong>

            </div>

          </div>


          <div className="hype-metrics">

            <div>
              <span>P/E Ratio</span>

              <strong>
                {result.pe}
              </strong>

              <small>
                Sector: {result.sectorPE}
              </small>
            </div>


            <div>
              <span>Valuation percentile</span>

              <strong>
                {result.valuationPercentile}
              </strong>

              <small>
                vs own 5-year history
              </small>
            </div>


            <div>
              <span>Similar historical cases</span>

              <strong>
                {result.similarCases}
              </strong>

              <small>
                identified patterns
              </small>
            </div>

          </div>


          <div className="valuation-warning">

            <div className="warning-icon">
              ⚠
            </div>

            <div>

              <strong>
                Valuation is unusually elevated
              </strong>

              <p>
                The current P/E is significantly above
                the sector average.
              </p>

            </div>

          </div>


          <div className="historical-card">

            <div>

              <p className="eyebrow">
                HISTORICAL ANALOGUE
              </p>

              <h3>
                What happened after similar run-ups?
              </h3>

              <p>
                We found {result.similarCases} historical
                periods with comparable rapid price increases.
              </p>

            </div>

            <div className="historical-number">

              <strong>
                {result.medianReturn}
              </strong>

              <span>
                median 12-month return
              </span>

            </div>

          </div>


          <div className="hype-conclusion">

            <div className="conclusion-icon">
              ◇
            </div>

            <div>

              <p className="eyebrow">
                DATA-ONLY CONTEXT
              </p>

              <h3>
                Context, not a recommendation.
              </h3>

              <p>
                WealthPath shows historical patterns and
                valuation data so you can make your own decision.
              </p>

            </div>

          </div>

        </section>

      )}

    </div>
  )
}

export default HypeCheck