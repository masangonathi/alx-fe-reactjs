import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import { useAuth } from './auth';  // Assuming you have an auth hook or context

function ProtectedRoute({ element: Component, ...rest }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Basic Route */}
        <Route path="/" element={<Home />} />
        
        {/* Protected Route Example */}
        <Route 
          path="/profile/*" 
          element={<ProtectedRoute element={Profile} />}
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
