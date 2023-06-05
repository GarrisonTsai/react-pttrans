// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ptTrans {
    address payable public payer; // 付款人
    address payable public payee; // 收款人
    // uint256 public amount; // 轉帳金額
    bool private isPrepaid; //付款人已經預付
    bool private itemShipped; // 商品是否已出貨
    bool private itemReceived; // 商品是否已收到
    uint256 public deadline; // 合約終止期限

    constructor() {
        payer = payable(address(0)); // 0x000000000
        payee = payable(msg.sender); // 由收款人創建合約
        // amount = _amount;
        isPrepaid = false;
        itemShipped = false;
        itemReceived = false;
        deadline = block.timestamp + 180; // 預設合約終止期限為 3 分鐘
    }

    function prePay() external payable {
        require(!isPrepaid, "Payer has already pre-paid");
        require(payer == address(0), "Payer has already pre-paid");
        // require(msg.sender != payee, "Payee cannot pre-pay");

        payer = payable(msg.sender);
        // require(msg.value >= amount, "Insufficient payment");

        // 設定預付成功
        isPrepaid = true;
    }

    function shipItem() external {
        require(msg.sender == payee, "Only the payee can ship the item");
        require(isPrepaid, "Payer has not pre-paid yet");
        require(!itemShipped, "Item has already been shipped");
        
        // 設定商品已出貨
        itemShipped = true;
    }

    function confirmReceived() external {
        require(msg.sender == payer, "Only the payer can confirm receiving the item");
        require(itemShipped, "Item has not been shipped yet");

        // 設定商品已收到
        itemReceived = true;
    }

    function checkContractStatus() external view returns (bool, bool, bool) {
        return (isPrepaid, itemShipped, itemReceived);
    }

    function GetState() external view returns (string memory) {
        string memory state = "";
        if (itemReceived) {
            state = "Item has been recieved.";
        }
        else if (itemShipped) {
            state = "Item has been shipped.";
        }
        else if (isPrepaid) {
            state = "Already prepaid.";
        }
        else {
            state = "Item hasn't been prepaid yet.";
        }
        return state;
    }

    function terminateContract() external {
        // 確保訂單未出貨且過期
        require(msg.sender == payer || msg.sender == payee, "Who are you?");
        require(block.timestamp >= deadline, "Contract is still active");
        require(!itemShipped && !itemReceived, "Contract is not eligible for termination");

        // 將合約中的以太幣轉回付款人的帳戶
        // (bool success, ) = payer.call{value : address(this).balance}("");      
        // require(success, "Cannot send funds");
        selfdestruct(payer);
    }

    function finishContract() external {
        require(msg.sender == payee, "Only payee could finish th contract");
        // 確保訂單已完成
        require(itemReceived, "Payer hasn't recieved item yet");

        // 將合約中的以太幣轉回付款人的帳戶
        // (bool success, ) = payee.call{value : address(this).balance}("");      
        // require(success, "Cannot send funds");
        selfdestruct(payee);
    }

}