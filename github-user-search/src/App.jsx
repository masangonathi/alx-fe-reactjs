import React from 'react';
import Search from './components/Search';
import './index.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-6">GitHub User Search</h1>
      <Search />
    </div>
  );
}

export default App;
