// Edge- and Node-safe auth helpers using the Web Crypto API.
const SECRET = process.env.FARMOVA_AUTH_SECRET || "dev-insecure-secret";

export const SESSION_COOKIE = "farmova_session";

export function getCredentials() {
  return {
    tenant: process.env.FARMOVA_TENANT || "demo",
    username: process.env.FARMOVA_USERNAME || "admin@farmova.app",
    password: process.env.FARMOVA_PASSWORD || "Farmova@2026!",
  };
}

function toBase64Url(bytes) {
  let bin = "";
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmac(data) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return toBase64Url(sig);
}

// Constant-time string comparison.
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signSession(payload) {
  const data = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await hmac(data);
  return `${data}.${sig}`;
}

export async function verifySession(token) {
  if (!token || !token.includes(".")) return null;
  const [data, sig] = token.split(".");
  const expected = await hmac(data);
  if (!safeEqual(sig, expected)) return null;
  try {
    return JSON.parse(new TextDecoder().decode(fromBase64Url(data)));
  } catch {
    return null;
  }
}

export function checkCredentials(username, password) {
  const creds = getCredentials();
  return (
    safeEqual(String(username), creds.username) &&
    safeEqual(String(password), creds.password)
  );
}
