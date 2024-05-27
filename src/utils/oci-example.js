const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const crypto = require('crypto');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();

// Session setup
app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

const clientId = '170d6a37e12c41e789c3fac3ceca653f';
const clientSecret = 'beb6a6c4-8d38-46a4-a3fe-167c3f6b2fe0';
const redirectUri = 'http://localhost:3000/callback';
let idcsConfig = {};

// Fetch the IDCS configuration
const fetchIDCSConfig = async () => {
  try {
    const response = await axios.get('https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/idcs-configuration');
    idcsConfig = response.data['openid-configuration'];
  } catch (error) {
    console.error('Error fetching IDCS configuration:', error);
  }
};

// Get the IDCS URL based on secure or non-secure environment
const getIDCSURL = (isSecure, urlName) => {
  let urlConfig =  {
    authorizationEndpoint: isSecure ? idcsConfig.secure_authorization_endpoint : idcsConfig.authorization_endpoint,
    tokenEndpoint: isSecure ? idcsConfig.secure_token_endpoint : idcsConfig.token_endpoint,
    userinfoEndpoint: isSecure ? idcsConfig.secure_userinfo_endpoint : idcsConfig.userinfo_endpoint,
    jwksUri: isSecure ? idcsConfig.secure_jwks_uri : idcsConfig.jwks_uri,
  };
  return urlConfig[urlName];
};

const getUserFromOCI = async (access_token) => {
  const url = getIDCSURL(false, 'userinfoEndpoint');
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};

const getUser = async (userDni) => {
  const dniRequest = userDni.split('-')[0];
  const url = 'http://34.133.3.2:3001/api/user?dni=' + dniRequest;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return response.data[0];

}


const generateCodeVerifier = () => {
  return crypto.randomBytes(32).toString('base64url');
};

const generateCodeChallenge = (verifier) => {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
};

// Middleware to ensure IDCS configuration is loaded
const ensureIDCSConfig = async (req, res, next) => {
  if (!idcsConfig.authorization_endpoint) {
    await fetchIDCSConfig();
  }
  next();
};

// Home route to initiate login
app.get('/', ensureIDCSConfig, (req, res) => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Store the codeVerifier in the session
  req.session.codeVerifier = codeVerifier;
  const url = getIDCSURL(false, 'authorizationEndpoint');
  const authUrl = `${url}?` + 
    qs.stringify({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'openid profile email groups',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });
  
  res.redirect(authUrl);
});

// Function to refresh the token
const refreshToken = async (refreshToken) => {
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
const validateToken = async (token) => {
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

// Callback route
app.get('/callback', ensureIDCSConfig, async (req, res) => {
  const { code } = req.query;
  const codeVerifier = req.session.codeVerifier;
  const url = getIDCSURL(false, 'tokenEndpoint');

  try {
    const tokenResponse = await axios.post(url, qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
      code_verifier: codeVerifier,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // Validate the token (sub could be used to identify the user)
    const tokenDecoded = await validateToken(access_token);

    // Store tokens and user info in the session
    req.session.access_token = access_token;
    req.session.refresh_token = refresh_token;
    
    // get user info 
    const userInfo = await getUserFromOCI(access_token);
    req.session.user_info = userInfo;

    res.redirect('/userInfo');

  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).send('Error during authentication');
  }
});

// userInfo route
app.get('/userInfo', ensureIDCSConfig, async (req, res) => {
  try {
    let { access_token, refresh_token } = req.session;

    // Validate the token
    try {
      await validateToken(access_token);
    } catch (error) {
      console.log('Access token expired, refreshing token...');
      const tokenData = await refreshToken(refresh_token);
      access_token = tokenData.access_token;
      refresh_token = tokenData.refresh_token;

      // Validate the new token
      user_info = await validateToken(access_token);

      // Update the session with new tokens
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      req.session.user_info = user_info;

    }
    // get userInfo from admin
    const user_info = await getUser(req.session.user_info.preferred_username);

    console.log('User info:', user_info);


    res.json(user_info);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.redirect('/');
  }
});

const PORT = 3000;
app.listen(PORT, async () => {
  await fetchIDCSConfig();
  console.log(`Server is running on http://localhost:${PORT}`);
});
