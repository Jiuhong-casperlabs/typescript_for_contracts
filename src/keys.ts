import { CasperClient, CLPublicKey, Keys } from "casper-js-sdk";
import * as constants from "./constants";

const main = async () => {
  const client: CasperClient = new CasperClient(constants.NCTL_ADDRESS);

  const keyPair: Keys.AsymmetricKey = client.loadKeyPairFromPrivateFile(
    constants.KEY_PATH_USER_1,
    Keys.SignatureAlgorithm.Ed25519
  );

  const pfile: string = keyPair.exportPublicKeyInPem();
  console.log("pfile\n", pfile);
  console.log("public key=>", keyPair.accountHex());
  console.log(
    "account hash=>",
    Buffer.from(keyPair.accountHash()).toString("hex")
  );

  const pk: Uint8Array = keyPair.publicKey.data;
  console.log("pk =>", pk);
  const sk: Uint8Array = keyPair.privateKey;
  console.log("sk=>", sk);

  const result: Uint8Array = Keys.Ed25519.privateToPublicKey(sk);
  console.log("result is", Buffer.from(result).toString("hex"));

  const hexString =
    "0203b4fb8f135bbfee4a3e26071624f0883229c6138c16bbbcebbba5381885e599ce";

  const CLPK: CLPublicKey = CLPublicKey.fromHex(hexString);
  console.log("CLPK =>", CLPK);
  const accounthashstr: string = CLPK.toAccountHashStr();
  console.log("accounthash =>", accounthashstr);
};

main();
