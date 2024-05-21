type IdcsBase = {
  issuer: string;
  scopesSupported: string[];
  responseTypesSupported: string[];
  claimsSupported: string[];
  grantTypesSupported: string[];
  tokenEndpointAuthMethodsSupported: string[];
  tokenEndpointAuthSigningAlgValuesSupported: string[];
  userinfoSigningAlgValuesSupported: string[];
  uiLocalesSupported: string[];
  claimsParameterSupported: boolean;
  httpLogoutSupported: boolean;
  logoutSessionSupported: boolean;
  requestParameterSupported: boolean;
  requestUriParameterSupported: boolean;
  requireRequestUriRegistration: boolean;
  idcsIdToken: string;
  idcsLogoutV3: string;
  };

type IdcsSecure = {
  secureAuthorizationEndpoint: string;
  secureTokenEndpoint: string;
  secureUserinfoEndpoint: string;
  secureRevocationEndpoint: string;
  secureIntrospectionEndpoint: string;
  secureEndSessionEndpoint: string;
  secureJwksUri: string;
};
  
type IdcsNonSecure = {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userinfoEndpoint: string;
  revocationEndpoint: string;
  introspectionEndpoint: string;
  endSessionEndpoint: string;
  jwksUri: string;
};


type IdcsURLs = IdcsSecure & IdcsNonSecure;

// get idcsURL
export type Idcs = IdcsBase & IdcsURLs

const isKeyOfIdcs = (key: string, obj: IdcsURLs): key is keyof IdcsURLs => {
  return key in obj;
}

const getIDCSURL = (idcs: Idcs, isSecure: boolean = false, urlName: string): string | Error => {
  let url = urlName;
  if (isSecure) {
    url = 'secure' + urlName;
  }
  // check if the url exist in idcs and retrieves
  if (isKeyOfIdcs(url, idcs)) {
    return idcs[url];
  }

  return new Error("url not found")
}

// GENERATING CODE VERIFIER
function dec2hex(dec: any) {
  return ("0" + dec.toString(16)).substr(-2);
}

function generateCodeVerifier() {
  var array = new Uint32Array(56 / 2);
  crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

function sha256(plain: string) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: any) {
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

async function generateCodeChallenge(v: any) {
  var hashed = await sha256(v);
  var base64encoded = base64urlencode(hashed);
  console.log("*******");
  console.log(base64encoded)
  console.log("********");
  return base64encoded;
}
// const generateCodeVerifier = (): string => {
//     return crypto.randomBytes(32).toString('base64url');
// };

// const generateCodeChallenge = (code: string) => {
//     return crypto.createHash('sha256').update(code).digest('base64url');
// };


export { getIDCSURL, generateCodeChallenge, generateCodeVerifier }



