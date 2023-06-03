const Web3 = require("web3");

// 檢查 MetaMask 是否已安裝
if (typeof window.ethereum !== 'undefined') {
  // 使用 MetaMask 提供的 provider
  const web3Provider = window.ethereum;

  // 啟用 MetaMask 提供者
  try {
    window.ethereum.enable();
  } catch (error) {
    // 使用者拒絕了連接
    console.error("User denied account access");
  }

  // 建立 Web3 實例
  const web3 = new Web3(web3Provider);

  module.exports = {
    web3
  };
} else {
  console.error("MetaMask is not installed");
}