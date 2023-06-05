import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { shipItem, confirmReceived } from './ethereum/logic';

const ContractPage = () => {
  // const { address } = useParams();
  // const [contractInfo, setContractInfo] = useState(null);
  const [msg, setMsg] = useState('');
  // const [prePayValue, setPrePayValue] = useState('');
  // const [shipItemClicked, setShipItemClicked] = useState(false);    0xb6DBb2702F6D7F2c37Dc918CEA53fD8ef8E59A8c
  const [getParams] = useSearchParams();
  const contractAddress = getParams.getAll('contractAddress');
  const state = getParams.getAll('state');
  // const totalPrice = getParams.getAll('totalPrice');
  localStorage.setItem('receiptAddress', contractAddress);


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

  // const handlePrePay = async (e) => {
  //   e.preventDefault();
  //   if (totalPrice) {
  //     await prePay(totalPrice);
  //     // setPrePayValue('');
      
  //   }
  // };

  const handleShipItem = async () => {
    const result = await shipItem();
    await setMsg(result);

  };

  const handleConfirmReceived = async () => {
    const result = await confirmReceived();
    setMsg(result);
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

      {/* {state === 0 && (
        <form onSubmit={handlePrePay}>
          <label>
            Pre-Pay Amount: {totalPrice}
          </label>
          <button type="submit">Pre-Pay</button>
        </form>
      )} */}

      {state == '1' && (
        <button onClick={handleShipItem}>Ship Item</button>
      )}

      {state == '2' && (
        <button onClick={handleConfirmReceived}>Confirm Received</button>
      )}

      {/* {msg && (
        <p>{msg}</p>
      )} */}
    </div>
  );
};

export default ContractPage;
