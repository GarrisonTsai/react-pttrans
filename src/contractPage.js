import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getContractInfo, checkContractStatus, prePay, shipItem, confirmReceived } from './ethereum/logic';
import axios from 'axios';

const ContractPage = () => {
  // const { address } = useParams();
  const [contractInfo, setContractInfo] = useState(null);
  const [status, setStatus] = useState([]);
  const [prePayValue, setPrePayValue] = useState('');
  const [shipItemClicked, setShipItemClicked] = useState(false);
  const [getParams] = useSearchParams();
  const contractAddress = getParams.getAll('contractAddress')
  const state = getParams.getAll('state')

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
    if (prePayValue) {
      await prePay(prePayValue);
      setPrePayValue('');
      
    }
  };

  const handleShipItem = async () => {
    await shipItem();
    setShipItemClicked(true);

  };

  const handleConfirmReceived = async () => {
    await confirmReceived();
    setShipItemClicked(true);

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
            Pre-Pay Amount:
            <input type="number" step="0.01" value={prePayValue} onChange={(e) => setPrePayValue(e.target.value)} />
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
