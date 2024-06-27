import sepolia from "./protocol_testnet";

function findKeyNameByAddress(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  address: string,
  path: string[] = []
): string | null {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const result = findKeyNameByAddress(obj[key], address, [...path, key]);
      if (result) {
        return result;
      }
    } else if (obj[key] === address) {
      if (key === "proxy" || key === "address" || key === "poolId") {
        // Return the second to last key
        return path[path.length - 1];
      }
      return key; // Return the last key
    }
  }
  return null;
}

function getAddressName(address: string): string | null {
  try {
    return findKeyNameByAddress(sepolia, address);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

export default getAddressName;
