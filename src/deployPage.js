import React, { useState }from 'react';
import { useSearchParams } from 'react-router-dom';
import { deploy } from './ethereum/deploy';
import { web3 } from './ethereum/web3';
import axios from 'axios';

const DeployPage = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [getParams] = useSearchParams();
  const buyerID = getParams.getAll('buyerID');
  const buyerAddress = getParams.getAll('buyerAddress');
  const sellerWalletAddress = getParams.getAll('sellerWalletAddress');
  const storeID = getParams.getAll('storeID');
  const serverID = getParams.getAll('serverID');
  const totalPrice = getParams.getAll('totalPrice');

  const handleDeploy = async (e) => {
    e.preventDefault(); 

    const address = await deploy(sellerWalletAddress, totalPrice);
    setContractAddress(address);

    // if (address) {
    // const data = {
    //   buyerID: buyerID[0],
    //   buyerAddress: buyerAddress[0],
    //   smartContractAddress: address,
    //   storeID: storeID[0],
    //   serverID: serverID[0]
    // }
      // try {
      //     const msg = await axios.post('https://220.134.59.172:7226/OrderQuery/OrderSave', data, {
      //       headers: {
      //         "Access-Control-Allow-Origin": "*"
      //       }
      //     });
      //     console.log(msg);
      //     // 在這裡可以添加一些處理成功傳送的邏輯或響應給用戶的訊息
      // } catch (error) {
      //   console.error('無法傳送訂單資料到後端：', error);
      //   // 在這裡可以添加一些處理錯誤的邏輯或響應給用戶的訊息
      // }
    // }

  };

  return (
    <div>
      <h1>Deploy Page</h1>
      <form onSubmit={handleDeploy}>
        <label>
          Total Price : {totalPrice} ETH
        </label>
        <p><button type="submit">Deploy Contract</button></p>
        <h3>Url: https://220.134.59.172:7226/OrderQuery/OrderSave</h3>
        <p>buyerID: {buyerID[0]}</p>
        <p>buyerAddress: {buyerAddress[0]}</p>
        {/* <p>smartContractAddress: {address}</p> */}
        <p>storeID: {storeID[0]}</p>
        <p>serverID: {serverID[0]}</p>
      </form>

      {/* <p>seller address: {totalPrice}</p> */}

      {contractAddress && (
        <div>
          <p>smartContractAddress: {contractAddress}</p>
          {/* <button onClick={() => navigate(`/contract/${contractAddress}`)}>Go to Contract Page</button> */}
        </div>
      )}
    </div>
  );
};

export default DeployPage;
