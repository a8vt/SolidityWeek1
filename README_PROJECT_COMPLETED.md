Test with two accounts:
account 1: 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
account 2: 0x75940107CB4FF33F41178C3e9958944052A856d9

The private keys of both accounts were filled in the .env file


I deployed my contract twice.

Contract 1: 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Contract 2: 0x9b249a19896356FcbB2041ce0330CeBb81f9f398




Orders made for Contract 1 (in the following order):

Deployment with account 1:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/deployment.ts Pizza Lasagna PopCorn
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.994728098475305
Deploying Ballot contract
Proposals: 
Proposal N. 1: Pizza
Proposal N. 2: Lasagna
Proposal N. 3: PopCorn
Awaiting confirmations
Completed
Contract deployed at 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25


Give rights to vote to account 2:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/giveVotingRights.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 0x75940107CB4FF33F41178C3e9958944052A856d9
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.993041588467435
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Giving right to vote to 0x75940107CB4FF33F41178C3e9958944052A856d9
Awaiting confirmations
Transaction completed. Hash: 0x886c50ec39ee423e6405b37fd5a3d4e37866c1f04e36d3bea329233c8fdd9035


The account 2 is the first to vote:
(Utilisation de PRIVATE_KEY_2, la private key de l'account 2, dans castVote.ts):
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/castVote.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 1

Using address 0x75940107CB4FF33F41178C3e9958944052A856d9
Wallet balance 10
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Casting a vote
Awaiting confirmations
Transaction completed. Hash: 0x2e3b3c620106a87ef078e4d591739693b1788679cba8372db065e96c802e1e31



The account 1 delegates his vote to account 2:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/delegateVote.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 0x75940107CB4FF33F41178C3e9958944052A856d9
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.992968602967094
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Delegating a vote
Awaiting confirmations
Transaction completed. Hash: 0xfcf1c56942fb98ad3ed8ab952645f3dcd87db539a4f2d5932b45ffaf7966ec47



The account 2 tries to vote ( so I use private_key_2 dans castVote.ts):
Returns an error message:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/castVote.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 1
Using address 0x75940107CB4FF33F41178C3e9958944052A856d9
Wallet balance 9.99986061399935
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Casting a vote
<ref *1> Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (error={"reason":"cannot estimate gas; transaction may fail or may require manual gas limit","code":"UNPREDICTABLE_GAS_LIMIT","method":"estimateGas","transaction":{"from":"0x75940107CB4FF33F41178C3e9958944052A856d9","maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f10"},"to":"0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25","data":"0x0121b93f0000000000000000000000000000000000000000000000000000000000000001","type":2,"accessList":null}}, tx={"data":"0x0121b93f0000000000000000000000000000000000000000000000000000000000000001","to":{},"from":"0x75940107CB4FF33F41178C3e9958944052A856d9","type":2,"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f10"},"maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"nonce":{},"gasLimit":{},"chainId":{}}, code=UNPREDICTABLE_GAS_LIMIT, version=abstract-signer/5.6.0)
    at Logger.makeError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:261:28)
    at Logger.throwError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
    at /home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/abstract-signer/src.ts/index.ts:301:31
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Promise.all (index 7) {
  reason: 'cannot estimate gas; transaction may fail or may require manual gas limit',
  code: 'UNPREDICTABLE_GAS_LIMIT',
  error: Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (method="estimateGas", transaction={"from":"0x75940107CB4FF33F41178C3e9958944052A856d9","maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f10"},"to":"0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25","data":"0x0121b93f0000000000000000000000000000000000000000000000000000000000000001","type":2,"accessList":null}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.6.4)
      at Logger.makeError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:261:28)
      at Logger.throwError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
      at /home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/src.ts/fallback-provider.ts:631:24
      at Array.forEach (<anonymous>)
      at /home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/src.ts/fallback-provider.ts:613:33
      at step (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:48:23)
      at Object.next (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:29:53)
      at step (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:33:139)
      at Object.next (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:29:53)
      at fulfilled (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:20:58) {
    reason: 'cannot estimate gas; transaction may fail or may require manual gas limit',
    code: 'UNPREDICTABLE_GAS_LIMIT',
    method: 'estimateGas',
    transaction: {
      from: '0x75940107CB4FF33F41178C3e9958944052A856d9',
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      to: '0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25',
      data: '0x0121b93f0000000000000000000000000000000000000000000000000000000000000001',
      type: 2,
      accessList: null
    }
  },
  tx: {
    data: '0x0121b93f0000000000000000000000000000000000000000000000000000000000000001',
    to: Promise { '0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25' },
    from: '0x75940107CB4FF33F41178C3e9958944052A856d9',
    type: 2,
    maxFeePerGas: BigNumber { _hex: '0x59682f10', _isBigNumber: true },
    maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
    nonce: Promise { 1 },
    gasLimit: Promise { <rejected> [Circular *1] },
    chainId: Promise { 3 }
  }
}



