import { messageUseCase } from "@/backend/usecases/message/usecases";
import { validateUpdateMessage } from "@/backend/handler/messageSign/presenter/updateMessage";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareMessages } from "./adapter/prepareMessages";
import { getToken } from "next-auth/jwt";

// put message function
export async function sign(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        const token = await getToken({req});
        console.log('TOKEN', token);
        
        let dni: string='';
        let name: string='';
        if(token?.dni){
            dni = token.dni;
        } 
        if(token?.name){
            name= token.name;
        } 
        let message = validateUpdateMessage(req.body);

        if (message instanceof Error) {
            res.status(400).json(message);
            return;
        }
        let messageResponse = await messageUseCase.signMessage(message, dni, name);

        if (messageResponse instanceof Error) {
            res.status(400).json(messageResponse);
            return;
        }
        let messages = prepareMessages([messageResponse]);

        if (messages instanceof Error) {
            res.status(400).json(messages);
            return;
        } else if (messages.length === 0) {
            res.status(400).json(new Error('No message returned'));
            return;
        }

        res.status(200).json(messages[0]);
        return;

    } catch (error) {
        console.error('Error updating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}