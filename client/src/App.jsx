import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import Notification from "./components/utils/Notification";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Notification />
    </div>
  );
};

export default App;
