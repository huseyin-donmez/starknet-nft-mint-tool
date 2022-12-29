import * as dotenv from 'dotenv'
dotenv.config()
import {Provider, number, Account, uint256, ec} from "starknet";
import * as ethers from "ethers";
import * as yargs from "yargs";
const args = yargs.argv;

const provider = new Provider({
    sequencer: {
      baseUrl: 'https://alpha4.starknet.io',
      feederGatewayUrl: 'feeder_gateway',
      network: 'mainnet-alpha',
      gatewayUrl: 'gateway',
    }
})

const mintPriceBN = ethers.utils.parseUnits(`${args.mintPrice}`, "18");
const allowance = uint256.bnToUint256(mintPriceBN.toString());
var frequent;
if (args.frequent != undefined){
  frequent = args.frequent;
}
else{
  frequent = 3000;
}
// CONTRACT ADDRESS AND ETHER ADDRESS
const ADDRESS = `${args.contract}`
const ETH_ADDRESS = process.env.ETH_ADDRESS // Address of the ETH contract

const privateKey = process.env.PRIVATE_KEY
const accountAddress = process.env.ACCOUNT_ADDRESS
const keyPair = ec.getKeyPair(privateKey);

const deployedAccount = new Account(provider, accountAddress, keyPair);

const publicMintTX = [
    {
      contractAddress: ETH_ADDRESS,
      entrypoint: "approve",
      calldata: [ADDRESS, allowance.low, allowance.high],
    },
    {
      contractAddress: ADDRESS,
      entrypoint: "publicMint",
      calldata: [],
    },
];

const startListen = async () => {
    const res = await provider.callContract({
      contractAddress: ADDRESS,
      entrypoint:"isPublicMintActive",
      calldata:[]
    });
    const publicMintStatus = number.hexToDecimalString(res.result.toString());
    if(publicMintStatus != 0){
        const res = await deployedAccount.execute(publicMintTX);
        console.log(res);
    }
  }

(function loop() {
    setTimeout(function(){ 
        startListen().then(loop());
    }, frequent);  
}());
