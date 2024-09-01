import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './auth'; // Assuming you have an auth hook or context

function App() {
  const { isAuthenticated } = useAuth(); // Authentication state is checked here

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Protected Route with passed isAuthenticated prop */}
        <Route 
          path="/profile/*" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes within Profile */}
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        
        {/* Dynamic Routing Example */}
        <Route path="/blog/:id" element={<BlogPost />} />
        
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
