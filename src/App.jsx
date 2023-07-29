import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home/Home';
import ElecionDetails from './pages/Home/ElectionDetails/ElectionDetails';
import Login from './pages/Login/Login';
import Voters from './pages/Voters/Voters';
import NewElection from './pages/NewElection/NewElection';
import UpdateAdmin from './pages/UpdateAdmin/UpdateAdmin';
import './style.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/voters" element={<Voters />} />
        <Route path="/newelection" element={<NewElection/>} />
        <Route path="/editadmin" element={<UpdateAdmin />} />
        <Route path="/deatils/:id" element={<ElecionDetails/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;