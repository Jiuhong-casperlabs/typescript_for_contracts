import {
  CasperClient,
  CLValue,
  DeployUtil,
  Keys,
  RuntimeArgs,
} from "casper-js-sdk";
import * as constants from "./constants";
import * as utils from "./utils";

const main = async () => {
  // step1: Set casper node client
  const client = new CasperClient(constants.NCTL_ADDRESS);

  // step2: set contract operator key pair
  const keyPair = client.loadKeyPairFromPrivateFile(
    constants.KEY_PATH_USER_1,
    Keys.SignatureAlgorithm.Ed25519
  );

  const args: Record<string, CLValue> = {
    // name: CLValue,
  };

  // step3: Set contract installation deploy(unsigned)
  let deploy: DeployUtil.Deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPair.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(constants.PATH_TO_CONTRACT),
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
