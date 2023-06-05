import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { deploy } from './ethereum/deploy';
import axios from 'axios';

const DeployPage = () => {
  // const [setContractAddress] = useState('');

  const [getParams] = useSearchParams();
  const buyerID = getParams.getAll('buyerID');
  const buyerAddress = getParams.getAll('buyerAddress');
  const storeID = getParams.getAll('storeID');
  const serverID = getParams.getAll('serverID');
  const totalPrice = getParams.getAll('totalPrice');

  const handleDeploy = async (e) => {
    e.preventDefault(); 

    const address = await deploy("totalPrice");
    // setContractAddress(address);

    if (address) {
      const data = {
        buyerID: buyerID,
        buyerAddress: buyerAddress,
        smartContractAddress: address,
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

  return (
    <div>
      <h1>Deploy Page</h1>
      <form onSubmit={handleDeploy}>
        <label>
          Total Price : {totalPrice} ETH
        </label>
        <p><button type="submit">Deploy Contract</button></p>
      </form>

      {/* {contractAddress && (
        <div>
          <p>Contract deployed at address: {contractAddress}</p>
          <button onClick={() => navigate(`/contract/${contractAddress}`)}>Go to Contract Page</button>
        </div>
      )} */}
    </div>
  );
};

export default DeployPage;
