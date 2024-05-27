import axios from "axios";
import { Idcs, getIDCSURL } from "../../entities/idcs";



export const getUser = async (idcs: Idcs, token: string): Promise<any | Error> => {
    try {
        // get the url
        const url = getIDCSURL(idcs, false, 'userinfoEndpoint');
        if (url instanceof Error){
            console.log(url);
            return url;
        }
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}`},
        });

        return response.data;
    }catch (error){
        console.log(error);
        return error;
    }

}