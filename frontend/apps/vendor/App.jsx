App.jsx


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginForm from './pages/LoginForm';
import HomePage from './pages/HomePage'; // ✅ Missing from your current file
import GroupBuysPage from './pages/GroupBuysPage';
import IndividualOrdersPage from './pages/IndividualOrdersPage';
import MyOrdersPage from './pages/MyOrdersPage';
import VendorProfilePage from './pages/VendorProfilePage';
import SearchPage from './pages/SearchPage';
import RecommendationPage from './pages/RecommendationPage';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

// function ProtectedRoute({ children }) {
//   return children; // 🔓 disables login check for testing
// }


function App() {
  console.log(localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginForm />} />

          {/* ✅ Add Home page route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/group-buys"
            element={
              <ProtectedRoute>
                <GroupBuysPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/individual-orders"
            element={
              <ProtectedRoute>
                <IndividualOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <VendorProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <RecommendationPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
