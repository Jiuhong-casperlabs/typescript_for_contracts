import { CasperClient, Contracts } from "casper-js-sdk";
import * as constants from "./constants";

const main = async () => {
  // const client = new CasperClient(constants.NCTL_ADDRESS);
  const client = new CasperClient(constants.TESTNET_ADDRESS);

  const { Contract } = Contracts;

  const contractClient: Contracts.Contract = new Contract(client);

  const contract_hash: string =
    "hash-3d3d5301e1a1deb700fb018bc8a0d52514ff7e169bd3fe75c3f9b72440ec21f6"; // contract hash
  contractClient.setContractHash(contract_hash);

  // query named_keys under contract
  const result = await contractClient.queryContractData(["total_supply"]); //named key
  console.log("\n\nnamed_key value =>\n", result);

  // query dictionary value under contract
  const contract_hash_2 =
    "hash-d5308670dc1583f49a516306a3eb719abe0ba51651cb08e606fcfc1f9b9134cf"; // contract hash - testnet
  // const contract_hash = "hash-2d29c667c66d35fc4a40c73eb5d86af2ca6741d99bfb67ae2854321faffde3c7" //contract hash - nctl
  contractClient.setContractHash(contract_hash_2);

  const dict_value = await contractClient.queryContractDictionary(
    "dictname",
    "abcname"
  );
  console.log("\n\ndict_value =>\n", dict_value);
};

main();
