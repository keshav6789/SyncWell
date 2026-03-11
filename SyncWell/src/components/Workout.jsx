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
            ? "Viewing a previous date. Your saved session history is shown below."
            : "No workout session was found for this date."
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
          "Start your workout session. Only one guided session is allowed per day for safety."
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
      setInfoMessage("You can only perform a live workout for today's date.");
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
    <section style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.badge}>Physical Wellness</p>
        <h1 style={styles.pageTitle}>Physical Health</h1>
        <p style={styles.pageSubtitle}>
          Build consistency with a smart daily workout plan, session tracking,
          and progress-based improvement.
        </p>
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.leftPanel}>
          <div style={styles.cardHeader}>
            <h2 style={styles.coachTitle}>Smart Workout Coach</h2>
            <p style={styles.coachSubtitle}>
              Safer training with one guided session per day
            </p>
          </div>

          <div style={styles.inputCard}>
            <label style={styles.label}>Select Date</label>

            <input
              type="date"
              value={selectedDate}
              max={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.input}
            />

            <p style={styles.infoText}>{infoMessage}</p>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Total Session Days</p>
              <h3 style={styles.statValue}>{progressDays}</h3>
            </div>

            <div style={styles.statCard}>
              <p style={styles.statLabel}>Progress Boost</p>
              <h3 style={styles.statValue}>x{multiplier.toFixed(1)}</h3>
            </div>

            <div style={styles.statCard}>
              <p style={styles.statLabel}>Calories Today</p>
              <h3 style={styles.statValue}>{dailyCalories}</h3>
            </div>
          </div>

          <div style={styles.progressCard}>
            <div style={styles.progressRow}>
              <span>
                Session Progress {dailyWorkoutCount} / {workoutPlan.length}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>

            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progressPercent}%`,
                }}
              />
            </div>
          </div>

          {sessionComplete ? (
            <div style={styles.completeCard}>
              <h3 style={styles.completeTitle}>Session Complete 🎉</h3>
              <p style={styles.completeText}>
                Great job. You finished your guided session for {selectedDate}.
              </p>
              <p style={styles.completeNote}>
                For safety, the next session unlocks tomorrow.
              </p>
            </div>
          ) : (
            <div style={styles.workoutCard}>
              <div
                style={{
                  ...styles.difficultyBadge,
                  background: getDifficultyColor(currentWorkout.difficulty),
                }}
              >
                {currentWorkout.difficulty}
              </div>

              <h3 style={styles.exerciseTitle}>{currentWorkout.name}</h3>

              <div style={styles.exerciseStats}>
                <div style={styles.exerciseMiniCard}>
                  <p style={styles.exerciseMiniLabel}>Target</p>
                  <p style={styles.exerciseMiniValue}>
                    {reps} {currentWorkout.unit || "reps"}
                  </p>
                </div>

                <div style={styles.exerciseMiniCard}>
                  <p style={styles.exerciseMiniLabel}>Calories</p>
                  <p style={styles.exerciseMiniValue}>
                    {currentWorkout.calories}
                  </p>
                </div>
              </div>

              <p style={styles.exerciseDescription}>
                Complete this exercise and move to the next one. Repetitions
                increase gradually over time based on your previous workout
                consistency.
              </p>

              <div style={styles.buttonRow}>
                <button
                  onClick={() => saveProgress("completed")}
                  disabled={loading || !isToday}
                  style={{
                    ...styles.primaryButton,
                    opacity: loading || !isToday ? 0.7 : 1,
                    cursor: loading || !isToday ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Saving..." : "Completed"}
                </button>

                <button
                  onClick={() => saveProgress("skipped")}
                  disabled={loading || !isToday}
                  style={{
                    ...styles.secondaryButton,
                    opacity: loading || !isToday ? 0.7 : 1,
                    cursor: loading || !isToday ? "not-allowed" : "pointer",
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={styles.rightPanel}>
          <h3 style={styles.summaryTitle}>Session Summary</h3>

          <div style={styles.summaryGrid}>
            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Selected Date</p>
              <h4 style={styles.summaryValue}>{selectedDate}</h4>
            </div>

            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Completed Exercises</p>
              <h4 style={styles.summaryValue}>{dailyCompletedCount}</h4>
            </div>

            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Saved Workout Steps</p>
              <h4 style={styles.summaryValue}>{dailyWorkoutCount}</h4>
            </div>
          </div>

          <h3 style={styles.summaryTitle}>Recent Sessions</h3>

          {recentSessions.length === 0 ? (
            <p style={styles.emptyText}>No workout history yet.</p>
          ) : (
            <div style={styles.recentList}>
              {recentSessions.map((session) => (
                <div key={session.sessionDate} style={styles.recentCard}>
                  <div style={styles.recentTop}>
                    <strong style={styles.recentDate}>
                      {session.sessionDate}
                    </strong>
                    <span style={styles.recentDone}>
                      {session.completedExercises}/{workoutPlan.length} done
                    </span>
                  </div>

                  <p style={styles.recentText}>
                    Skipped: {session.skippedExercises}
                  </p>
                  <p style={styles.recentText}>
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

const styles = {
  page: {
    padding: "60px 20px 80px",
    background:
      "linear-gradient(180deg, #f8fbff 0%, #f1f5f9 50%, #eef7f2 100%)",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  hero: {
    textAlign: "center",
    maxWidth: "850px",
    margin: "0 auto 40px",
  },
  badge: {
    display: "inline-block",
    margin: "0 0 12px",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontWeight: "bold",
    fontSize: "14px",
    letterSpacing: "0.3px",
  },
  pageTitle: {
    fontSize: "48px",
    margin: "0 0 14px",
    color: "#0f172a",
  },
  pageSubtitle: {
    fontSize: "18px",
    color: "#475569",
    margin: 0,
    lineHeight: "1.8",
  },
  mainGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "24px",
    alignItems: "start",
  },
  leftPanel: {
    background: "rgba(255,255,255,0.55)",
    borderRadius: "28px",
    padding: "28px",
    backdropFilter: "blur(6px)",
    boxShadow: "0 14px 40px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(255,255,255,0.7)",
  },
  rightPanel: {
    background: "#ffffff",
    borderRadius: "28px",
    padding: "24px",
    boxShadow: "0 14px 40px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  },
  cardHeader: {
    textAlign: "center",
    marginBottom: "24px",
  },
  coachTitle: {
    margin: "0 0 10px",
    fontSize: "38px",
    color: "#0f172a",
  },
  coachSubtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "18px",
  },
  inputCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "22px",
    marginBottom: "20px",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "16px",
    color: "#0f172a",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
    background: "#f8fafc",
  },
  infoText: {
    marginTop: "14px",
    marginBottom: 0,
    color: "#475569",
    lineHeight: "1.6",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
    marginBottom: "20px",
  },
  statCard: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.06)",
  },
  statLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },
  statValue: {
    margin: "10px 0 0",
    fontSize: "32px",
    color: "#0f172a",
  },
  progressCard: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "20px",
    marginBottom: "20px",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.06)",
  },
  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#334155",
    fontWeight: "bold",
    fontSize: "15px",
  },
  progressTrack: {
    width: "100%",
    height: "12px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #3b82f6, #22c55e)",
    borderRadius: "999px",
    transition: "width 0.3s ease",
  },
  workoutCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
    textAlign: "center",
  },
  difficultyBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "18px",
  },
  exerciseTitle: {
    fontSize: "30px",
    margin: "0 0 18px",
    color: "#111827",
  },
  exerciseStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "20px",
  },
  exerciseMiniCard: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "18px",
  },
  exerciseMiniLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },
  exerciseMiniValue: {
    margin: "8px 0 0",
    fontWeight: "bold",
    fontSize: "24px",
    color: "#0f172a",
  },
  exerciseDescription: {
    color: "#475569",
    lineHeight: "1.8",
    marginBottom: "22px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  primaryButton: {
    border: "none",
    padding: "14px 26px",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "15px",
    minWidth: "150px",
    boxShadow: "0 8px 18px rgba(37, 99, 235, 0.28)",
  },
  secondaryButton: {
    border: "1px solid #cbd5e1",
    padding: "14px 26px",
    borderRadius: "14px",
    background: "#f8fafc",
    color: "#0f172a",
    fontWeight: "bold",
    fontSize: "15px",
    minWidth: "120px",
  },
  completeCard: {
    background: "linear-gradient(135deg, #dbeafe, #dcfce7)",
    borderRadius: "24px",
    padding: "34px 24px",
    textAlign: "center",
    boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
  },
  completeTitle: {
    margin: "0 0 12px",
    fontSize: "30px",
    color: "#0f172a",
  },
  completeText: {
    margin: "0 0 10px",
    color: "#334155",
    fontSize: "16px",
  },
  completeNote: {
    margin: 0,
    color: "#2563eb",
    fontWeight: "bold",
  },
  summaryTitle: {
    marginTop: 0,
    marginBottom: "16px",
    color: "#0f172a",
    fontSize: "30px",
  },
  summaryGrid: {
    display: "grid",
    gap: "14px",
    marginBottom: "24px",
  },
  summaryCard: {
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "16px",
    border: "1px solid #e2e8f0",
  },
  summaryLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },
  summaryValue: {
    margin: "10px 0 0",
    color: "#0f172a",
    fontSize: "28px",
  },
  recentList: {
    display: "grid",
    gap: "14px",
  },
  recentCard: {
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "16px",
    border: "1px solid #e2e8f0",
  },
  recentTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "8px",
    flexWrap: "wrap",
  },
  recentDate: {
    color: "#0f172a",
    fontSize: "18px",
  },
  recentDone: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  recentText: {
    margin: "6px 0",
    color: "#475569",
  },
  emptyText: {
    color: "#64748b",
    margin: 0,
  },
};

export default Workout;