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

import CreateReservation from "./pages/reservations/CreateReservation.jsx";
import ReviewsContainer from './routes/ReviewsContainer'

import CreateReview from "@/pages/CreateReview.jsx";
import EditReview from "@/pages/EditReview.jsx";
import ViewReview from "@/pages/ViewReview.jsx";

import AdminReviewList from "./pages/admin/ReviewList.jsx";

import { EquipmentList } from "./pages/EquipmentList.jsx";
import { AddEquipment } from "./pages/AddEquipment.jsx";
import { EquipmentItem } from "./pages/EquipmentItem.jsx";
import { UsersListAdmin } from "./pages/UsersListAdmin.jsx";
import { UserAdmin } from "./pages/UserAdmin.jsx";

import AdminReservationList from "./pages/admin/ReservationList.jsx";

import ViewReservation from "./pages/reservations/Reservation.jsx";
import MyReservations from "./pages/reservations/MyReservations.jsx";

import AdminPanel from "./pages/AdminPanel.jsx";
import AdminIncidentList from "./pages/admin/IncidentList.jsx";
import Room from "./pages/admin/rooms/Room.jsx";

import Protected from "./components/Protected.jsx";
import Admin from "./components/Admin.jsx";
import AdminRoomList from "./pages/admin/RoomList.jsx";

const ProtectedProfile = Protected(Profile);
const ProtectedEditProfile = Protected(EditProfile);
const ProtectedHelp = Protected(Help);
const ProtectedUserSettings = Protected(UserSettings);
const ProtectedCreateIncident = Protected(CreateIncident);
const ProtectedViewIncident = Protected(ViewIncident);
const ProtectedCreateReservation = Protected(CreateReservation);
const ProtectedViewReservation = Protected(ViewReservation);
const ProtectedMyReservations = Protected(MyReservations);

const AdminAdminPanel = Admin(AdminPanel);
const AdminCreateRoom = Admin(CreateRoom);
const AdminEditRoom = Admin(EditRoom);
const AdminIncidents = Admin(AdminIncidentList);
const AdminRoom = Admin(Room);
const AdminReviews = Admin(AdminReviewList);
const AdminReservations = Admin(AdminReservationList);

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Layout><Home /></Layout>} /> {/* cover antes de iniciar sesion*/}


          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/validate" element={<Layout><ValidateUser /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
          <Route path="/change-password" element={<Layout><ChangePassword /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />

          <Route path="/profile" element={<Layout><ProtectedProfile /></Layout>} />
          <Route path="/edit-profile" element={<Layout><ProtectedEditProfile /></Layout>} />
          {/* <Route path="/user-settings" element={<Layout><ProtectedUserSettings /></Layout>} /> */}
          <Route path="/help" element={<Layout><ProtectedHelp /></Layout>} />
          <Route path="/reservations" element={<Layout><ProtectedMyReservations /></Layout>} />
          <Route path="/reservation/:id/create-incident" element={<Layout><ProtectedCreateIncident /></Layout>} />
          <Route path="/incident/:id" element={<Layout><ProtectedViewIncident /></Layout>} />

          {/* <Route path="/review/*" element={<Layout><ReviewsContainer/></Layout>} /> contenedor de rutas anidadas reviews */}

          <Route path="/review/:reviewId" element={<Layout><ViewReview/></Layout>} />
          <Route path="/reservation/:reservationId/review" element={<Layout><CreateReview /></Layout>} />
          <Route path="/review/:reviewId/edit" element={<Layout><EditReview/></Layout>} />

         <Route path="/create-reservation" element={<Layout><ProtectedCreateReservation /></Layout>} />
         <Route path="/room/:id/reserve" element={<Layout><ProtectedCreateReservation /></Layout>} />

          <Route path="/reservation/:id" element={<Layout><ProtectedViewReservation /></Layout>} />


          <Route path="/admin/equipment" element={<Layout><EquipmentList /></Layout>}/>
          <Route path="/admin/equipment/add" element={<Layout><AddEquipment /></Layout>}/>
          <Route path="/admin/equipment/:id" element={<Layout><EquipmentItem /></Layout>}/>

          <Route path="/admin/users" element={<Layout><UsersListAdmin /></Layout>}/>
          <Route path="/admin/users/:id" element={<Layout><UserAdmin /></Layout>}/>

          <Route path="/create-room" element={<Layout><AdminCreateRoom /></Layout>} />
          {/* <Route path="/room-list" element={<Layout><AdminRoomList /></Layout>} /> */}
          <Route path="/room/:id" element={<Layout><ViewRoom /></Layout>} />


          <Route path="/admin" element={<Layout><AdminAdminPanel /></Layout>} />
          <Route path="/admin/incidents" element={<Layout><AdminIncidentList /></Layout>} />

          <Route path="/admin/rooms" element={<Layout><AdminRoomList/></Layout>} />
          <Route path="/admin/room/:id" element={<Layout><AdminRoom /></Layout>} />
          <Route path="/admin/room/:id/edit" element={<Layout><AdminEditRoom /></Layout>} />

          <Route path="/admin/reviews" element={<Layout><AdminReviews /></Layout>} />

          <Route path="/admin/reservations" element={<Layout><AdminReservations /></Layout>} />
          
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={4500} />
    </>
  );
};

export default App;