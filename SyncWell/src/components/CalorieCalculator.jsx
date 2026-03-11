import { useState } from "react";

function CalorieCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintenance");
  const [foodType, setFoodType] = useState("veg");

  const [result, setResult] = useState(null);

  function calculateCalories() {
    if (!weight || !height || !age) {
      alert("Please fill all fields");
      return;
    }

    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    let bmr;

    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const activityMultipliers = {
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };

    const maintenanceCalories = Math.round(bmr * activityMultipliers[activity]);

    let targetCalories = maintenanceCalories;

    if (goal === "bulking") {
      targetCalories = maintenanceCalories + 300;
    } else if (goal === "fatloss") {
      targetCalories = maintenanceCalories - 400;
    }

    const bmi = (w / ((h / 100) * (h / 100))).toFixed(1);
    const protein = Math.round(w * (goal === "bulking" ? 2.0 : 1.6));
    const water = (w * 0.035).toFixed(1);

    const dietPlan = getDietPlan({
      age: a,
      gender,
      goal,
      foodType,
      targetCalories,
    });

    setResult({
      maintenanceCalories,
      targetCalories,
      bmi,
      protein,
      water,
      dietPlan,
    });
  }

  function getDietPlan({ age, gender, goal, foodType, targetCalories }) {
    const ageGroup =
      age < 18 ? "teen" : age < 40 ? "adult" : age < 60 ? "mid" : "senior";

    if (foodType === "veg") {
      if (goal === "bulking") {
        return {
          breakfast:
            ageGroup === "teen"
              ? "Oats with milk, banana, peanut butter, and soaked almonds"
              : "Paneer sandwich, oats, banana, and milk",
          lunch:
            "Rice, dal, paneer/tofu, vegetables, curd, and salad",
          snack:
            "Peanut butter toast, fruit smoothie, roasted chana, or nuts",
          dinner:
            "Roti, paneer/tofu curry, vegetables, and curd",
          tips: [
            "Add calorie-dense foods like peanut butter, milk, paneer, nuts",
            "Aim for regular protein in every meal",
            "Do strength training with proper sleep",
          ],
        };
      }

      if (goal === "fatloss") {
        return {
          breakfast:
            "Greek yogurt / curd, oats, chia seeds, and one fruit",
          lunch:
            "2 rotis, dal, mixed vegetables, salad, and tofu/paneer",
          snack:
            "Sprouts, cucumber, green tea, or roasted makhana",
          dinner:
            "Soup, sautéed vegetables, tofu/paneer, and salad",
          tips: [
            "Keep protein high and fried food low",
            "Use smaller portions of rice and roti",
            "Drink more water and avoid sugary drinks",
          ],
        };
      }

      return {
        breakfast:
          "Oats or poha with curd/milk and fruit",
        lunch:
          "Rice/roti, dal, vegetables, curd, and paneer/tofu",
        snack:
          "Fruit, nuts, buttermilk, or roasted chana",
        dinner:
          "Roti, sabzi, dal, and salad",
        tips: [
          "Focus on balanced meals",
          "Include protein in each meal",
          "Keep daily meal timing consistent",
        ],
      };
    }

    if (goal === "bulking") {
      return {
        breakfast:
          "Egg omelette, oats with milk, banana, and peanut butter toast",
        lunch:
          "Rice, chicken/fish, vegetables, curd, and salad",
        snack:
          "Boiled eggs, protein smoothie, nuts, or sandwich",
        dinner:
          "Roti/rice, chicken/fish, vegetables, and curd",
        tips: [
          "Increase calories with quality carbs and protein",
          "Eat eggs/chicken/fish regularly for muscle recovery",
          "Do strength training 3–5 times a week",
        ],
      };
    }

    if (goal === "fatloss") {
      return {
        breakfast:
          "Boiled eggs, oats, black coffee/green tea, and fruit",
        lunch:
          "Grilled chicken/fish, salad, vegetables, and small portion rice/roti",
        snack:
          "Egg whites, fruit, yogurt, or nuts",
        dinner:
          "Soup, grilled protein source, and vegetables",
        tips: [
          "Prefer grilled/boiled food over fried food",
          "Avoid junk snacks and sugary drinks",
          "Keep dinner light and protein-rich",
        ],
      };
    }

    return {
      breakfast:
        "Eggs, toast, milk, and fruit",
      lunch:
        "Rice/roti, chicken/fish, vegetables, and curd",
      snack:
        "Fruit, yogurt, nuts, or boiled eggs",
      dinner:
        "Roti/rice, protein source, vegetables, and salad",
      tips: [
        "Eat balanced meals with protein, carbs, and fiber",
        "Keep hydration and sleep in check",
        "Stay active even on rest days",
      ],
    };
  }

  function getBmiCategory(bmi) {
    const value = Number(bmi);
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal";
    if (value < 30) return "Overweight";
    return "Obese";
  }

  return (
    <section style={styles.wrapper}>
      <h2 style={styles.title}>🔥 Smart Calorie & Diet Planner</h2>

      <p style={styles.subtitle}>
        Get calorie needs, BMI, protein target, hydration, and diet suggestions
        based on your body details and food preference.
      </p>

      <div style={styles.card}>
        <div style={styles.inputs}>
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={styles.input}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            style={styles.input}
          >
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="active">Active</option>
          </select>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={styles.input}
          >
            <option value="maintenance">Maintenance</option>
            <option value="bulking">Bulking</option>
            <option value="fatloss">Fat Loss</option>
          </select>

          <select
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            style={styles.input}
          >
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>

          <button onClick={calculateCalories} style={styles.button}>
            Calculate Plan
          </button>
        </div>
      </div>

      {result && (
        <>
          <div style={styles.resultSection}>
            <h3 style={styles.resultTitle}>Your Health Summary</h3>

            <div style={styles.resultGrid}>
              <div style={styles.resultCard}>
                <p>Maintenance Calories</p>
                <h3>{result.maintenanceCalories} kcal</h3>
              </div>

              <div style={{ ...styles.resultCard, background: "#ecfdf5" }}>
                <p>Target Calories</p>
                <h3>{result.targetCalories} kcal</h3>
              </div>

              <div style={{ ...styles.resultCard, background: "#fef3c7" }}>
                <p>BMI</p>
                <h3>{result.bmi}</h3>
                <small>{getBmiCategory(result.bmi)}</small>
              </div>

              <div style={{ ...styles.resultCard, background: "#ede9fe" }}>
                <p>Protein Target</p>
                <h3>{result.protein} g/day</h3>
              </div>

              <div style={{ ...styles.resultCard, background: "#e0f2fe" }}>
                <p>Water Intake</p>
                <h3>{result.water} L/day</h3>
              </div>
            </div>
          </div>

          <div style={styles.dietSection}>
            <h3 style={styles.dietTitle}>🥗 Personalized Diet Suggestion</h3>

            <div style={styles.mealCard}>
              <h4>Breakfast</h4>
              <p>{result.dietPlan.breakfast}</p>
            </div>

            <div style={styles.mealCard}>
              <h4>Lunch</h4>
              <p>{result.dietPlan.lunch}</p>
            </div>

            <div style={styles.mealCard}>
              <h4>Snack</h4>
              <p>{result.dietPlan.snack}</p>
            </div>

            <div style={styles.mealCard}>
              <h4>Dinner</h4>
              <p>{result.dietPlan.dinner}</p>
            </div>

            <div style={styles.tipBox}>
              <h4>Smart Tips</h4>
              <ul style={styles.list}>
                {result.dietPlan.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

const styles = {
  wrapper: {
    padding: "60px 20px",
    background: "#f4f6fb",
    fontFamily: "Arial, sans-serif",
    minHeight: "80vh",
  },

  title: {
    textAlign: "center",
    fontSize: "34px",
    marginBottom: "10px",
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "30px",
    maxWidth: "760px",
    marginInline: "auto",
  },

  card: {
    maxWidth: "900px",
    margin: "auto",
    background: "white",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  inputs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  button: {
    gridColumn: "span 2",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  resultSection: {
    maxWidth: "950px",
    margin: "30px auto",
  },

  resultTitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#111827",
  },

  resultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
  },

  resultCard: {
    background: "#eff6ff",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 8px 18px rgba(0,0,0,0.05)",
  },

  dietSection: {
    maxWidth: "900px",
    margin: "30px auto",
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  dietTitle: {
    marginBottom: "20px",
    color: "#111827",
    textAlign: "center",
  },

  mealCard: {
    background: "#f9fafb",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "12px",
  },

  tipBox: {
    marginTop: "20px",
    background: "#eef2ff",
    padding: "18px",
    borderRadius: "12px",
  },

  list: {
    margin: "10px 0 0",
    paddingLeft: "18px",
    color: "#374151",
    lineHeight: "1.8",
  },
};

export default CalorieCalculator;