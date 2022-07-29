import fs from "fs";

export const getBinary = (pathToBinary: string): Uint8Array => {
  return new Uint8Array(fs.readFileSync(pathToBinary, null).buffer);
};
