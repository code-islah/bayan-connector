import { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectLoginRoute from "./utils/ProtectLoginRoute.jsx";
import API from "./API/axios.js";
import { UserProvider } from "./context/UserContext.jsx";

//components
import Navbar from "./components/Navbar.jsx";

//pages
import Home from "./pages/Home.jsx";
import Friends from "./pages/Friends.jsx";
import Conversations from "./pages/Conversations.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <Fragment>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/settings"
              element={
                <ProtectLoginRoute>
                  <Settings />
                </ProtectLoginRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Fragment>
  );
}

export default App;
