import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContractInfo, checkContractStatus, prePay, shipItem, confirmReceived } from './ethereum/logic';
import axios from 'axios';

const ContractPage = () => {
  const { address } = useParams();
  const [contractInfo, setContractInfo] = useState(null);
  const [status, setStatus] = useState([]);
  const [prePayValue, setPrePayValue] = useState('');
  const [shipItemClicked, setShipItemClicked] = useState(false);

  useEffect(() => {
    const fetchContractInfo = async () => {
      const info = await getContractInfo(address);
      setContractInfo(info);
    };

    const fetchContractStatus = async () => {
      const contractStatus = await checkContractStatus(address);
      setStatus(contractStatus);
    };

    fetchContractInfo();
    fetchContractStatus();

  }, [address, shipItemClicked]);

  const handleRefresh = async () => {
    const contractStatus = await checkContractStatus(address);
    setStatus(contractStatus);
  };

  const handlePrePay = async (e) => {
    e.preventDefault();
    if (prePayValue) {
      await prePay(prePayValue);
      setPrePayValue('');
      
      const data = {
        contractAddress: address,
        amount: contractInfo.amount,
        payer: contractInfo.payer,
        payee: contractInfo.payee,
        deadline: contractInfo.deadline,
        amountPaid: status[0],
        productShipped: status[1],
        productReceived: status[2]
      };

      try {
        await axios.post('http://220.134.59.172:3000/orders', data);
        console.log('資料已成功傳送到後端');
        // 在這裡可以添加一些處理成功傳送的邏輯或響應給用戶的訊息
      } catch (error) {
        console.error('無法傳送資料到後端：', error);
        // 在這裡可以添加一些處理錯誤的邏輯或響應給用戶的訊息
      }
    }
  };

  const handleShipItem = async () => {
    await shipItem();
    setShipItemClicked(true);

    // 將資料傳送回資料庫
    const data = {
      contractAddress: address,
      payer: contractInfo.payer,
      payee: contractInfo.payee,
      deadline: contractInfo.deadline,
      productShipped: status[1],
    };

    try {
      await axios.post('http://220.134.59.172:3000/orders', data);
      console.log('資料已成功傳送到後端');
      // 在這裡可以添加一些處理成功傳送的邏輯或響應給用戶的訊息
    } catch (error) {
      console.error('無法傳送資料到後端：', error);
      // 在這裡可以添加一些處理錯誤的邏輯或響應給用戶的訊息
    }

  };

  const handleConfirmReceived = async () => {
    await confirmReceived();
    setShipItemClicked(true);

    // 將資料傳送回資料庫
    const updateShipItem = {
      contractAddress: address,
      payer: contractInfo.payer,
      payee: contractInfo.payee,
      deadline: contractInfo.deadline,
      productReceived: status[2]
    };

    try {
      await axios.post('http://220.134.59.172:3000/orders', updateShipItem);
      console.log('資料已成功傳送到後端');
      // 在這裡可以添加一些處理成功傳送的邏輯或響應給用戶的訊息
    } catch (error) {
      console.error('無法傳送資料到後端：', error);
      // 在這裡可以添加一些處理錯誤的邏輯或響應給用戶的訊息
    }

  };

  if (!contractInfo) {
    return <div>Loading contract info...</div>;
  }

  return (
    <div>
      <h1>Contract Page</h1>
      <h2>Contract Address: {address}</h2>
      <p>Amount: {contractInfo.amount}</p>
      <p>Payer: {contractInfo.payer}</p>
      <p>Payee: {contractInfo.payee}</p>
      <p>Deadline: {contractInfo.deadline}</p>
      <p>Contract Status:</p>
      <ul>
        <li>Amount Paid: {status[0].toString()}</li>
        <li>Product Shipped: {status[1].toString()}</li>
        <li>Product Received: {status[2].toString()}</li>
      </ul>
      <button onClick={handleRefresh}>Refresh</button>

      {status[0] === false && (
        <form onSubmit={handlePrePay}>
          <label>
            Pre-Pay Amount:
            <input type="number" step="0.01" value={prePayValue} onChange={(e) => setPrePayValue(e.target.value)} />
          </label>
          <button type="submit">Pre-Pay</button>
        </form>
      )}

      {status[0] === true && status[1] === false && (
        <button onClick={handleShipItem}>Ship Item</button>
      )}

      {status[0] === true && status[1] === true && status[2] === false && (
        <button onClick={handleConfirmReceived}>Confirm Received</button>
      )}
    </div>
  );
};

export default ContractPage;
