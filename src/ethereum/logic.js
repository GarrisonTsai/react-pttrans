const { web3 } = require("./web3");
const compileContract = require("../contract/ptTrans.json");

// 取得部署在網路上的智能合約物件 (ganache-cli 或測試網路或主網路)
// 網路可以在 web3 檔案中選擇

const getContractObject = () => {
    const contractReceipt = require("./receipt-metamask.json");
    // 建立智能合約物件/實例
    const contractObject = new web3.eth.Contract(
        compileContract.abi,
        contractReceipt.address
    );

    return contractObject;
};

const payee = async () => {
    const contractObject = getContractObject();
    const result = await contractObject.methods.payee().call();
    return result;
};

const payer = async () => {
    const contractObject = getContractObject();
    const result = await contractObject.methods.payer().call();
    return result;
};

const amount = async () => {
    const contractObject = getContractObject();
    const result = await contractObject.methods.amount().call();
    return result;
};

const deadline = async () => {
    const contractObject = getContractObject();
    const result = await contractObject.methods.deadline().call();
    return result;
};

const checkContractStatus = async () => {
    const contractObject = getContractObject();
    const result = await contractObject.methods.checkContractStatus().call();
    return result;
};

const finishContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const receipt = await contractObject.methods.finishContract().send({ from: accounts[0], gas: 1000000 });
    console.info(receipt);
    console.info("Contract successfully finished!");
    return receipt;
};

const terminateContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const receipt = await contractObject.methods.terminateContract().send({ from: accounts[0], gas: 1000000 });
    console.info(receipt);
    console.info("Contract successfully terminated!");
    return receipt;
};

const prePay = async (value) => {
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const receipt = await contractObject.methods.prePay().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether'),
      gas: 1000000
    });
    console.info(receipt);
    console.info("Pre-payment successful!");
    return receipt;
  };
  
  const shipItem = async () => {
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const receipt = await contractObject.methods.shipItem().send({ from: accounts[0], gas: 1000000 });
    console.info(receipt);
    console.info("Item shipped successfully!");
    return receipt;
  };
  
  const confirmReceived = async () => {
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const receipt = await contractObject.methods.confirmReceived().send({ from: accounts[0], gas: 1000000 });
    console.info(receipt);
    console.info("Item received successfully!");
    return receipt;
  };
  
  module.exports = {
    payee,
    payer,
    amount,
    deadline,
    checkContractStatus,
    finishContract,
    terminateContract,
    prePay,
    shipItem,
    confirmReceived
  };
  
