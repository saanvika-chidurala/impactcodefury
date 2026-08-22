import { useState } from 'react'

import historicalReturns from '../data/historicalReturns'
import runMonteCarlo from '../calculations/monteCarlo'

function Goals() {

  const [goal, setGoal] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlySIP, setMonthlySIP] = useState('')
  const [years, setYears] = useState('')

  const [result, setResult] = useState(null)
  const [recommendedSIP, setRecommendedSIP] = useState(null)


  function calculateGoal() {

  const target = Number(targetAmount)
  const current = Number(currentSavings)
  const sip = Number(monthlySIP)
  const months = Number(years) * 12

  if (!target || !months) {
    return
  }


  // Demo annual return assumption
  const annualReturn = 0.10
  const monthlyReturn = annualReturn / 12


  // --------------------------------
  // CURRENT SIP PROJECTION
  // --------------------------------

  let futureValue = current

  for (let month = 0; month < months; month++) {

    futureValue =
      futureValue * (1 + monthlyReturn)

    futureValue =
      futureValue + sip

  }


  // --------------------------------
  // REVERSE SIP CALCULATION
  // --------------------------------

  let testSIP = 0

  let testValue = current

  while (testValue < target && testSIP < 1000000) {

    testSIP += 100

    testValue = current

    for (
      let month = 0;
      month < months;
      month++
    ) {

      testValue =
        testValue * (1 + monthlyReturn)

      testValue =
        testValue + testSIP

    }

  }


  // --------------------------------
  // MONTE CARLO
  // --------------------------------

  const simulation = runMonteCarlo(
    current,
    sip,
    months,
    target,
    historicalReturns,
    5000
  )


  setRecommendedSIP(testSIP)


  setResult({

    futureValue,

    probability:
      simulation.probability

  })

}


  return (

    <div className="goal-page">

      {/* HEADER */}

      <div className="goal-header">

        <p className="eyebrow">
          GOAL INTELLIGENCE
        </p>

        <h1>
          What are you investing for?
        </h1>

        <p>
          Tell WealthPath where you want to go.
          We'll work backwards to see if you're on track.
        </p>

      </div>


      <div className="goal-layout">


        {/* INPUT CARD */}

        <section className="goal-form">

          <h2>
            Create your goal
          </h2>


          <label>
            What are you planning for?
          </label>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >

            <option value="">
              Select a goal
            </option>

            <option value="House">
              🏠 House
            </option>

            <option value="Education">
              🎓 Education
            </option>

            <option value="Retirement">
              🌴 Retirement
            </option>

            <option value="Car">
              🚗 Car
            </option>

          </select>


          <label>
            Target amount (₹)
          </label>

          <input
            type="number"
            placeholder="30,00,000"
            value={targetAmount}
            onChange={(e) =>
              setTargetAmount(e.target.value)
            }
          />


          <label>
            Current savings (₹)
          </label>

          <input
            type="number"
            placeholder="4,00,000"
            value={currentSavings}
            onChange={(e) =>
              setCurrentSavings(e.target.value)
            }
          />


          <label>
            Monthly SIP (₹)
          </label>

          <input
            type="number"
            placeholder="25,000"
            value={monthlySIP}
            onChange={(e) =>
              setMonthlySIP(e.target.value)
            }
          />


          <label>
            Time horizon (years)
          </label>

          <input
            type="number"
            placeholder="6"
            value={years}
            onChange={(e) =>
              setYears(e.target.value)
            }
          />


          <button
            onClick={calculateGoal}
            className="calculate-button"
          >

            Calculate My Plan →

          </button>

        </section>


        {/* RESULT */}

        <section className="goal-result">

          {!result ? (

            <div className="empty-result">

              <div className="empty-icon">
                ◎
              </div>

              <h2>
                Your plan will appear here
              </h2>

              <p>
                Enter your goal details and we'll
                simulate thousands of possible futures.
              </p>

            </div>

          ) : (

            <>

              <div className="result-heading">

                <p className="eyebrow">
                  PROJECTION
                </p>

                <h2>
                  Your {goal} plan
                </h2>

              </div>


              {/* MAIN PROBABILITY */}

              <div className="probability-card">

                <div>

                  <p>
                    Probability of reaching your goal
                  </p>

                  <strong>
                    {result.probability}%
                  </strong>

                </div>

                <div className="probability-circle">

                  {result.probability}%

                </div>

              </div>


              {/* METRICS */}

              <div className="goal-metrics">

                <div>

                  <span>
                    Projected value
                  </span>

                  <strong>
                    ₹
                    {Math.round(
                      result.futureValue
                    ).toLocaleString('en-IN')}
                  </strong>

                </div>


                <div>

                  <span>
                    Target
                  </span>

                  <strong>
                    ₹
                    {Number(
                      targetAmount
                    ).toLocaleString('en-IN')}
                  </strong>

                </div>

              </div>
              <div className="sip-recommendation">

  <div>

    <p className="eyebrow">
      REVERSE-ENGINEERED PLAN
    </p>

    <h3>
      Recommended monthly SIP
    </h3>

    <strong>
      ₹
      {recommendedSIP?.toLocaleString('en-IN')}
    </strong>

  </div>


  <div className="sip-gap">

    <span>
      Your current SIP
    </span>

    <strong>
      ₹
      {Number(monthlySIP).toLocaleString('en-IN')}
    </strong>

    <small>
      {recommendedSIP > Number(monthlySIP)
        ? `₹${(
            recommendedSIP -
            Number(monthlySIP)
          ).toLocaleString('en-IN')} more needed`
        : "You're already above the recommended SIP"
      }
    </small>

  </div>

</div>


              {/* STATUS */}

              {result.futureValue >= Number(targetAmount) ? (

                <div className="goal-success">

                  <strong>
                    ✓ You're currently on track
                  </strong>

                  <p>
                    Your projected portfolio value
                    is above your target.
                  </p>

                </div>

              ) : (

                <div className="goal-warning">

                  <strong>
                    ⚠ Your current plan may fall short
                  </strong>

                  <p>
                    Consider increasing your SIP
                    or extending your timeline.
                  </p>

                </div>

              )}
{/* GOAL DRIFT */}

<div className="goal-drift">

  <div className="drift-header">
    <div>
      <p className="eyebrow">GOAL DRIFT</p>

      <h3>
        Are you on schedule?
      </h3>
    </div>

    {result.futureValue >= Number(targetAmount) ? (
      <span className="drift-good">
        ON TRACK
      </span>
    ) : (
      <span className="drift-bad">
        NEEDS ATTENTION
      </span>
    )}
  </div>


  <div className="goal-timeline">

    <div className="timeline-line">
      <div className="timeline-progress"></div>
    </div>

    <div className="timeline-point start">
      <strong>Today</strong>
      <span>₹{Number(currentSavings).toLocaleString('en-IN')}</span>
    </div>

    <div className="timeline-point target">
      <strong>Goal</strong>
      <span>₹{Number(targetAmount).toLocaleString('en-IN')}</span>
    </div>

  </div>


  {result.futureValue < Number(targetAmount) ? (

    <div className="drift-message">

      <strong>
        ⚠ Your current pace may fall short
      </strong>

      <p>
        Your projected value is approximately ₹
        {Math.round(
          Number(targetAmount) - result.futureValue
        ).toLocaleString('en-IN')}
        {' '}below your target.
      </p>

    </div>

  ) : (

    <div className="drift-message drift-success">

      <strong>
        ✓ You're currently on track
      </strong>

      <p>
        Your projected value is above your target.
      </p>

    </div>

  )}


  {/* ACTIONS */}

  <div className="drift-actions">

    <div className="action-card">

      <span className="action-icon">
        ↑
      </span>

      <div>

        <strong>
          Increase SIP
        </strong>

        <p>
          Add ₹
          {Math.max(
            0,
            recommendedSIP - Number(monthlySIP)
          ).toLocaleString('en-IN')}
          {' '}per month
        </p>

      </div>

    </div>


    <div className="action-card">

      <span className="action-icon">
        →
      </span>

      <div>

        <strong>
          Extend timeline
        </strong>

        <p>
          Give your investments more time
          to compound.
        </p>

      </div>

    </div>

  </div>

</div>

              {/* EXPLANATION */}

              <div className="simulation-note">

                <strong>
                  How did we calculate this?
                </strong>

                <p>
                  WealthPath runs 5,000 simulated
                  market paths using historical monthly
                  return patterns instead of assuming
                  one fixed CAGR.
                </p>

              </div>

            </>

          )}

        </section>

      </div>

    </div>

  )

}

export default Goals