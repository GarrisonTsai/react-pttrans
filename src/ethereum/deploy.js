const fs = require("fs-extra");
const path = require("path");
const { web3 } = require("./web3");
const compiledContract = require("../contract/ptTrans.json");
const circularJSON = require('circular-json');

const deploy = async (mymessage) => {
    try {
        // 設定收據路徑
        const receiptPath = path.resolve(__dirname, ".", `receipt-metamask.json`);
        console.log(`---------- 收據路徑 ---------- ${receiptPath}`);

        // 使用 accounts[0] 部署合約
        const accounts = await web3.eth.getAccounts();
        console.log(`嘗試使用帳戶進行部署，帳戶：${accounts[0]}`);

        /**
         * 部署合約需要使用合約介面和合約的 bytecode
         * 我們從編譯的智能合約中獲取這兩個資訊
         * 編譯後的智能合約以 JSON 格式保存在 contract 資料夾中
         */
        const result = await new web3.eth.Contract(
            compiledContract.abi
        )
            .deploy({ data: "0x" + compiledContract.data.bytecode.object, arguments: [mymessage] })
            .send({ gas: 3000000, from: accounts[0] });
        console.log(`合約已部署至地址：${result.options.address}`);

        // 使用 CircularJson 將嵌套的物件轉換為字串，以便保存為 JSON
        const serialized = circularJSON.stringify(result.options);

        // 將收據地址保存到收據路徑中
        fs.writeJsonSync(receiptPath, result.options);

        console.log("收據已成功保存");
        return serialized;
    } catch (error) {
        console.error(error);
        return error;
    }
};

module.exports = deploy;
