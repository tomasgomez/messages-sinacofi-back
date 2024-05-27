import { Idcs } from "../entities/idcs";
import { JwtPayload } from 'jsonwebtoken';
export interface IAMOracleAPI {
    wellKnownURL: string,
    getWellKnown(): Promise<Idcs | Error>,
    getUser(idcs: Idcs, token: string): Promise<any | Error>,
    refreshToken(idcs: Idcs, token: string): Promise<any | Error>,
    validateToken(idcs: Idcs, token: string): Promise<JwtPayload | Error>
    authCode(idcs: Idcs,code: string, codeChallenge: string): Promise<any | Error>
}