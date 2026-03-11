import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MentalHealth from "./pages/MentalHealth";
import MentalHealthDetail from "./pages/MentalHealthDetail";
import PhysicalHealth from "./pages/PhysicalHealth";
import Login from "./pages/Login";
import Account from "./pages/Account";

import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* Hide Navbar on login page */}
      {!isLoginPage && <Navbar />}

      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Home Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Mental Health Main Page */}
        <Route
          path="/mental"
          element={
            <ProtectedRoute>
              <MentalHealth />
            </ProtectedRoute>
          }
        />

        {/* Mental Health Detail Page (Overthinking / Anxiety / etc) */}
        <Route
          path="/mental/:slug"
          element={
            <ProtectedRoute>
              <MentalHealthDetail />
            </ProtectedRoute>
          }
        />

        {/* Physical Health Page */}
        <Route
          path="/physical"
          element={
            <ProtectedRoute>
              <PhysicalHealth />
            </ProtectedRoute>
          }
        />

        {/* Account Page */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Hide Footer on login page */}
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;