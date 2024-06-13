import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { validateTokenIamOracle } from "@/backend/adapters/iam/oracle/validateTokenIamOracle";
import { TokenInvalidError } from "@/backend/exceptions/validateSign/TokenInvalidError";

type Request = NextApiRequest & {
  query:{
    password: string
  }
}

// put message function
export async function validate(req: Request, res: NextApiResponse < any > ) {
    try {
        const token = await getToken({req});
        const { password } = req.query;
        
        if(!token){
          throw new TokenInvalidError('Token not found');
        }
        let dni: string='';
        if(token?.dni){
          // TODO: value object para validar DNI
          dni = token.dni;
        }

        await validateTokenIamOracle(dni, password)

        res.status(200).json('Valid signature');
        return;

    } catch (error: any | TokenInvalidError) {
        console.error({
          status: error.status, 
          message: error.message,
          exception: error.exception,
          stack: error.stack
        });
        res.status(error.status || 500).json(error.message);
    }
}