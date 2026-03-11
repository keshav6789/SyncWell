import { useEffect, useRef, useState } from "react"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"

function SelfConceptDiary() {
  const [draft, setDraft] = useState("")
  const [savedMessage, setSavedMessage] = useState("")
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [userId, setUserId] = useState("guest")
  const recognitionRef = useRef(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserId(currentUser?.uid || "guest")
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) {
      return
    }

    const existingEntry = window.localStorage.getItem(getDiaryKey(userId))
    setDraft(existingEntry || "")
  }, [userId])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setVoiceSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsListening(true)
      setSavedMessage("")
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
      setSavedMessage("Voice typing could not start in this browser.")
    }

    recognition.onresult = (event) => {
      let finalTranscript = ""

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        if (event.results[index].isFinal) {
          finalTranscript += event.results[index][0].transcript
        }
      }

      if (finalTranscript) {
        setDraft((currentDraft) =>
          currentDraft
            ? `${currentDraft.trim()} ${finalTranscript.trim()}`
            : finalTranscript.trim()
        )
      }
    }

    recognitionRef.current = recognition
    setVoiceSupported(true)

    return () => {
      recognition.stop()
    }
  }, [])

  const handleSave = () => {
    window.localStorage.setItem(getDiaryKey(userId), draft)
    setSavedMessage("Diary saved for your account on this device.")
  }

  const handleClear = () => {
    setDraft("")
    window.localStorage.removeItem(getDiaryKey(userId))
    setSavedMessage("Diary cleared.")
  }

  const handleVoiceTyping = () => {
    if (!recognitionRef.current) {
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      return
    }

    recognitionRef.current.start()
  }

  return (
    <section style={styles.wrapper}>
      <div style={styles.headerRow}>
        <div>
          <p style={styles.eyebrow}>Private Diary</p>
          <h2 style={styles.title}>Self Concept Journal</h2>
          <p style={styles.description}>
            Write your thoughts manually or use voice typing. Entries are saved
            privately for the currently logged-in account on this device.
          </p>
        </div>

        <div style={styles.buttonRow}>
          <button type="button" onClick={handleSave} style={styles.primaryButton}>
            Save Diary
          </button>
          <button type="button" onClick={handleClear} style={styles.secondaryButton}>
            Clear
          </button>
          <button
            type="button"
            onClick={handleVoiceTyping}
            style={voiceSupported ? styles.voiceButton : styles.disabledButton}
            disabled={!voiceSupported}
          >
            {isListening ? "Stop Voice Typing" : "Start Voice Typing"}
          </button>
        </div>
      </div>

      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Write about your thoughts, confidence, habits, and progress..."
        style={styles.textarea}
      />

      <p style={styles.statusText}>
        {voiceSupported
          ? isListening
            ? "Listening... speak clearly and your words will be added here."
            : "Voice typing is available in supported browsers."
          : "Voice typing is not available in this browser."}
      </p>

      {savedMessage && <p style={styles.savedMessage}>{savedMessage}</p>}
    </section>
  )
}

function getDiaryKey(userId) {
  return `self-concept-diary:${userId}`
}

const styles = {
  wrapper: {
    maxWidth: "1100px",
    margin: "32px auto 0",
    background: "white",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    flexWrap: "wrap",
    marginBottom: "20px"
  },
  eyebrow: {
    margin: "0 0 8px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#7c3aed",
    fontWeight: "700",
    fontSize: "13px"
  },
  title: {
    margin: "0 0 12px",
    color: "#0f172a"
  },
  description: {
    margin: 0,
    color: "#475569",
    lineHeight: "1.7",
    maxWidth: "620px"
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  primaryButton: {
    border: "none",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "#0f766e",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },
  secondaryButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "white",
    color: "#0f172a",
    fontWeight: "700",
    cursor: "pointer"
  },
  voiceButton: {
    border: "none",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "#7c3aed",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },
  disabledButton: {
    border: "none",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "#cbd5e1",
    color: "#475569",
    fontWeight: "700",
    cursor: "not-allowed"
  },
  textarea: {
    width: "100%",
    minHeight: "280px",
    borderRadius: "18px",
    border: "1px solid #cbd5e1",
    padding: "18px",
    boxSizing: "border-box",
    fontSize: "16px",
    lineHeight: "1.7",
    resize: "vertical",
    outline: "none"
  },
  statusText: {
    margin: "14px 0 0",
    color: "#475569"
  },
  savedMessage: {
    margin: "10px 0 0",
    color: "#0f766e",
    fontWeight: "700"
  }
}

export default SelfConceptDiary
