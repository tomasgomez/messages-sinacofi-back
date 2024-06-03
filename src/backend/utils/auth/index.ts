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

// lib/authHelpers.js
import { Issuer, custom } from 'openid-client';
import qs from 'qs';
import axios from 'axios';
import { createLocalJWKSet } from 'jose';


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
  const url = 'https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/oauth2/v1/token';
  const data = qs.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
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
  const jwkUrl = 'https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com:443/admin/v1/SigningCert/jwk';

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

export async function setupClient() {
  const token = await getAccessToken();
  const jwksResponse = await getJwkUsingToken(token);

  if (!jwksResponse.keys) {
    throw new Error('Invalid JWK Set response');
  }

  const jwks = {
    keys: jwksResponse.keys.map((key:any) => {
      let keyOps = key.key_ops;
      if (key.alg === "RS256") {
        keyOps = ["verify"];
      }
      return { ...key, key_ops: keyOps };
    }),
  };

  const localJWKSet = createLocalJWKSet(jwks);

  const oracleIAMIssuer = await Issuer.discover(process.env.OIDC_ISSUER || '');

  oracleIAMIssuer[custom.http_options] = (url, options) => {
    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    };
  };

  const client = new oracleIAMIssuer.Client({
    client_id: process.env.CLIENT_ID || '',
    client_secret: process.env.CLIENT_SECRET || '',
    redirect_uris: [`${process.env.NEXTAUTH_URL}/callback`],
    response_types: ['code'],
    scope: ["openid", "offline_access", "email", "profile"],
    post_logout_redirect_uris: [`${process.env.NEXTAUTH_URL}/`],
    id_token_signed_response_alg: 'RS256',
    default_max_age: 3600,
    require_auth_time: true,
    tls_client_certificate_bound_access_tokens: false,
    request_object_signing_alg: 'RS256',
    introspection_endpoint_auth_signing_alg: 'RS256',
    revocation_endpoint_auth_signing_alg: 'RS256',
    token_endpoint_auth_signing_alg: 'RS256',
    userinfo_signed_response_alg: 'RS256',
    authorization_signed_response_alg: 'RS256',
    localJWKSet
  });

  return client;
}

export const client = setupClient() 
