import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getContractInfo, checkContractStatus, prePay, shipItem, confirmReceived } from './ethereum/logic';
import axios from 'axios';

const ContractPage = () => {
  // const { address } = useParams();
  // const [contractInfo, setContractInfo] = useState(null);
  // const [status, setStatus] = useState([]);
  // const [prePayValue, setPrePayValue] = useState('');
  // const [shipItemClicked, setShipItemClicked] = useState(false);
  const [getParams] = useSearchParams();
  const contractAddress = getParams.getAll('contractAddress');
  const state = getParams.getAll('state');
  const totalPrice = getParams.getAll('totalPrice');
  localStorage.setItem('receiptAddress', totalPrice);


  // useEffect(() => {
  //   const fetchContractInfo = async () => {
  //     const info = await getContractInfo(address);
  //     setContractInfo(info);
  //   };

  //   const fetchContractStatus = async () => {
  //     const contractStatus = await checkContractStatus(address);
  //     setStatus(contractStatus);
  //   };

  //   fetchContractInfo();
  //   fetchContractStatus();

  // }, [address, shipItemClicked]);

  // const handleRefresh = async () => {
  //   const contractStatus = await checkContractStatus(address);
  //   setStatus(contractStatus);
  // };

  const handlePrePay = async (e) => {
    e.preventDefault();
    if (totalPrice) {
      await prePay(totalPrice);
      // setPrePayValue('');
      
    }
  };

  const handleShipItem = async () => {
    await shipItem();
    // setShipItemClicked(true);

  };

  const handleConfirmReceived = async () => {
    await confirmReceived();
    // setShipItemClicked(true);

  };

  // if (!contractInfo) {
  //   return <div>Loading contract info...</div>;
  // }

  return (
    <div>
      <h1>Contract Page</h1>
      <h2>Contract Address: {contractAddress}</h2>
      {/* <p>Amount: {contractInfo.amount}</p>
      <p>Payer: {contractInfo.payer}</p>
      <p>Payee: {contractInfo.payee}</p>
      <p>Deadline: {contractInfo.deadline}</p>
      <p>Contract Status:</p>
      <ul>
        <li>Amount Paid: {status[0].toString()}</li>
        <li>Product Shipped: {status[1].toString()}</li>
        <li>Product Received: {status[2].toString()}</li>
      </ul>
      <button onClick={handleRefresh}>Refresh</button> */}

      {state === 0 && (
        <form onSubmit={handlePrePay}>
          <label>
            Pre-Pay Amount: {totalPrice}
          </label>
          <button type="submit">Pre-Pay</button>
        </form>
      )}

      {state === 1 && (
        <button onClick={handleShipItem}>Ship Item</button>
      )}

      {state === 2 && (
        <button onClick={handleConfirmReceived}>Confirm Received</button>
      )}
    </div>
  );
};

export default ContractPage;




// import React, { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// // import { deploy, updateAddress } from './ethereum/deploy';
// import deploy from './ethereum/deploy';
// import axios from 'axios';

// const { web3 } = require("./ethereum/web3");

// const DeployPage = () => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState('');
//   const [contractAddress, setContractAddress] = useState('');
//   // const [oldAddress, setOldAddress] = useState('');

//   const [getParams] = useSearchParams()
//   // const buyerID = getParams.getAll('buyerID')
//   // const buyerAddress = getParams.getAll('buyerAddress')
//   // const storeID = getParams.getAll('storeID')
//   // const serverID = getParams.getAll('serverID')
//   const totalPrice = getParams.getAll('totalPrice')

//   const handleDeploy = async (e) => {
//     e.preventDefault(); 

//     const address = await deploy(totalPrice);
//     const accounts = await web3.eth.getAccounts();
//     setContractAddress(address);
//     console.log("address",address)

//     // if (contractAddress) {
//     //   const data = {
//     //     buyerID: buyerID,
//     //     buyerAddress: buyerAddress,
//     //     smartContractAddress: address,
//     //     storeID: storeID,
//     //     serverID: serverID
//     //   }
//     // try {
//     //     const msg = await axios.post('http://localhost:5193/OrderQuery/OrderSave', data);
//     //     console.log(msg);
//     //     // 在這裡可以添加一些處理成功傳送的邏輯或響應給用戶的訊息
//     //   } catch (error) {
//     //     console.error('無法傳送訂單資料到後端：', error);
//     //     // 在這裡可以添加一些處理錯誤的邏輯或響應給用戶的訊息
//     //   }
//     // }

//   };

//   // const handleNavigate = async () => {
//   //   console.log("address",oldAddress)
//   //   await updateAddress(oldAddress);
//   //   navigate(`/contract/${oldAddress}`);
//   // };

//   // 從 Local Storage 取回收據地址
//   // const storedAddress = localStorage.getItem('receiptAddress');

//   return (
//     <div>
//       <h1>Deploy Page</h1>
      
      
//       <form onSubmit={handleDeploy}>
//         <label>
//           Total Price :  {totalPrice} ETH
//           <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         </label>
//         <button type="submit">Deploy Contract</button>
//       </form>

//       {contractAddress && (
//         <div>
//           <p>Contract deployed at address: {contractAddress}</p>
//           <button onClick={() => navigate(`/contract/${contractAddress}`)}>Go to Contract Page</button>
//         </div>
//       )}

//       {/* <form onSubmit={handleNavigate}>
//         <label>
//           Existing Contract Address:
//           <input type="text" value={oldAddress} onChange={(e) => setOldAddress(e.target.value)} />
//         </label>
//         <button type="submit" disabled={oldAddress === null || oldAddress === ''}>Go to Contract Page</button>
//       </form>

//       {oldAddress && (
//         <div>
//           <p>Search contract deployed at address: {oldAddress}</p>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default DeployPage;
