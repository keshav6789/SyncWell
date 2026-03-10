import { useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

function Workout() {
  const workoutPlan = [
    { name: "Jumping Jacks", baseReps: 20, difficulty: "Easy", calories: 30 },
    { name: "Squats", baseReps: 15, difficulty: "Easy", calories: 25 },
    { name: "Lunges", baseReps: 12, difficulty: "Medium", calories: 22 },
    { name: "Pushups", baseReps: 10, difficulty: "Medium", calories: 20 },
    {
      name: "Plank",
      baseReps: 30,
      unit: "seconds",
      difficulty: "Hard",
      calories: 15,
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressDays, setProgressDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [dailyWorkoutCount, setDailyWorkoutCount] = useState(0);
  const [dailyCompletedCount, setDailyCompletedCount] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [recentSessions, setRecentSessions] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");

  const userId = auth.currentUser?.uid || "demoUser";
  const isToday = selectedDate === today;

  useEffect(() => {
    loadWorkoutData();
  }, [selectedDate]);

  const loadWorkoutData = async () => {
    try {
      const workoutsRef = collection(db, "workouts");
      const q = query(workoutsRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);

      const allDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const uniqueDates = [...new Set(allDocs.map((item) => item.sessionDate))];
      setProgressDays(uniqueDates.length);

      const selectedDateDocs = allDocs.filter(
        (item) => item.sessionDate === selectedDate
      );

      const completedToday = selectedDateDocs.filter(
        (item) => item.status === "completed"
      );

      const caloriesToday = completedToday.reduce(
        (sum, item) => sum + (item.calories || 0),
        0
      );

      setDailyWorkoutCount(selectedDateDocs.length);
      setDailyCompletedCount(completedToday.length);
      setDailyCalories(caloriesToday);

      if (!isToday) {
        setInfoMessage(
          selectedDateDocs.length > 0
            ? "Viewing a past date. Session history is shown below."
            : "No workout session found for this date."
        );
      } else if (selectedDateDocs.length >= workoutPlan.length) {
        setInfoMessage(
          "You already completed today's session. Only one session is allowed per day."
        );
      } else if (selectedDateDocs.length > 0) {
        setInfoMessage(
          "You already started today's session. Continue from where you left off."
        );
      } else {
        setInfoMessage(
          "Start your workout. Only one guided session is allowed per day for safety."
        );
      }

      if (selectedDateDocs.length >= workoutPlan.length) {
        setSessionComplete(true);
        setCurrentIndex(workoutPlan.length - 1);
      } else {
        setSessionComplete(false);
        setCurrentIndex(selectedDateDocs.length);
      }

      const groupedSessions = Object.values(
        allDocs.reduce((acc, item) => {
          const date = item.sessionDate;
          if (!acc[date]) {
            acc[date] = {
              sessionDate: date,
              totalExercises: 0,
              completedExercises: 0,
              skippedExercises: 0,
              totalCalories: 0,
            };
          }

          acc[date].totalExercises += 1;

          if (item.status === "completed") {
            acc[date].completedExercises += 1;
            acc[date].totalCalories += item.calories || 0;
          }

          if (item.status === "skipped") {
            acc[date].skippedExercises += 1;
          }

          return acc;
        }, {})
      ).sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate));

      setRecentSessions(groupedSessions.slice(0, 5));
    } catch (error) {
      console.error("Error loading workout data:", error);
      setInfoMessage("Failed to load workout progress.");
    }
  };

  const multiplier = useMemo(() => {
    return Math.min(1 + progressDays * 0.1, 1.5);
  }, [progressDays]);

  const currentWorkout =
    workoutPlan[Math.min(currentIndex, workoutPlan.length - 1)];
  const reps = Math.round(currentWorkout.baseReps * multiplier);
  const progressPercent = (dailyWorkoutCount / workoutPlan.length) * 100;

  const saveProgress = async (status = "completed") => {
    if (!isToday) {
      setInfoMessage("You can only perform a live guided session for today's date.");
      return;
    }

    if (sessionComplete) {
      setInfoMessage(
        "Today's session is already completed. Come back tomorrow for the next session."
      );
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "workouts"), {
        userId,
        exercise: currentWorkout.name,
        reps,
        unit: currentWorkout.unit || "reps",
        difficulty: currentWorkout.difficulty,
        calories: currentWorkout.calories,
        status,
        sessionDate: selectedDate,
        createdAt: new Date().toISOString(),
      });

      await loadWorkoutData();
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

  return (
    <section
      style={{
        maxWidth: "980px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.9fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            borderRadius: "24px",
            background: "linear-gradient(135deg, #eff6ff, #ffffff)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
            padding: "28px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "30px",
              marginBottom: "8px",
              color: "#111827",
            }}
          >
            Smart Workout Coach
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              marginBottom: "18px",
            }}
          >
            Safer training with one guided session per day
          </p>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "18px",
              marginBottom: "18px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#1f2937",
              }}
            >
              Select Date
            </label>

            <input
              type="date"
              value={selectedDate}
              max={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <p
              style={{
                marginTop: "12px",
                marginBottom: 0,
                color: "#4b5563",
                fontSize: "14px",
              }}
            >
              {infoMessage}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                padding: "16px",
                borderRadius: "16px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                Total Session Days
              </p>
              <h3 style={{ margin: "8px 0 0", color: "#111827" }}>
                {progressDays}
              </h3>
            </div>

            <div
              style={{
                background: "#ffffff",
                padding: "16px",
                borderRadius: "16px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                Progress Boost
              </p>
              <h3 style={{ margin: "8px 0 0", color: "#111827" }}>
                x{multiplier.toFixed(1)}
              </h3>
            </div>

            <div
              style={{
                background: "#ffffff",
                padding: "16px",
                borderRadius: "16px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                Calories Today
              </p>
              <h3 style={{ margin: "8px 0 0", color: "#111827" }}>
                {dailyCalories}
              </h3>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              <span>
                Session Progress {dailyWorkoutCount} / {workoutPlan.length}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>

            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #3b82f6, #22c55e)",
                  borderRadius: "999px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {sessionComplete ? (
            <div
              style={{
                background: "linear-gradient(135deg, #dbeafe, #f0fdf4)",
                borderRadius: "20px",
                padding: "30px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "28px",
                  marginBottom: "10px",
                  color: "#111827",
                }}
              >
                Session Complete 🎉
              </h3>
              <p style={{ fontSize: "16px", color: "#374151" }}>
                Great job. You finished your guided session for {selectedDate}.
              </p>
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "#2563eb",
                }}
              >
                For safety, the next session unlocks tomorrow.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                textAlign: "center",
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
                  marginBottom: "16px",
                }}
              >
                {currentWorkout.difficulty}
              </div>

              <h3
                style={{
                  fontSize: "26px",
                  marginBottom: "14px",
                  color: "#1f2937",
                }}
              >
                {currentWorkout.name}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    background: "#f9fafb",
                    padding: "14px",
                    borderRadius: "14px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                    Target
                  </p>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {reps} {currentWorkout.unit || "reps"}
                  </p>
                </div>

                <div
                  style={{
                    background: "#f9fafb",
                    padding: "14px",
                    borderRadius: "14px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                    Calories
                  </p>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {currentWorkout.calories}
                  </p>
                </div>
              </div>

              <p style={{ color: "#4b5563", marginBottom: "20px" }}>
                Complete this exercise and move to the next one. Reps increase
                gradually over time based on past session days.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => saveProgress("completed")}
                  disabled={loading || !isToday}
                  style={{
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: "12px",
                    background: loading || !isToday ? "#93c5fd" : "#2563eb",
                    color: "#ffffff",
                    fontWeight: "bold",
                    cursor: loading || !isToday ? "not-allowed" : "pointer",
                    minWidth: "140px",
                  }}
                >
                  {loading ? "Saving..." : "Completed"}
                </button>

                <button
                  onClick={() => saveProgress("skipped")}
                  disabled={loading || !isToday}
                  style={{
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: "12px",
                    background: loading || !isToday ? "#d1d5db" : "#e5e7eb",
                    color: "#111827",
                    fontWeight: "bold",
                    cursor: loading || !isToday ? "not-allowed" : "pointer",
                    minWidth: "120px",
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            borderRadius: "24px",
            background: "#ffffff",
            boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
            padding: "24px",
            height: "fit-content",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#111827" }}>Session Summary</h3>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "14px",
                padding: "14px",
              }}
            >
              <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>
                Selected Date
              </p>
              <h4 style={{ margin: "8px 0 0", color: "#111827" }}>
                {selectedDate}
              </h4>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "14px",
                padding: "14px",
              }}
            >
              <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>
                Completed Exercises
              </p>
              <h4 style={{ margin: "8px 0 0", color: "#111827" }}>
                {dailyCompletedCount}
              </h4>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "14px",
                padding: "14px",
              }}
            >
              <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>
                Saved Workout Steps
              </p>
              <h4 style={{ margin: "8px 0 0", color: "#111827" }}>
                {dailyWorkoutCount}
              </h4>
            </div>
          </div>

          <h3 style={{ color: "#111827", marginBottom: "12px" }}>
            Recent Sessions
          </h3>

          {recentSessions.length === 0 ? (
            <p style={{ color: "#6b7280", margin: 0 }}>
              No workout history yet.
            </p>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {recentSessions.map((session) => (
                <div
                  key={session.sessionDate}
                  style={{
                    background: "#f9fafb",
                    borderRadius: "14px",
                    padding: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong style={{ color: "#111827" }}>
                      {session.sessionDate}
                    </strong>
                    <span style={{ color: "#2563eb", fontWeight: "bold" }}>
                      {session.completedExercises}/{workoutPlan.length} done
                    </span>
                  </div>

                  <p style={{ margin: "4px 0", color: "#4b5563", fontSize: "14px" }}>
                    Skipped: {session.skippedExercises}
                  </p>
                  <p style={{ margin: "4px 0", color: "#4b5563", fontSize: "14px" }}>
                    Calories: {session.totalCalories}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Workout;