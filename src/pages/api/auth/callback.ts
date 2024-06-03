import { Issuer } from "openid-client";
import { setCookie } from "nookies";
import { client } from "@/backend/utils/auth";


export default async function handler(req: any, res: any) {
  try {
    
    const client_ = await client

    const params = client_.callbackParams(req);
    const tokenSet = await client_.callback('http://localhost:3000/callback', params, {});

    console.log('Token set:', tokenSet);

    const userinfoResponse = await client_.requestResource(
      "https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/oauth2/v1/userinfo",
      tokenSet.access_token!,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    const userinfo = JSON.parse(userinfoResponse.body!.toString('utf8'));
    console.log('User information:', userinfo);

    // Configura los cookies de sesión
    setCookie({ res }, "next-auth.session-token", tokenSet.access_token!, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    // Redirige a la página de inicio o a la página deseada después de la autenticación
    res.redirect("/");
  } catch (error) {
    console.error('Error in the callback:', error);
    res.status(500).send('Error in the authentication process');
  }
}
