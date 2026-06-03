import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, RequireAuth } from "./lib/auth.jsx";

import "./styles.css";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Rooms from "./pages/Rooms.jsx";
import Reservations from "./pages/Reservations.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import Guests from "./pages/Guests.jsx";
import Housekeeping from "./pages/Housekeeping.jsx";
import Billing from "./pages/Billing.jsx";
import Reports from "./pages/Reports.jsx";
import Staff from "./pages/Staff.jsx";
import Feedback from "./pages/Feedback.jsx";
import Settings from "./pages/Settings.jsx";

const protect = (element) => (
  <RequireAuth>
    {element}
  </RequireAuth>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={protect(<Dashboard />)} />
          <Route path="/rooms" element={protect(<Rooms />)} />
          <Route path="/reservations" element={protect(<Reservations />)} />
          <Route path="/checkin" element={protect(<CheckIn />)} />
          <Route path="/guests" element={protect(<Guests />)} />
          <Route path="/housekeeping" element={protect(<Housekeeping />)} />
          <Route path="/billing" element={protect(<Billing />)} />
          <Route path="/reports" element={protect(<Reports />)} />
          <Route path="/staff" element={protect(<Staff />)} />
          <Route path="/feedback" element={protect(<Feedback />)} />
          <Route path="/settings" element={protect(<Settings />)} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);