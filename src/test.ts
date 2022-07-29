import { Keys } from "casper-js-sdk";
import { getAccountHash } from "./utils";
const main = () => {
  let result: string = getAccountHash(Keys.Ed25519.new());
  console.log("result is ", result);
};
main();
