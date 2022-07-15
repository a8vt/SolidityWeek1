
import { Bytes, Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";


function setupProvider() {
  const infuraOptions = process.env.INFURA_API_KEY
    ? process.env.INFURA_API_SECRET
      ? {
          projectId: process.env.INFURA_API_KEY,
          projectSecret: process.env.INFURA_API_SECRET,
        }
      : process.env.INFURA_API_KEY
    : "";
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: infuraOptions,
    etherscan : process.env.ETHERSCAN_API_KEY,
  };
  const provider = ethers.providers.getDefaultProvider("ropsten", options);
  return provider;
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  const provider = setupProvider();
  //const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }


  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];

  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );

  console.log("Here are the proposals associated with their number of votes : ");

  

  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  // I cannot get with proposals.length the length of the array proposals. The following code returns an error:
  //const proposal= await ballotContract.proposals;
//const prop0= await proposal(0);
  //console.log(prop0);
  //const proposalSize = proposal.length;
  //console.log (proposalSize);
  /*The shell:
  [
    '0x50697a7a61000000000000000000000000000000000000000000000000000000',
    BigNumber { _hex: '0x02', _isBigNumber: true },
    name: '0x50697a7a61000000000000000000000000000000000000000000000000000000',
    voteCount: BigNumber { _hex: '0x02', _isBigNumber: true }
  ]
  0

  0 is what I get when I call proposal.length.

  I have  two solutions: using a while loop or using a for loop and creating a function that calculates the length of the array inside the solidity smart contract.
  Since it will be a read only function in the solidity file, it will not cost gas. So I chose the second solution.
  
  So I implemented such a solution. I created a function in Ballot.sol sizeProposals() that returns the length of the array proposals
    but the compiler returns an error when I run the following code:

  const proposalSize = await ballotContract.sizeProposals();
  console.log(proposalSize);

  for (let index = 0; proposalSize.gt(index); index++) {
    const proposal = await ballotContract.proposals(index);
    const proposalName= ethers.utils.parseBytes32String(proposal.name);
    const proposalVotesNumber= proposal.voteCount;
    console.log (`The proposal number ${index} is ${proposalName} and it has ${proposalVotesNumber} votes in the ballot`);
  };

  I also tried proposalSize.toNumber() to convert proposalSize from an ethersjs Big Number to a Javascript Number.
  But I still got an error:  "Transaction reverted without a reason string ".

  So I ended up implementing the solution with the while loop:
  */
 let index = 0;
 let endArray= 0
  while (endArray===0) {
    try {
    const proposal = await ballotContract.proposals(index);
    const proposalName= ethers.utils.parseBytes32String(proposal.name);
    const proposalVotesNumber= proposal.voteCount;
    console.log (`The proposal number ${index} is ${proposalName} and it has ${proposalVotesNumber} votes in the ballot`);
    index ++;
  } catch (error)
  { endArray=1;
    console.log ("We have seen all the array values.");
}
  
};
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

