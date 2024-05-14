import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout.jsx";

import CreateRoom from "./pages/Room.jsx";
import ValidateUser from "./pages/ValidateUser.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Login from "./pages/Login.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import RoomList from "./pages/RoomList.jsx";
import ViewRoom from "./pages/ViewRoom.jsx";
import EditRoom from "./pages/EditRoom.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import UserSettings from "./pages/UserSettings.jsx";
import Help from "./pages/Help.jsx";
import CreateIncident from "./pages/CreateIncident.jsx";
import ViewIncident from "./pages/ViewIncident.jsx";

import AdminPanel from "./pages/AdminPanel.jsx";
import AdminIncidentList from "./pages/admin/IncidentList.jsx";
import AdminRoomList from "./pages/admin/RoomList.jsx";
import Room from "./pages/admin/rooms/Room.jsx";

import Protected from "./components/Protected.jsx";
import Admin from "./components/Admin.jsx";

const ProtectedProfile = Protected(Profile);
const ProtectedEditProfile = Protected(EditProfile);
const ProtectedHelp = Protected(Help);
const ProtectedUserSettings = Protected(UserSettings);
const ProtectedCreateIncident = Protected(CreateIncident);
const ProtectedViewIncident = Protected(ViewIncident);

const AdminAdminPanel = Admin(AdminPanel);
const AdminCreateRoom = Admin(CreateRoom);
//const AdminRoomList = Admin(RoomList);
const AdminEditRoom = Admin(EditRoom);
const AdminIncidents = Admin(AdminIncidentList);
const AdminRooms = Admin(AdminRoomList);
const AdminRoom = Admin(Room);


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/validate" element={<Layout><ValidateUser /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
          <Route path="/change-password" element={<Layout><ChangePassword /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/create-room" element={<Layout><AdminCreateRoom /></Layout>} />
          <Route path="/room-list" element={<Layout><AdminRoomList /></Layout>} />
          <Route path="/room/:id" element={<Layout><ViewRoom /></Layout>} />
          <Route path="/edit-room/:id" element={<Layout><AdminEditRoom /></Layout>} />
          <Route path="/profile" element={<Layout><ProtectedProfile /></Layout>} />
          <Route path="/edit-profile" element={<Layout><ProtectedEditProfile /></Layout>} />
          <Route path="/user-settings" element={<Layout><ProtectedUserSettings /></Layout>} />
          <Route path="/help" element={<Layout><ProtectedHelp /></Layout>} />
          <Route path="/create-incident" element={<Layout><ProtectedCreateIncident /></Layout>} />
          <Route path="/incident/:id" element={<Layout><ProtectedViewIncident /></Layout>} />

          <Route path="/admin" element={<Layout><AdminAdminPanel /></Layout>} />
          <Route path="/admin/incidents" element={<Layout><AdminIncidents /></Layout>} />
          <Route path="/admin/rooms" element={<Layout><AdminRooms /></Layout>} />
          <Route path="/admin/room/:id" element={<Layout><AdminRoom /></Layout>} />
          
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" theme="colored" autoClose={4500} />
    </>
  );
};

export default App;