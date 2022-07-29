import { CasperServiceByJsonRPC } from "casper-js-sdk";
import { StoredValue } from "casper-js-sdk/dist/lib/StoredValue";
import * as constants from "./constants";

const main = async () => {
  let client: CasperServiceByJsonRPC = new CasperServiceByJsonRPC(
    // constants.NCTL_ADDRESS
    constants.TESTNET_ADDRESS
  );

  const state_root_hash: string = await client.getStateRootHash();

  // get dictionary item by uref
  const dictionary_item_value_1: StoredValue =
    await client.getDictionaryItemByURef(
      state_root_hash,
      "abc_name",
      "uref-30074a46a79b2d80cff437594d2422383f6c754de453b732448cc711b9f7e129-007"
    );
  console.log(
    "\n\ndictionary_item_value_1 =>",
    dictionary_item_value_1.CLValue
  );

  // get dictionary item by name
  const contract_hash: string =
    "hash-d5308670dc1583f49a516306a3eb719abe0ba51651cb08e606fcfc1f9b9134cf";
  const dictionary_name: string = "dictname";
  const dictionary_item_key: string = "abcname";
  const dictionary_item_value_2: StoredValue =
    await client.getDictionaryItemByName(
      state_root_hash,
      contract_hash,
      dictionary_name,
      dictionary_item_key
    );
  console.log(
    "\n\ndictionary_item_value_2 =>",
    dictionary_item_value_2.CLValue
  );
};

main();
