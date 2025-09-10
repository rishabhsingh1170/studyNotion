import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/common/NavBar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";

function App() {
  return (
    <div className="w-screen min-h-screen bg-slate-950 flex flex-col items-center">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="update-password/:id" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
