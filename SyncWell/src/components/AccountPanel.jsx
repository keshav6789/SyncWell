import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AccountPanel() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await signOut(auth);
      setMessage("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Failed to logout");
    } finally {
      setLoadingLogout(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) {
      setMessage("No logged in user found");
      return;
    }

    try {
      setLoadingReset(true);
      await sendPasswordResetEmail(auth, user.email);
      setMessage("Password reset email sent successfully");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send password reset email");
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "20px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#111827",
            fontSize: "32px",
          }}
        >
          My Account
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "24px",
          }}
        >
          Manage your account settings
        </p>

        <div
          style={{
            background: "#f8fafc",
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: "0 0 8px", color: "#6b7280", fontSize: "14px" }}>
            Logged in as
          </p>
          <h3 style={{ margin: 0, color: "#111827", wordBreak: "break-word" }}>
            {user?.email || "No user found"}
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gap: "12px",
          }}
        >
          <button
            onClick={handleResetPassword}
            disabled={loadingReset}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            {loadingReset ? "Sending..." : "Forgot Password / Reset Password"}
          </button>

          <button
            onClick={handleLogout}
            disabled={loadingLogout}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "12px",
              background: "#ef4444",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </div>

        {message && (
          <p
            style={{
              marginTop: "18px",
              textAlign: "center",
              color: "#374151",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default AccountPanel;