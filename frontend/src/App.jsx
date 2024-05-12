import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreateRoom from "./pages/Room.jsx";
import ValidateUser from "./pages/ValidateUser.jsx";
import Home from "./pages/Home.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Mobile from "./components/Mobile.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import RoomList from "./pages/RoomList.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import AddAvatar from "./pages/AddAvatar.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Protected from "./components/Protected.jsx";
import Admin from "./components/Admin.jsx";

const ProtectedProfile = Protected(Profile);
const ProtectedAddAvatar = Protected(AddAvatar);
const ProtectedUpdateProfile = Protected(UpdateProfile);
const AdminCreateRoom = Admin(CreateRoom);
const AdminRoomList = Admin(RoomList);

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Mobile><Home /></Mobile>} />
          <Route path="/register" element={<Mobile><Register /></Mobile>} />
          <Route path="/login" element={<Mobile><Login /></Mobile>} />
          <Route path="/validate" element={<Mobile><ValidateUser /></Mobile>} />
          <Route path="/reset-password" element={<Mobile><ResetPassword /></Mobile>} />
          <Route path="/change-password" element={<Mobile><ChangePassword /></Mobile>} />
          <Route path="/forgot-password" element={<Mobile><ForgotPassword /></Mobile>} />
          <Route path="/create-room" element={<Mobile><AdminCreateRoom /></Mobile>} />
          <Route path="/room-list" element={<Mobile><AdminRoomList /></Mobile>} />
          <Route path="/profile" element={<Mobile><ProtectedProfile /></Mobile>} />
          <Route path="/add-avatar" element={<Mobile><ProtectedAddAvatar /></Mobile>} />
          <Route path="/update-profile" element={<Mobile><ProtectedUpdateProfile /></Mobile>} />
          <Route path="*" element={<Mobile><NotFound /></Mobile>} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" theme="colored" autoClose={4500} />
    </>
  );
};

export default App;