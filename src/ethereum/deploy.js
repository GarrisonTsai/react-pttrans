const { web3 } = require("./web3");
const compiledContract = require("../contract/ptTrans.json");

const deploy = async (sellerWalletAddress, totalPrice) => {
  try {
    // 建立 Web3 連接
    // const web3 = new Web3(window.ethereum);
    
    // 取得帳戶
    const accounts = await web3.eth.getAccounts();
    console.log(`嘗試使用帳戶進行部署，帳戶：${accounts[0]}`);
    const realPrice = String(totalPrice);
    // const address = web3.utils.toChecksumAddress(sellerWalletAddress);
    /**
     * 部署合約需要使用合約介面和合約的 bytecode
     * 我們從編譯的智能合約中獲取這兩個資訊
     * 編譯後的智能合約以 JSON 格式保存在 contract 資料夾中arguments: [sellerWalletAddress]
     */
    const result = await new web3.eth.Contract(
      compiledContract.abi
    )
      .deploy({ data: "0x" + compiledContract.data.bytecode.object, arguments: [`${sellerWalletAddress}`]})
      .send({ value: web3.utils.toWei(realPrice, 'ether'), gas: 3000000, from: accounts[0] });
    console.log(`合約已部署至地址：${result.options.address}`);

    // 將收據地址儲存到瀏覽器的 Local Storage
    localStorage.setItem('receiptAddress', result.options.address);
    return result.options.address;

  } catch (error) {
    console.error(error);
    return error;
  }
};

const updateAddress = async (address) => {
  try {
    localStorage.setItem('receiptAddress', address);
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  deploy,
  updateAddress
};
