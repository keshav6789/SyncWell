import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Workout() {
  const workoutPlan = [
    { name: "Jumping Jacks", baseReps: 20, difficulty: "Easy", calories: 30 },
    { name: "Squats", baseReps: 15, difficulty: "Easy", calories: 25 },
    { name: "Lunges", baseReps: 12, difficulty: "Medium", calories: 22 },
    { name: "Pushups", baseReps: 10, difficulty: "Medium", calories: 20 },
    { name: "Plank", baseReps: 30, unit: "seconds", difficulty: "Hard", calories: 15 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressDays, setProgressDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const snapshot = await getDocs(collection(db, "workouts"));
      setProgressDays(snapshot.size);
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const currentWorkout = workoutPlan[currentIndex];
  const multiplier = 1 + progressDays * 0.3;
  const reps = Math.round(currentWorkout.baseReps * multiplier);
  const progressPercent = ((currentIndex + 1) / workoutPlan.length) * 100;

  const saveProgress = async (status = "completed") => {
    try {
      setLoading(true);

      await addDoc(collection(db, "workouts"), {
        userId: "demoUser",
        exercise: currentWorkout.name,
        reps,
        unit: currentWorkout.unit || "reps",
        difficulty: currentWorkout.difficulty,
        calories: currentWorkout.calories,
        status,
        date: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString()
      });

      if (currentIndex < workoutPlan.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setSessionComplete(true);
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("Failed to save workout progress");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === "Easy") return "#16a34a";
    if (difficulty === "Medium") return "#f59e0b";
    return "#ef4444";
  };

  if (sessionComplete) {
    return (
      <section
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #dbeafe, #f0fdf4)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center"
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#111827" }}>
          Workout Complete 🎉
        </h2>
        <p style={{ fontSize: "16px", color: "#374151" }}>
          Great job. You completed today’s workout session.
        </p>
        <p style={{ marginTop: "12px", fontWeight: "bold", color: "#2563eb" }}>
          Come back tomorrow for increased reps.
        </p>
      </section>
    );
  }

  return (
    <section
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        padding: "28px",
        borderRadius: "22px",
        background: "linear-gradient(135deg, #eff6ff, #ffffff)",
        boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          marginBottom: "8px",
          color: "#111827"
        }}
      >
        Smart Workout Coach
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          marginBottom: "18px"
        }}
      >
        Day Progress Boost: x{multiplier.toFixed(1)}
      </p>

      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontSize: "14px",
            color: "#374151"
          }}
        >
          <span>
            Workout {currentIndex + 1} of {workoutPlan.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#e5e7eb",
            borderRadius: "999px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: "linear-gradient(90deg, #3b82f6, #22c55e)",
              borderRadius: "999px",
              transition: "width 0.3s ease"
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          textAlign: "center"
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: "999px",
            background: getDifficultyColor(currentWorkout.difficulty),
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "13px",
            marginBottom: "16px"
          }}
        >
          {currentWorkout.difficulty}
        </div>

        <h3
          style={{
            fontSize: "26px",
            marginBottom: "14px",
            color: "#1f2937"
          }}
        >
          {currentWorkout.name}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "20px"
          }}
        >
          <div
            style={{
              background: "#f9fafb",
              padding: "14px",
              borderRadius: "14px"
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
              Target
            </p>
            <p style={{ margin: "6px 0 0", fontWeight: "bold", fontSize: "20px" }}>
              {reps} {currentWorkout.unit || "reps"}
            </p>
          </div>

          <div
            style={{
              background: "#f9fafb",
              padding: "14px",
              borderRadius: "14px"
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
              Calories
            </p>
            <p style={{ margin: "6px 0 0", fontWeight: "bold", fontSize: "20px" }}>
              {currentWorkout.calories}
            </p>
          </div>
        </div>

        <p style={{ color: "#4b5563", marginBottom: "20px" }}>
          Complete this workout and save your progress. Tomorrow’s target will
          automatically increase.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <button
            onClick={() => saveProgress("completed")}
            disabled={loading}
            style={{
              border: "none",
              padding: "12px 22px",
              borderRadius: "12px",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer",
              minWidth: "140px"
            }}
          >
            {loading ? "Saving..." : "Completed"}
          </button>

          <button
            onClick={() => saveProgress("skipped")}
            disabled={loading}
            style={{
              border: "none",
              padding: "12px 22px",
              borderRadius: "12px",
              background: "#e5e7eb",
              color: "#111827",
              fontWeight: "bold",
              cursor: "pointer",
              minWidth: "120px"
            }}
          >
            Skip
          </button>
        </div>
      </div>
    </section>
  );
}

export default Workout;