import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import { CreateRoom } from '../pages/Room';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<CreateRoom />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;