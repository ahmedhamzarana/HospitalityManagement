import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/housekeeping" element={<Housekeeping />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);