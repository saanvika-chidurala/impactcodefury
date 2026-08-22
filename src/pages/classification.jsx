import { useState } from "react";

export default function Classification() {
  const [category, setCategory] = useState("");

  const categories = [
    {
      name: "Student",
      description: "I'm learning about personal finance and investing."
    },
    {
      name: "Amateur",
      description: "I have some investing experience."
    },
    {
      name: "Professional",
      description: "I actively manage investments and portfolios."
    }
  ];

  const handleContinue = () => {
    if (!category) {
      alert("Please select a category.");
      return;
    }

    localStorage.setItem("wealthpath_category", category);

    window.location.href = "/dashboard";
  };

  return (
    <div className="classification-page">
      <div className="classification-card">

        <p className="eyebrow">WEALTHPATH</p>

        <h1>Tell us about yourself</h1>

        <p className="classification-subtitle">
          Choose the option that best describes your investing experience.
        </p>

        <div className="classification-options">
          {categories.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`classification-option ${
                category === item.name ? "selected" : ""
              }`}
              onClick={() => setCategory(item.name)}
            >
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>

        <button
          className="classification-continue"
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>
    </div>
  );
}