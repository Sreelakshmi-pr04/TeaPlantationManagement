import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./login";
import Signup from "./signUp";
import Dashboard from "./dashboard";

import HomePage from "./HomePage";

import WorkersPage from "./workers/workersPage";

import SectionsPage from "./sections/sectionsPage";

import AttendancePage from "./attendance/attendancePage";

import PayrollPage from "./payroll/payrollPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Auth */}
       <Route
  path="/"
  element={<HomePage />}
/>

<Route
  path="/login"
  element={<Login />}
/>

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Workers */}
        <Route
          path="/workers"
          element={<WorkersPage />}
        />

        {/* Estate Sections */}
        <Route
          path="/sections"
          element={<SectionsPage />}
        />

        <Route
  path="/attendance"
  element={<AttendancePage />}
/>

<Route
  path="/payroll"
  element={<PayrollPage />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;