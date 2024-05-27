import { getIDCSURL, Idcs } from "../../../iamOracle/entities/idcs";

export const createAuthURL = (idcs: Idcs, codeChallenge: string): string => {
    const url = getIDCSURL(idcs, false, 'authorizationEndpoint');
    if (url instanceof Error) {
        console.log("Error creating URL")
        return '/'
    }

    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.IAM_CLIENT_ID || '',
      redirect_uri: process.env.IAM_REDIRECT_URL || '',
      scope: 'openid profile email groups',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    }) 
    
    const authUrl = `${url}?` + queryParams

    return authUrl
}
