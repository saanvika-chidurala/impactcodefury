const express = require("express");
const router = express.Router();

// POST /api/goals/calculate
// body: { targetAmount, currentSavings, yearsToGoal, expectedAnnualReturnPct }
// Returns the required monthly contribution to hit the goal, plus a projection.
router.post("/calculate", (req, res) => {
  try {
    const { targetAmount, currentSavings = 0, yearsToGoal, expectedAnnualReturnPct } = req.body;

    if (
      typeof targetAmount !== "number" ||
      typeof yearsToGoal !== "number" ||
      typeof expectedAnnualReturnPct !== "number" ||
      targetAmount <= 0 ||
      yearsToGoal <= 0
    ) {
      return res.status(400).json({
        error: "targetAmount, yearsToGoal, and expectedAnnualReturnPct must be positive numbers.",
      });
    }

    const months = Math.round(yearsToGoal * 12);
    const monthlyRate = expectedAnnualReturnPct / 100 / 12;

    const futureValueOfCurrentSavings =
      monthlyRate === 0
        ? currentSavings
        : currentSavings * Math.pow(1 + monthlyRate, months);

    let requiredMonthlyContribution;
    if (monthlyRate === 0) {
      requiredMonthlyContribution = (targetAmount - futureValueOfCurrentSavings) / months;
    } else {
      const growthFactor = Math.pow(1 + monthlyRate, months);
      requiredMonthlyContribution =
        ((targetAmount - futureValueOfCurrentSavings) * monthlyRate) / (growthFactor - 1);
    }

    requiredMonthlyContribution = Math.max(0, requiredMonthlyContribution);

    // Build a simple year-by-year projection for charting on the frontend.
    const projection = [];
    let balance = currentSavings;
    for (let year = 1; year <= Math.ceil(yearsToGoal); year++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + requiredMonthlyContribution;
      }
      projection.push({ year, projectedBalance: Math.round(balance) });
    }

    res.json({
      requiredMonthlyContribution: Math.round(requiredMonthlyContribution * 100) / 100,
      months,
      projection,
      assumptions: {
        currentSavings,
        yearsToGoal,
        expectedAnnualReturnPct,
        note: "This is a simplified projection assuming a constant monthly contribution and constant annual return — actual markets fluctuate.",
      },
    });
  } catch (err) {
    console.error("Goals route error:", err);
    res.status(500).json({ error: "Could not calculate goal projection.", details: err.message });
  }
});

module.exports = router;
