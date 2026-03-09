import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;