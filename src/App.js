import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeployPage from './deployPage';
import ContractPage from './contractPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeployPage />} />
        <Route path="/contract/:address" element={<ContractPage />} />
      </Routes>
    </Router>
  );
};

export default App;