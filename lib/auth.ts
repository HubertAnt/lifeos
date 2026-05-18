export const COOKIE_NAME = "lifeos_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// ---------------------------------------------------------------------------
// Primitives — Web Crypto API so this module is edge-runtime compatible
// ---------------------------------------------------------------------------

async function hmacHex(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const buf = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// XOR loop over two same-length hex strings — avoids early-exit leaks.
function xorEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ---------------------------------------------------------------------------
// Session token: `{exp_ms}.{hmac(exp_ms, secret)}`
// ---------------------------------------------------------------------------

export async function seal(secret: string): Promise<string> {
  const exp = Date.now() + COOKIE_MAX_AGE * 1000;
  const sig = await hmacHex(String(exp), secret);
  return `${exp}.${sig}`;
}

export async function unseal(token: string, secret: string): Promise<boolean> {
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (isNaN(Number(exp)) || Date.now() > Number(exp)) return false;
  const expected = await hmacHex(exp, secret);
  return xorEqual(sig, expected);
}

// ---------------------------------------------------------------------------
// Constant-time string equality via HMAC normalisation
// HMACing both values under the same key yields same-length digests
// so xorEqual runs in constant time regardless of input length.
// ---------------------------------------------------------------------------

export async function safeEqual(
  a: string,
  b: string,
  secret: string,
): Promise<boolean> {
  const [ha, hb] = await Promise.all([hmacHex(a, secret), hmacHex(b, secret)]);
  return xorEqual(ha, hb);
}
