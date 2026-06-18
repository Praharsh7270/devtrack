import dns from "dns";
import { promisify } from "util";

const resolve = promisify(dns.resolve);

const PRIVATE_RANGES = [
  { start: 0x0a000000, end: 0x0affffff },
  { start: 0xac100000, end: 0xac1fffff },
  { start: 0xc0a80000, end: 0xc0a8ffff },
  { start: 0x7f000000, end: 0x7fffffff },
  { start: 0xa9fe0000, end: 0xa9feffff },
];

function ipToNumber(ip: string): number {
  const parts = ip.split(".").map(Number);
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

function isPrivateIP(ip: string): boolean {
  if (ip === "::1" || ip === "::" || ip.startsWith("fe80:") || ip.startsWith("fc00:") || ip.startsWith("fd00:")) {
    return true;
  }

  const num = ipToNumber(ip);
  return PRIVATE_RANGES.some(({ start, end }) => num >= start && num <= end);
}

export async function isSafeUrl(url: string): Promise<boolean> {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    const hostname = parsed.hostname;
<<<<<<< HEAD
    if (hostname === "localhost" || hostname === "0.0.0.0") {
=======
    let ipToCheck = hostname;
    if (ipToCheck.startsWith("[") && ipToCheck.endsWith("]")) {
      ipToCheck = ipToCheck.slice(1, -1);
    }

    // Block localhost/unspecified/loopback hostnames before DNS resolution
    if (hostname === "localhost" || ipToCheck === "0.0.0.0" || ipToCheck === "::1") {
      return false;
    }

    if (net.isIP(ipToCheck)) {
      return !isPrivateIP(ipToCheck);
    }

    const addresses: string[] = [];

    try {
      const lookupResults = await dns.lookup(hostname, { all: true });
      if (Array.isArray(lookupResults)) {
        addresses.push(...lookupResults.map((r) => r.address));
      }
    } catch {
      return false;
    }

    if (addresses.length === 0) {
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4
      return false;
    }

    const addresses = await resolve(hostname, "A");
    for (const addr of addresses) {
      if (isPrivateIP(addr)) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

export function validateUrlBasic(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
