const express = require("express");
const router = express.Router();

// POST /api/portfolio/analyze
// body: { holdings: [{ name, category, value }] }
// category examples: "stocks", "bonds", "cash", "crypto", "real_estate", "other"
router.post("/analyze", (req, res) => {
  try {
    const { holdings } = req.body;

    if (!Array.isArray(holdings) || holdings.length === 0) {
      return res.status(400).json({ error: "holdings must be a non-empty array of { name, category, value }." });
    }

    const cleaned = holdings
      .filter((h) => h && typeof h.value === "number" && h.value > 0)
      .map((h) => ({
        name: h.name || "Unnamed holding",
        category: (h.category || "other").toLowerCase(),
        value: h.value,
      }));

    const totalValue = cleaned.reduce((sum, h) => sum + h.value, 0);

    if (totalValue <= 0) {
      return res.status(400).json({ error: "Total portfolio value must be greater than zero." });
    }

    // Per-holding allocation
    const byHolding = cleaned
      .map((h) => ({ ...h, percentOfPortfolio: round2((h.value / totalValue) * 100) }))
      .sort((a, b) => b.percentOfPortfolio - a.percentOfPortfolio);

    // Per-category allocation
    const categoryTotals = {};
    for (const h of cleaned) {
      categoryTotals[h.category] = (categoryTotals[h.category] || 0) + h.value;
    }
    const byCategory = Object.entries(categoryTotals)
      .map(([category, value]) => ({ category, value, percentOfPortfolio: round2((value / totalValue) * 100) }))
      .sort((a, b) => b.percentOfPortfolio - a.percentOfPortfolio);

    // Herfindahl-Hirschman Index (concentration), scaled 0-1 per holding weight.
    const hhi = byHolding.reduce((sum, h) => sum + Math.pow(h.percentOfPortfolio / 100, 2), 0);
    // 1/N would be the HHI of a perfectly equal-weighted portfolio of N holdings.
    const concentrationLevel = hhi > 0.25 ? "high" : hhi > 0.15 ? "moderate" : "low";

    const warnings = [];
    const topHolding = byHolding[0];
    if (topHolding && topHolding.percentOfPortfolio > 25) {
      warnings.push(
        `${topHolding.name} makes up ${topHolding.percentOfPortfolio}% of the portfolio — a single-holding concentration this high means its performance will heavily drive your overall results.`
      );
    }
    const topCategory = byCategory[0];
    if (topCategory && topCategory.percentOfPortfolio > 70) {
      warnings.push(
        `${topCategory.category} makes up ${topCategory.percentOfPortfolio}% of the portfolio, leaving limited diversification across other asset classes.`
      );
    }
    if (cleaned.length < 5) {
      warnings.push("The portfolio has very few holdings, which generally increases concentration risk.");
    }

    res.json({
      totalValue,
      byHolding,
      byCategory,
      concentration: { hhi: round2(hhi), level: concentrationLevel },
      warnings,
    });
  } catch (err) {
    console.error("Portfolio route error:", err);
    res.status(500).json({ error: "Could not analyze portfolio.", details: err.message });
  }
});

function round2(n) {
  return Math.round(n * 100) / 100;
}

module.exports = router;
