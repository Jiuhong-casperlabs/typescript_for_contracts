import { CasperClient, DeployUtil, Keys } from "casper-js-sdk";
import * as constants from "./constants";

const main = async () => {
  // set casper node client
  const client = new CasperClient(constants.NCTL_ADDRESS);

  // set source key pair
  const source = client.loadKeyPairFromPrivateFile(
    constants.KEY_PATH_USER_1,
    Keys.SignatureAlgorithm.Ed25519
  );
  // set target key pair
  const target = client.loadKeyPairFromPrivateFile(
    constants.KEY_PATH_USER_2,
    Keys.SignatureAlgorithm.Ed25519
  );

  // === args ====
  const AMOUNT_TO_TRANSFER = 2500000000;
  const id: number = 1234567;
  // ===========

  // set deploy
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      source.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newTransfer(
      AMOUNT_TO_TRANSFER,
      target.publicKey,
      null,
      id
    ),
    DeployUtil.standardPayment(constants.DEPLOY_GAS_PAYMENT_FOR_TRANSFER)
  );
  // ===deploy hash is generated here==
  console.log(
    "deploy hash before sending to chain =>",
    Buffer.from(deploy.hash).toString("hex")
  );

  // sign deploy
  deploy = client.signDeploy(deploy, source);

  let deployhash = await client.putDeploy(deploy);
  console.log("deployhash =>", deployhash);
};

main();
