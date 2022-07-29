import {
  CasperClient,
  CLValue,
  DeployUtil,
  Keys,
  RuntimeArgs,
} from "casper-js-sdk";
import * as constants from "./constants";

const main = async () => {
  // step1: Set casper node client
  const client = new CasperClient(constants.NCTL_ADDRESS);

  // step2: set contract operator key pair
  const keyPair = client.loadKeyPairFromPrivateFile(
    constants.KEY_PATH_USER_1,
    Keys.SignatureAlgorithm.Ed25519
  );

  const args: Record<string, CLValue> = {
    //update here
    // name: CLValue,
  };

  const contracthash_str: string =
    "hash-c9afc7c6af893614f81bb5a668e029c9161c24c33f8b475c7ea951f345a96e5d"; //update here

  const contractHashAsByteArray = Uint8Array.from(
    Buffer.from(contracthash_str.slice(5), "hex")
  );

  // step3: Set contract installation deploy(unsigned)
  let deploy: DeployUtil.Deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPair.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      "entrypoint", // update here
      RuntimeArgs.fromMap(args)
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_INSTALL)
  );

  // step4:sign deploy
  deploy = client.signDeploy(deploy, keyPair);

  // step5: dispatch deploy to node
  const deployHash: string = await client.putDeploy(deploy);

  // log deploy hash
  console.log("deploy hash =>", deployHash);
};

main();
