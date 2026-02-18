import React, { useState } from 'react';
import './App.css';
import UserManagement from './components/UserManagement';
import ResourceManagement from './components/ResourceManagement';
import BookingManagement from './components/BookingManagement';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎓 Campus Resource Management System</h1>
      </header>
      
      <nav className="nav-tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={activeTab === 'resources' ? 'active' : ''} 
          onClick={() => setActiveTab('resources')}
        >
          🏢 Resources
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''} 
          onClick={() => setActiveTab('bookings')}
        >
          📅 Bookings
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'resources' && <ResourceManagement />}
        {activeTab === 'bookings' && <BookingManagement />}
      </main>
    </div>
  );
}

export default App;
