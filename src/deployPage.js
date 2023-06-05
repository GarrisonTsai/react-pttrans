import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deploy, updateAddress } from './ethereum/deploy';
import axios from 'axios';

const { web3 } = require("./ethereum/web3");

const DeployPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  // const [oldAddress, setOldAddress] = useState('');

  const handleDeploy = async (e) => {
    e.preventDefault();

    const address = await deploy(amount);
    const accounts = await web3.eth.getAccounts();
    setContractAddress(address);
    console.log("address",address)
    // navigate(`/contract/${address}`);

    if (contractAddress) {
      const data = {
        buyerID: buyerID,
        buyerAddress: buyerAddress,
        smartContractAddress: smartContractAddress,
        storeID: storeID,
        serverID: serverID
      }
    try {
        const msg = await axios.post('http://localhost:5193/OrderQuery/OrderSave', data);
        console.log(msg);
        // 在這裡可以添加一些處理成功傳送的邏輯或響應給用戶的訊息
      } catch (error) {
        console.error('無法傳送訂單資料到後端：', error);
        // 在這裡可以添加一些處理錯誤的邏輯或響應給用戶的訊息
      }
    }

  };

  // const handleNavigate = async () => {
  //   console.log("address",oldAddress)
  //   await updateAddress(oldAddress);
  //   navigate(`/contract/${oldAddress}`);
  // };

  // 從 Local Storage 取回收據地址
  // const storedAddress = localStorage.getItem('receiptAddress');

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

      {contractAddress && (
        <div>
          <p>Contract deployed at address: {contractAddress}</p>
          <button onClick={() => navigate(`/contract/${contractAddress}`)}>Go to Contract Page</button>
        </div>
      )}

      {/* <form onSubmit={handleNavigate}>
        <label>
          Existing Contract Address:
          <input type="text" value={oldAddress} onChange={(e) => setOldAddress(e.target.value)} />
        </label>
        <button type="submit" disabled={oldAddress === null || oldAddress === ''}>Go to Contract Page</button>
      </form>

      {oldAddress && (
        <div>
          <p>Search contract deployed at address: {oldAddress}</p>
        </div>
      )} */}
    </div>
  );
};

export default DeployPage;
