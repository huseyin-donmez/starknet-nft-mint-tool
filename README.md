﻿# starknet-mint-tool
In according to use the tool, the arguments in the .env file are necessary.

  PRIVATE_KEY= Private key of the account that will be used in the mint phase.
  
  ACCOUNT_ADDRESS= Address of the account that will be used in the mint phase. 
  
  ETH_ADDRESS= StarkNet Ether contract address.                                
  
  CONTRACT_ADDRESS= NFT contract address
  
  FREQUENCY= Frequency of the call to the contract in order to check it's public mint phase is open or not
  
  Also, you have to change the function's names with the contract's one so that script can check the contract.
   
   For example, publicMint is a function that we can mint an NFT. Howeever the name of the function can be different in other contracts.
