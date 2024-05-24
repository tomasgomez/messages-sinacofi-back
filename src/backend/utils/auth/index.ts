<<<<<<< HEAD

const axios = require('axios');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

let idcsConfig = {};

export const fetchIDCSConfig = async () => {
    try {
      const response = await fetch('https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/idcs-configuration');
      const data = await response.json()
      idcsConfig = data['openid-configuration'];
    } catch (error) {
      console.error('Error fetching IDCS configuration:', error);
    }
  };

const getIDCSURL = (isSecure, urlName) => {
    let urlConfig =  {
      authorizationEndpoint: isSecure ? idcsConfig.secure_authorization_endpoint : idcsConfig.authorization_endpoint,
      tokenEndpoint: isSecure ? idcsConfig.secure_token_endpoint : idcsConfig.token_endpoint,
      userinfoEndpoint: isSecure ? idcsConfig.secure_userinfo_endpoint : idcsConfig.userinfo_endpoint,
      jwksUri: isSecure ? idcsConfig.secure_jwks_uri : idcsConfig.jwks_uri,
    };
    return urlConfig[urlName];
  };
  

export const refreshToken = async (refreshToken) => {
    try {
      const url = getIDCSURL(false, 'tokenEndpoint');
      const tokenResponse = await axios.post(url, qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      return tokenResponse.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };
  
  
  // Function to validate the token
  export const validateToken = async (token) => {
    const url = getIDCSURL(false, 'jwksUri');
    const client = jwksClient({
      jwksUri: url,
      requestHeaders: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Bearer ${token}`,
      }
    });
  
    const getKey = (header, callback) => {
      client.getSigningKey(header.kid, (err, key) => {
        if (err) {
          console.error('Error fetching key:', err);
          callback(err);
        } else {
          const signingKey = key.getPublicKey();
          callback(null, signingKey);
        }
      });
    };
  
    return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

export const generateCodeVerifier = () => {
    return crypto.randomBytes(32).toString('base64url');
  };
  
export const generateCodeChallenge = (verifier) => {
    return crypto.createHash('sha256').update(verifier).digest('base64url');
  };
  
  // Middleware to ensure IDCS configuration is loaded
export const ensureIDCSConfig = async (req, res, next) => {
    if (!idcsConfig.authorization_endpoint) {
      await fetchIDCSConfig();
    }
    next();
  };
=======
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
>>>>>>> oci-example-rebase
