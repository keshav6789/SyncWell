import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

function HabitTracker() {

  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  const habitsCollection = collection(db, "habits");

  const addHabit = async () => {
    if(habit === "") return;

    await addDoc(habitsCollection, {
      name: habit
    });

    setHabit("");
    fetchHabits();
  };

  const fetchHabits = async () => {
    const data = await getDocs(habitsCollection);
    setHabits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHabit = async (id) => {
    const habitDoc = doc(db, "habits", id);
    await deleteDoc(habitDoc);
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>

      <h2>Habit Tracker</h2>

      <input
        type="text"
        placeholder="Enter habit"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
      />

      <button onClick={addHabit}>Add Habit</button>

      <ul>
        {habits.map((h) => (
          <li key={h.id}>
            {h.name}
            <button onClick={() => deleteHabit(h.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default HabitTracker;