import { messageUseCase } from "@/backend/usecases/message/usecases";
import { validateCreateMessage } from "@/backend/handler/message/presenter/createMessage";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareMessages } from "./adapter/prepareMessages";
import { getToken } from "next-auth/jwt";
import { getUser } from "../user/get";
import { User } from "@/backend/entities/user/user";

// post message function
export async function post(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        let validatedMessage = await validateCreateMessage(req.body);

        if (validatedMessage instanceof Error) {
            res.status(400).json(validatedMessage.message);
            return;
        }

        let user: User;

        if (process.env.NEXT_PUBLIC_TEST_ENV !== 'true') {

          const token = await getToken({req});
          if (!token || token.dni ==''){
            res.status(400).json([]);
            return;
          }

          let fetchedUser = await getUser(token.dni!);
          if (fetchedUser instanceof Error){
            res.status(400).json([]);
            return; 
          }

          validatedMessage.originArea = fetchedUser.area ?? '';

          user = fetchedUser;
        } else {
          user = {
            role: 'admin',
            name: 'admin',
            institutionCode: validatedMessage.origin ?? '0027',
            area: 'admin',
            email: '',
            status: 'active',
            dni: '18.782.721-3'
        }
      }

        let messageResponse = await messageUseCase.handleMessage(validatedMessage, user);

        if (messageResponse instanceof Error) {
            res.status(400).json(messageResponse.message);
            return;
        }

        let preparedMessage = await prepareMessages([messageResponse]);

        if (preparedMessage instanceof Error) {
            res.status(400).json(preparedMessage.message);
            return;
        } else if (preparedMessage.length === 0) {
            res.status(400).json(new Error('No message returned'));
            return;
        }
        
        res.status(201).json(preparedMessage[0]);
        return;
      } catch (error: any) {
        console.error('Error creating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}