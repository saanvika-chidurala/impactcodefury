import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Classification from "./pages/Classification";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Classification */}
        <Route path="/classification" element={<Classification />} />

        {/* Main application */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Anything unknown */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;