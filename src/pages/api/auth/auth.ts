import { client } from "@/backend/utils/auth";



export default async function handler(req: any, res: any) {


  const authorizationUrl =  (await client).authorizationUrl({
    scope: "openid offline_access email profile"
  });

  res.redirect(authorizationUrl);
}