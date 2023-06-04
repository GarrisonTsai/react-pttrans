import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deploy, updateAddress } from './ethereum/deploy';

const DeployPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  const handleDeploy = async (e) => {
    e.preventDefault();
    const address = await deploy(amount);
    setContractAddress(address);
    console.log("address",address)
    navigate(`/contract/${address}`);
  };

  const handleNavigate = async () => {
    console.log("address",contractAddress)
    await updateAddress(contractAddress);
    navigate(`/contract/${contractAddress}`);
  };

  // 從 Local Storage 取回收據地址
  const storedAddress = localStorage.getItem('receiptAddress');

  return (
    <div>
      <h1>Deploy Page</h1>
      <form onSubmit={handleDeploy}>
        <label>
          Amount:
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button type="submit" disabled={amount === null || amount === ''}>Deploy Contract</button>
      </form>

      {storedAddress && (
        <div>
          <p>Contract deployed at address: {storedAddress}</p>
          <button onClick={() => navigate(`/contract/${storedAddress}`)}>Go to Contract Page</button>
        </div>
      )}

      <form onSubmit={handleNavigate}>
        <label>
          Existing Contract Address:
          <input type="text" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
        </label>
        <button type="submit">Go to Contract Page</button>
      </form>

      {contractAddress && (
        <div>
          <p>Search contract deployed at address: {contractAddress}</p>
          <button onClick={handleNavigate}>Go to Contract Page</button>
        </div>
      )}
    </div>
  );
};

export default DeployPage;
