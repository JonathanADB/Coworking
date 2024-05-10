import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreateRoom from '../pages/Room';
import Mobile from '../components/Mobile';
import RegisterUserForm from '../pages/Register';
import LoginForm from '../pages/Login.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mobile><Home/></Mobile>} />
        <Route path="/create-room" element={<Mobile><CreateRoom /></Mobile>} />
        <Route path="/register" element={<Mobile><RegisterUserForm /></Mobile>} />
        <Route path="/login" element={<Mobile><LoginForm /></Mobile>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
