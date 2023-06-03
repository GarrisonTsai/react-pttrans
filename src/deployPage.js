import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deployContract } from './ethereum/deploy';

const DeployPage = () => {
  const history = useNavigate();
  const [amount, setAmount] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  const handleDeploy = async (e) => {
    e.preventDefault();
    const address = await deployContract(amount);
    setContractAddress(address);
    history.push(`/contract/${contractAddress}`);
  };

  const handleNavigate = () => {
    history.push(`/contract/${contractAddress}`);
  };

  return (
    <div>
      <h1>Deploy Page</h1>
      <form onSubmit={handleDeploy}>
        <label>
          Amount:
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit">Deploy Contract</button>
      </form>

      {contractAddress && (
        <div>
          <p>Contract deployed at address: {contractAddress}</p>
          <button onClick={handleNavigate}>Go to Contract Page</button>
        </div>
      )}

      <form onSubmit={handleNavigate}>
        <label>
          Existing Contract Address:
          <input type="text" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
        </label>
        <button type="submit">Go to Contract Page</button>
      </form>
    </div>
  );
};

export default DeployPage;
