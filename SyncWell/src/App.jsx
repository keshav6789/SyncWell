import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MentalHealth from "./pages/MentalHealth";
import MentalHealthDetail from "./pages/MentalHealthDetail";
import PhysicalHealth from "./pages/PhysicalHealth";
import Login from "./pages/Login";
import  Account from "./pages/Account";
import HabitTracker from "./components/HabitTracker";

import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
    const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <>
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/mental" element={
            <ProtectedRoute>
              <MentalHealth />
            </ProtectedRoute>
          }
        />

        <Route path="/mental/:slug" element={
            <ProtectedRoute>
              <MentalHealthDetail />
            </ProtectedRoute>
          }
        />

        <Route path="/physical" element={
            <ProtectedRoute>
              <PhysicalHealth />
            </ProtectedRoute>
          }
        />

        <Route path="/tracker" element={
            <ProtectedRoute>
              <HabitTracker />
            </ProtectedRoute>
          }
        />

        <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
