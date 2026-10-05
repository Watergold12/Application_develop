import { useState } from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("mcrae_session")) || null
  );

  const logout = () => {
    localStorage.removeItem("mcrae_session");
    setUser(null);
  };

  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to={user ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <Login onLogin={setUser} />
        }
      />

      <Route
        path="/register"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <Register />
        }
      />

      <Route
        path="/dashboard"
        element={
          user
            ? <Dashboard user={user} onLogout={logout} />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;