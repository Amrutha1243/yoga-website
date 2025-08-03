import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Instructors from "./pages/Instructors";
import Auth from "./pages/Auth"; // Login/Register combined

// ✅ Validate JWT expiration
function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    return Date.now() < decoded.exp * 1000; // Convert to ms
  } catch (e) {
    return false;
  }
}

// ✅ Protect routes
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token || !isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/auth" />;
  }
  return children;
}

// ✅ Layout wrapper (Navbar/Footer toggle)
function LayoutWrapper() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const hideNavbar = location.pathname === "/auth";

  return (
    <>
      {token && !hideNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Auth page standalone */}
        <Route path="/auth" element={<Auth />} />

        {/* ✅ Protected layout routes */}
        <Route element={<LayoutWrapper />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <PrivateRoute>
                <Classes />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructors"
            element={
              <PrivateRoute>
                <Instructors />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
