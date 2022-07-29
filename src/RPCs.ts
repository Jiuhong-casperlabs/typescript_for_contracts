import { CasperServiceByJsonRPC, CLPublicKey } from "casper-js-sdk";
import * as constants from "./constants";

const main = async () => {
  let client: CasperServiceByJsonRPC = new CasperServiceByJsonRPC(
    constants.NCTL_ADDRESS
  );

  const deployhash: string =
    "1f3bd1531a248366470fc7eb599ab5805ad1752f3a48fbd0c1196794ad5182de";
  const deploy_info = await client.getDeployInfo(deployhash);
  console.log("\n\ndeploy_info =>\n", deploy_info);

  const blockhash: string =
    "6cf5f3dc27692d91f608b6fb1a65e9de0c6d079e883dbce67e24f3c1f828568d";
  const block_info = await client.getBlockInfo(blockhash);
  console.log("\n\nblock info =>\n", block_info);

  let block_info_by_height = await client.getBlockInfoByHeight(10);
  console.log("\n\nblock_info_by_height =>\n", block_info_by_height);

  const latest_block_info = await client.getLatestBlockInfo();
  console.log("\n\nlatest_block_info =>\n", latest_block_info);

  const peers = await client.getPeers();
  console.log("\n\npeers_info =>\n", peers);

  const status = await client.getStatus();
  console.log("\n\nstatus =>\n", status);

  const validator_info = await client.getValidatorsInfo();
  console.log("\n\nvalidator_info =>\n", validator_info);

  const validator_info_by_height = await client.getValidatorsInfoByBlockHeight(
    1
  );
  console.log("\n\nvalidator_info_by_height =>\n", validator_info_by_height);

  const stateroothash: string = await client.getStateRootHash();
  const accounthash: string =
    "810677ff9fdb0fe13a5fc444ff3240f9dd4c1a46a73e21b1a873fceee8689b49";
  const uref_by_accounthash = await client.getAccountBalanceUrefByPublicKeyHash(
    stateroothash,
    accounthash
  );
  console.log("\n\nuref_by_accounthash =>\n", uref_by_accounthash);

  const publickey_str =
    "01728e64fdedd75ff64858a27abde9c0c5caa5a04564b0953b3ed4988f8102687c";
  const publicKey = CLPublicKey.fromHex(publickey_str);
  const uref_by_publickey = await client.getAccountBalanceUrefByPublicKey(
    stateroothash,
    publicKey
  );
  console.log("\n\nuref_by_publickey =>\n", uref_by_publickey);

  const balanceUref =
    "uref-ed450988a6bba871a1599a0c8bedd1621a1c0e9c90565252d22f0f876e74bfb1-007";
  const account_balance = await client.getAccountBalance(
    stateroothash,
    balanceUref
  );
  console.log("\n\naccount_balance =>\n", account_balance.toString());

  const state_root_hash = await client.getStateRootHash();
  console.log("\n\nstate_root_hash => \n", state_root_hash);
};

main();
