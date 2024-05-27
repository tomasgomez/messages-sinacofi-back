import { Idcs } from "../entities/idcs";
import { IAMOracleAPI } from "./interface";
import { getUser } from "./methods/getUser";
import { getWellKnown } from "./methods/getWellknown";
import { refreshToken } from "./methods/refreshToken";
import { validateToken } from "./methods/validateToken";
import { authCode } from "./methods/authCode";



export class IAMOracle implements IAMOracleAPI {
    wellKnownURL: string;
    constructor(readonly url: string){
        this.wellKnownURL = url
    }

    getWellKnown = async (): Promise<Idcs | Error> => await getWellKnown(this.wellKnownURL);

    getUser = async (idcs: Idcs, token: string): Promise<any | Error>  => await getUser(idcs, token);

    refreshToken = async (idcs: Idcs, token: string): Promise<any | Error>  => await refreshToken(idcs, token);
        
    validateToken = async (idcs: Idcs, token: string): Promise<any | Error>  => await validateToken(idcs, token);

    authCode = async (idcs: Idcs,code: string, codeChallenge: string): Promise<any | Error> => await authCode(idcs, code, codeChallenge);
}

export const iamOracleAPI = new IAMOracle(process.env.IAM_BASE_URL || '');