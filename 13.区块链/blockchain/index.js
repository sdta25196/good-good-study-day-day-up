/**
*
* @author : 田源
* @date : 2021-12-07 15:20
* @description : 简易版本区块链
*
*/

const hash = require("crypto-js/sha256")

class Block {
  constructor(previousHash, data) {
    this.data = data;
    this.hash = this.calculateHash(); // 当前的hash
    this.previousHash = previousHash; // 上一个块的hash
    this.timeStamp = new Date(); //时间戳
    this.proofOfWork = 0;  //所需算力
  }

  calculateHash() {
    return hash(
      this.previousHash +
      JSON.stringify(this.data) +
      this.timeStamp +
      this.proofOfWork
    ).toString();
  }

  mine(difficulty) {
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.proofOfWork++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    let genesisBlock = new Block("0", { isGenesis: true });
    this.chain = [genesisBlock];
  }

  addBlock(data) {
    let lastBlock = this.chain[this.chain.length - 1];
    let newBlock = new Block(lastBlock.hash, data);
    newBlock.mine(2); // find a hash for new block
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash != currentBlock.calculateHash()) return false;
      if (currentBlock.previousHash != previousBlock.hash) return false;
    }
    return true;
  }
}

let blockchain = new Blockchain()

blockchain.addBlock({
  from: "ty",
  to: "ls",
  amount: 1000
})

console.log(blockchain.chain)