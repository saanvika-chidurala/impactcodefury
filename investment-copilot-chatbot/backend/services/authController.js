const { supabaseAdmin } = require("./supabaseClient");

const VALID_CATEGORIES = ["Student", "Amateur", "Professional"];

const CATEGORY_CONFIG = {
  Student: {
    label: "Student",
    dashboardWidgets: [
      "budget-tracker",
      "savings-goals",
      "basic-education",
    ],
    maxPortfolios: 1,
    aggregatorAccess: "basic",
    predictionAccess: false,
  },

  Amateur: {
    label: "Amateur",
    dashboardWidgets: [
      "budget-tracker",
      "savings-goals",
      "investment-tracker",
      "market-news",
    ],
    maxPortfolios: 3,
    aggregatorAccess: "standard",
    predictionAccess: true,
  },

  Professional: {
    label: "Professional",
    dashboardWidgets: [
      "portfolio-analytics",
      "risk-modeling",
      "market-news",
      "advanced-charts",
    ],
    maxPortfolios: 10,
    aggregatorAccess: "full",
    predictionAccess: true,
  },
};

function isValidCategory(category) {
  return VALID_CATEGORIES.includes(category);
}

// POST /api/auth/signup
async function signUp(req, res) {
  try {
    const { email, password, fullName, category } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    if (!category || !isValidCategory(category)) {
      return res.status(400).json({
        error: `A valid category is required. Must be one of: ${VALID_CATEGORIES.join(
          ", "
        )}`,
      });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName || null,
          category,
        },
      });

    if (authError) {
      return res.status(400).json({
        error: authError.message,
      });
    }

    const userId = authData.user.id;

    // Store additional information in profiles
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: userId,
        full_name: fullName || null,
        email,
        category,
      });

    if (profileError) {
      // Remove Auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(userId);

      return res.status(500).json({
        error: "Failed to create profile: " + profileError.message,
      });
    }

    return res.status(201).json({
      message: "Account created successfully.",

      user: {
        id: userId,
        email,
        fullName: fullName || null,
        category,
      },

      categoryConfig: CATEGORY_CONFIG[category],
    });
  } catch (error) {
    console.error("signUp error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
}

// POST /api/auth/signin
async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const { data, error } =
      await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      return res.status(401).json({
        error: error.message,
      });
    }

    // Load profile
    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (profileError) {
      return res.status(500).json({
        error:
          "Signed in, but failed to load profile: " +
          profileError.message,
      });
    }

    return res.status(200).json({
      message: "Signed in successfully.",

      session: data.session,

      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: profile.full_name,
        category: profile.category,
      },

      categoryConfig: CATEGORY_CONFIG[profile.category],
    });
  } catch (error) {
    console.error("signIn error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
}

module.exports = {
  signUp,
  signIn,
};