The account 1 tries to vote :
Returns an error message.
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/castVote.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 1
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.992876942466605
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Casting a vote
<ref *1> Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (error={"reason":"cannot estimate gas; transaction may fail or may require manual gas limit","code":"UNPREDICTABLE_GAS_LIMIT","method":"estimateGas","transaction":{"from":"0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0","maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f10"},"to":"0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25","data":"0x0121b93f0000000000000000000000000000000000000000000000000000000000000001","type":2,"accessList":null}}, tx={"data":"0x0121b93f0000000000000000000000000000000000000000000000000000000000000001","to":{},"from":"0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0","type":2,"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f10"},"maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"nonce":{},"gasLimit":{},"chainId":{}}, code=UNPREDICTABLE_GAS_LIMIT, version=abstract-signer/5.6.0)
    at Logger.makeError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:261:28)
    at Logger.throwError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
    at /home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/abstract-signer/src.ts/index.ts:301:31
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Promise.all (index 7) {
  reason: 'cannot estimate gas; transaction may fail or may require manual gas limit',
  code: 'UNPREDICTABLE_GAS_LIMIT',
  error: Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (method="estimateGas", transaction={"from":"0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0","maxPriorityFeePerGas":{"type":"BigNumber","hex":"0x59682f00"},"maxFeePerGas":{"type":"BigNumber","hex":"0x59682f10"},"to":"0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25","data":"0x0121b93f0000000000000000000000000000000000000000000000000000000000000001","type":2,"accessList":null}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.6.4)
      at Logger.makeError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:261:28)
      at Logger.throwError (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
      at /home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/src.ts/fallback-provider.ts:631:24
      at Array.forEach (<anonymous>)
      at /home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/src.ts/fallback-provider.ts:613:33
      at step (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:48:23)
      at Object.next (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:29:53)
      at step (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:33:139)
      at Object.next (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:29:53)
      at fulfilled (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/node_modules/@ethersproject/providers/lib/fallback-provider.js:20:58) {
    reason: 'cannot estimate gas; transaction may fail or may require manual gas limit',
    code: 'UNPREDICTABLE_GAS_LIMIT',
    method: 'estimateGas',
    transaction: {
      from: '0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0',
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      to: '0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25',
      data: '0x0121b93f0000000000000000000000000000000000000000000000000000000000000001',
      type: 2,
      accessList: null
    }
  },
  tx: {
    data: '0x0121b93f0000000000000000000000000000000000000000000000000000000000000001',
    to: Promise { '0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25' },
    from: '0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0',
    type: 2,
    maxFeePerGas: BigNumber { _hex: '0x59682f10', _isBigNumber: true },
    maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
    nonce: Promise { 8 },
    gasLimit: Promise { <rejected> [Circular *1] },
    chainId: Promise { 3 }
  }
}



I query the voting results:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/queryVotingResults.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.992876942466605
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Querying the winning proposal
Proposal: 
Awaiting confirmations
The winning proposal is 0x4c617361676e6100000000000000000000000000000000000000000000000000.

Problem: the result is in bytes32, not human readable.


So I change the file queryVotingResults and I add the functionality ethers.utils.parseBytes32String:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/queryVotingResults.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.992876942466605
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Querying the winning proposal
Awaiting confirmations
The winning proposal is Lasagna.


