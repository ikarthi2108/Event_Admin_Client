import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import WeddingVenueForm from './components/WeddingVenueForm';
import WeddingVenueList from './components/WeddingVenueList';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/add-venue" element={<WeddingVenueForm />} />
          <Route path="/admin/venues/" element={<WeddingVenueList/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;