import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DeployPage from './deployPage';
import ContractPage from './contractPage';

const App = () => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={DeployPage} />
        <Route path="/contractPage/:address" component={ContractPage} />
      </div>
    </Router>
  );
};

export default App;
