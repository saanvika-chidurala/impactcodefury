function runMonteCarlo(
  currentSavings,
  monthlySIP,
  months,
  targetAmount,
  historicalReturns,
  simulations = 5000
) {
  let successfulSimulations = 0

  const finalValues = []

  for (let simulation = 0; simulation < simulations; simulation++) {

    let portfolioValue = currentSavings

    for (let month = 0; month < months; month++) {

      const randomIndex = Math.floor(
        Math.random() * historicalReturns.length
      )

      const monthlyReturn = historicalReturns[randomIndex]

      portfolioValue =
        portfolioValue * (1 + monthlyReturn)

      portfolioValue += monthlySIP
    }

    finalValues.push(portfolioValue)

    if (portfolioValue >= targetAmount) {
      successfulSimulations++
    }
  }

  const probability =
    (successfulSimulations / simulations) * 100

  return {
    probability,
    finalValues
  }
}

export default runMonteCarlo