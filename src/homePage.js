import React from 'react';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  // const navigate = useNavigate();
  // const [isConnected, setIsConnected] = useState(false);

  // const handleConnect = () => {
  //   // 呼叫 MetaMask 存取連線的函式
  //   if (typeof window.ethereum !== 'undefined') {
  //     window.ethereum.enable()
  //       .then(() => {
  //         // 連線成功後的處理
  //         console.log('MetaMask connection access granted');
  //         setIsConnected(true); // 設置存取狀態為 true
  //       })
  //       .catch((error) => {
  //         // 連線失敗或使用者拒絕的處理
  //         console.error('MetaMask connection access denied', error);
  //       });
  //   } else {
  //     console.error('MetaMask is not installed');
  //   }
  // };
  
  // const handleNavigate = () => {
  //   navigate(`/deploy`);
  // };


  return (
    <div>
      <h1>Please agree to MetaMask connection access account.</h1>
      <h1>You can close the web page directly after connecting.</h1>
      {/* <h1>If you want to purchase products, please agree to MetaMask connection access account. </h1>
      <button onClick={handleConnect}>Connect to MetaMask</button>
      <h1>If the connection is successful, you will see "Go to Deploy Page", a button that takes you to the product settings.</h1>
      {isConnected && (
        <button onClick={handleNavigate}>Go to Deploy Page</button>
      )} */}

    </div>
  );
};

export default HomePage;