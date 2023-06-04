const { web3 } = require("./web3");
const compileContract = require("../contract/ptTrans.json");

const getContractObject = () => {
    // 從 Local Storage 中获取收据地址
    const receiptAddress = localStorage.getItem('receiptAddress');
  
    // 如果没有收据地址，则返回 null 或者进行错误处理
    if (!receiptAddress) {
        console.error('Receipt address not found in local storage.');
        return null;
    }
  
    // 建立智能合约物件/实例
    const contractObject = new web3.eth.Contract(
        compileContract.abi,
        receiptAddress
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
  
  const getContractInfo = async () => {
    const info = {
      payee: await payee(),
      payer: await payer(),
      amount: await amount(),
      deadline: await deadline(),
      status: await checkContractStatus()
    };
    return info;
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
    confirmReceived,
    getContractInfo
  };
  
