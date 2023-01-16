import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navigation from "./components/Navigation/Navigation";
import { AuthContext } from "./context/UserContext";
import { useState, useCallback } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login,
        logout,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <Routes>{routes}</Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
