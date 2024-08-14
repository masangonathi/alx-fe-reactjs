import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from "./components/WelcomeMessage";
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import React from 'react';
import UserProfile from './components/UserProfile';
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';



function App() {
  const [count, setCount] = useState(0)
  const userData = { name: "Jane Doe", email: "jane.doe@example.com"}

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
      <WelcomeMessage />
      </div>
      <div>
      <Header />
      </div>
      <div>
      <MainContent />
      </div>
      <div>
      <Footer />
      </div>
      <div>
            <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      </div>
      <ProfilePage userData={userData} />
      <UserContext.Provider value={userData}>
        <ProfilePage />
        </UserContext.Provider>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
