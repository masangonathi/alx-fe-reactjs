import React from 'react';
import { Outlet } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <Outlet /> {/* This renders nested routes */}
    </div>
  );
}

export default Profile;
