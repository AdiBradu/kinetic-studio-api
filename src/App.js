import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Defaults/Navbar/Navbar.component.jsx';
import Dashboard from './components/Admin/Pages/Dashboard/Dashboard.component.jsx';
import Logout from './components/Admin/Pages/Logout/Logout.component';
import { documentHeight } from './utils.js';
import Login from './components/Defaults/LogIn/Login.component';

documentHeight();

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard/specializari" element={<Dashboard />} />
        <Route path="/dashboard/specializari/:id" element={<Dashboard />} />
        <Route path="/dashboard/specializari/adauga" element={<Dashboard />} />
        <Route
          path="/dashboard/specializari/editeaza"
          element={<Dashboard />}
        />

        <Route path="/dashboard/zone" element={<Dashboard />} />
        <Route path="/dashboard/zone/:id" element={<Dashboard />} />
        <Route path="/dashboard/zone/adauga" element={<Dashboard />} />
        <Route path="/dashboard/zone/editeaza" element={<Dashboard />} />

        <Route path="/dashboard/servicii" element={<Dashboard />} />
        <Route path="/dashboard/servicii/:id" element={<Dashboard />} />
        <Route path="/dashboard/servicii/adauga" element={<Dashboard />} />
        <Route path="/dashboard/servicii/editeaza" element={<Dashboard />} />

        <Route path="/dashboard/terapeuti" element={<Dashboard />} />
        <Route path="/dashboard/terapeuti/:id" element={<Dashboard />} />
        <Route path="/dashboard/terapeuti/adauga" element={<Dashboard />} />
        <Route path="/dashboard/terapeuti/editeaza" element={<Dashboard />} />

        <Route path="/dashboard/comenzi" element={<Dashboard />} />
        <Route path="/dashboard/comenzi/:id" element={<Dashboard />} />
        <Route path="/dashboard/comenzi/adauga" element={<Dashboard />} />
        <Route path="/dashboard/comenzi/editeaza" element={<Dashboard />} />

        <Route path="/dashboard/emails" element={<Dashboard />} />
        <Route path="/dashboard/emails/:id" element={<Dashboard />} />

        <Route path="/dashboard/admin" element={<Dashboard />} />
        <Route path="/dashboard/admin/:id" element={<Dashboard />} />

        <Route path="/dashboard/programare" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
