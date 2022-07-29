import { CasperClient, CLPublicKey } from "casper-js-sdk";
import * as constants from "./constants";

const main = async () => {
  const client: CasperClient = new CasperClient(constants.NCTL_ADDRESS);

  // from public key
  const publicKey: CLPublicKey = CLPublicKey.fromHex(
    "01728e64fdedd75ff64858a27abde9c0c5caa5a04564b0953b3ed4988f8102687c"
  );

  const balance1: string = (
    await client.balanceOfByPublicKey(publicKey)
  ).toString();
  console.log("balance =>", balance1);

  // from account hash
  const accounthash_str =
    "810677ff9fdb0fe13a5fc444ff3240f9dd4c1a46a73e21b1a873fceee8689b49";
  const balance2: string = (
    await client.balanceOfByAccountHash(accounthash_str)
  ).toString();
  console.log("balance =>", balance2);
};

main();
