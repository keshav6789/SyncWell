import { useState } from "react";

function HabitTracker() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink water", completed: false },
    { id: 2, name: "Walk 20 minutes", completed: false }
  ]);
  const [habitName, setHabitName] = useState("");

  const addHabit = () => {
    const trimmedName = habitName.trim();

    if (!trimmedName) {
      return;
    }

    setHabits((currentHabits) => [
      ...currentHabits,
      {
        id: Date.now(),
        name: trimmedName,
        completed: false
      }
    ]);
    setHabitName("");
  };

  const toggleHabit = (id) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Habit Tracker</h1>
        <p style={styles.description}>
          Add habits and mark them complete as you build your routine.
        </p>

        <div style={styles.inputRow}>
          <input
            type="text"
            value={habitName}
            onChange={(event) => setHabitName(event.target.value)}
            placeholder="Add a new habit"
            style={styles.input}
          />
          <button type="button" onClick={addHabit} style={styles.button}>
            Add
          </button>
        </div>

        <div style={styles.list}>
          {habits.map((habit) => (
            <label key={habit.id} style={styles.habitRow}>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
              />
              <span
                style={{
                  ...styles.habitText,
                  ...(habit.completed ? styles.completedHabit : {})
                }}
              >
                {habit.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "48px 20px",
    background: "#f5f7fb"
  },
  card: {
    maxWidth: "760px",
    margin: "0 auto",
    padding: "32px",
    borderRadius: "20px",
    background: "white",
    boxShadow: "0 16px 32px rgba(15, 23, 42, 0.08)"
  },
  heading: {
    marginTop: 0,
    marginBottom: "12px",
    color: "#0f172a"
  },
  description: {
    marginTop: 0,
    marginBottom: "24px",
    color: "#475569"
  },
  inputRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px"
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "16px"
  },
  button: {
    border: "none",
    borderRadius: "12px",
    padding: "12px 18px",
    background: "#22c55e",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },
  list: {
    display: "grid",
    gap: "12px"
  },
  habitRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "#f8fafc"
  },
  habitText: {
    color: "#0f172a"
  },
  completedHabit: {
    textDecoration: "line-through",
    color: "#64748b"
  }
};

export default HabitTracker;
