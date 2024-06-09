import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register'; 
import { Welcome } from './pages/Welcome';
import { About } from './pages/About';
import { Home } from './pages/Home';
import Teams  from './pages/Teams';
import {Note} from './pages/Note';
import CreateTeam from './pages/CreateTeam';
import { CreateTeamPage } from './pages/CreateTeamPage';
import { TeamDetails } from './pages/TeamDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create_team" element={<CreateTeamPage />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team/:teamId/notes" element={<Note />} />
        <Route path="/team/:teamId" element={<TeamDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