I query the proposals with their number of votes:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/queryProposals.ts 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25 
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.99103524695801
Attaching ballot contract interface to address 0x9dA0F3b257B21b6e5b6d1d64E33462314fC54b25
Here are the proposals associated with their number of votes : 
The proposal number 0 is Pizza and it has 0 votes in the ballot
The proposal number 1 is Lasagna and it has 2 votes in the ballot
The proposal number 2 is PopCorn and it has 0 votes in the ballot
We have seen all the array values.





Orders made for Contract 2 (in the following order):

Deployment with account 1:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/deployment.ts Pizza Lasagna PopCorn
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.992876942466605
Deploying Ballot contract
Proposals: 
Proposal N. 1: Pizza
Proposal N. 2: Lasagna
Proposal N. 3: PopCorn
Awaiting confirmations
Completed
Contract deployed at 0x9b249a19896356FcbB2041ce0330CeBb81f9f398


Give rights to vote to account 2:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/giveVotingRights.ts 0x9b249a19896356FcbB2041ce0330CeBb81f9f398 0x75940107CB4FF33F41178C3e9958944052A856d9

Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.991190432458735
Attaching ballot contract interface to address 0x9b249a19896356FcbB2041ce0330CeBb81f9f398
Giving right to vote to 0x75940107CB4FF33F41178C3e9958944052A856d9
Awaiting confirmations
Transaction completed. Hash: 0x74d81e98c073c3321f80e180ade5861cef91e70107a1a722bf562ef02ca37a41



Account 1 delegates his vote to account 2:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/delegateVote.ts 0x9b249a19896356FcbB2041ce0330CeBb81f9f398 0x75940107CB4FF33F41178C3e9958944052A856d9

Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.991117446958395
Attaching ballot contract interface to address 0x9b249a19896356FcbB2041ce0330CeBb81f9f398
Delegating a vote
Awaiting confirmations
Transaction completed. Hash: 0x51899ceea9d64f7e06b06d23dd257d26a907ce0ddb4f1898fffc9d3c21665977



Account 2 tries to vote but forgets to indicate for which proposal:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/castVote.ts 0x9b249a19896356FcbB2041ce0330CeBb81f9f398
Using address 0x75940107CB4FF33F41178C3e9958944052A856d9
Wallet balance 9.99986061399935
Error: Proposal missing
    at main (/home/victoire/SolBoot/lesson4/04-Tests-Scripts-master/Project/scripts/Ballot/castVote.ts:50:38)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)



Account 2 votes:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/castVote.ts 0x9b249a19896356FcbB2041ce0330CeBb81f9f398 0
Using address 0x75940107CB4FF33F41178C3e9958944052A856d9
Wallet balance 9.99986061399935
Attaching ballot contract interface to address 0x9b249a19896356FcbB2041ce0330CeBb81f9f398
Casting a vote
Awaiting confirmations
Transaction completed. Hash: 0xd1eae89b99049a2906e48fc145143507b9d3ba006437d496def24702c9bc0246



I query the voting results:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/queryVotingResults.ts 0x9b249a19896356FcbB2041ce0330CeBb81f9f398 

Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.99103524695801
Attaching ballot contract interface to address 0x9b249a19896356FcbB2041ce0330CeBb81f9f398
Querying the winning proposal
Awaiting confirmations
The winning proposal is Pizza.


I query the proposals associated with their number of votes:
~/SolBoot/lesson4/04-Tests-Scripts-master/Project$ yarn ts-node --files ./scripts/Ballot/queryProposals.ts 0x9b249a19896356FcbB2041ce0330CeBb81f9f398 
Using address 0x4cd3400fbb3fA0Fb8Dc3d265ECA079938c3220F0
Wallet balance 9.99103524695801
Attaching ballot contract interface to address 0x9b249a19896356FcbB2041ce0330CeBb81f9f398
Here are the proposals associated with their number of votes : 
The proposal number 0 is Pizza and it has 2 votes in the ballot
The proposal number 1 is Lasagna and it has 0 votes in the ballot
The proposal number 2 is PopCorn and it has 0 votes in the ballot
We have seen all the array values.
