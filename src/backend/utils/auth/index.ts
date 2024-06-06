// lib/authHelpers.js
import qs from 'qs';
import axios from 'axios';

export const parseCookies = (name: string) => {
  const cookies: {[key: string]: string } = {};
  name.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.split('=');
      const value = rest.join('=').trim();
      if (name && value) {
        cookies[name.trim()] = decodeURIComponent(value);
      }
    });

  return cookies;
}

// GENERATING CODE VERIFIER
export function dec2hex(dec: any) {
    return ("0" + dec.toString(16)).substr(-2);
  }
  
export function generateCodeVerifier() {
    var array = new Uint32Array(56 / 2);
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
  }
  
export function sha256(plain: string) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.subtle.digest("SHA-256", data);
  }
  
export function base64urlencode(a: any) {
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  
export async function generateCodeChallenge(v: any) {
    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
  }

export async function getAccessToken() {
  const url = process.env.IAM_VALIDATE_TOKEN_URL as string;
  const data = qs.stringify({
    client_id: process.env.IAM_CLIENT_ID,
    client_secret: process.env.IAM_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'urn:opc:idm:__myscopes__'
  });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  try {
    const response = await axios.post(url, data, config);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching the token:', error);
    throw error;
  }
}

export async function getJwkUsingToken(token: any) {
  const jwkUrl = process.env.IAM_JWK_TOKEN_URL as string;

  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await axios.get(jwkUrl, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching the JWK:', error);
    throw error;
  }
}
