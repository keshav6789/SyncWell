import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function HabitTracker() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  const habitsCollection = collection(db, "habits");

  const fetchHabits = async () => {
    try {
      const data = await getDocs(habitsCollection);
      setHabits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  const addHabit = async () => {
    if (habit.trim() === "") return;

    try {
      setLoading(true);

      await addDoc(habitsCollection, {
        userId: "demoUser",
        name: habit,
        completed: false,
        date: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
      });

      setHabit("");
      fetchHabits();
    } catch (error) {
      console.error("Error adding habit:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (id) => {
    try {
      const habitDoc = doc(db, "habits", id);
      await deleteDoc(habitDoc);
      fetchHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const toggleHabit = async (id, currentStatus) => {
    try {
      const habitDoc = doc(db, "habits", id);
      await updateDoc(habitDoc, {
        completed: !currentStatus,
      });
      fetchHabits();
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <section
      style={{
        maxWidth: "760px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #eff6ff, #ffffff)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "34px",
          color: "#111827",
          marginBottom: "10px",
        }}
      >
        Habit Tracker
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#6b7280",
          marginBottom: "24px",
        }}
      >
        Build healthy routines and track your daily progress
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter habit"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "12px 14px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <button
          onClick={addHabit}
          disabled={loading}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "12px",
            background: "#2563eb",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Adding..." : "Add Habit"}
        </button>
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "14px",
          borderRadius: "14px",
          background: "#f8fafc",
          textAlign: "center",
          fontWeight: "bold",
          color: "#1f2937",
        }}
      >
        Progress: {completedCount} / {habits.length} habits completed
      </div>

      {habits.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: "20px",
          }}
        >
          No habits added yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {habits.map((h) => (
            <li
              key={h.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                background: h.completed ? "#dcfce7" : "#ffffff",
                padding: "16px",
                borderRadius: "14px",
                marginBottom: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div>
                <h4
                  style={{
                    margin: 0,
                    color: "#111827",
                    textDecoration: h.completed ? "line-through" : "none",
                  }}
                >
                  {h.name}
                </h4>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: h.completed ? "#16a34a" : "#6b7280",
                  }}
                >
                  {h.completed ? "Completed" : "Pending"}
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => toggleHabit(h.id, h.completed)}
                  style={{
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: h.completed ? "#f59e0b" : "#16a34a",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {h.completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => deleteHabit(h.id)}
                  style={{
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "#ef4444",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HabitTracker;