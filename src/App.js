import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './homePage';
import DeployPage from './deployPage';
import ContractPage from './contractPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/deploy" element={<DeployPage />} />
        <Route path="/contract/:address" element={<ContractPage />} />
      </Routes>
    </Router>
  );
};

export default App;