import { validateGetMessage } from "@/backend/presenter/message";
import { messageUseCase } from "@/backend/usecases/message/usecases";
import { NextApiRequest, NextApiResponse } from "next";


// get message function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {

        /* Validate the query params and get the Message */
        // let result = validateGetMessage(req.query);

        // if (result instanceof Error) {
        //   res.status(400).json(result);
        //   return;
        // }

        // let [message, count, offset] = result;

        // /* Use the PrismaAreaAdapter to get the Message from the database */
        // let messageResponse = await messageUseCase.getMessage(message, count, offset)

        // /* If the message is not found, return a 404 error */
        // if (messageResponse instanceof Error) {

        //   res.status(404).json(messageResponse);
        //   return;
        // }

        /* Return the message */
        res.status(200).json(messageResponse);
        return;

      } catch (error) {

        console.error('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}

var messageResponse = {
    "messages": [
          {
            "id": "10123",
            "TSN": "10123",
            "OSN": "10123",
            "NSE": "",
            "NSR": "",
            "NSQ": "",
            "messageCode": "136",
            "destination": "",
            "description": "TRANSFERENCIA DE FONDOS INDIVIDUAL",
            "priority": "",
            "status": "07",
            "sender": "Santander",
            "creationDate": "21/01/2024",
            "creationTime": "11:00",
            "receiver": "",
            "receivedDate": "21/01/2024",
            "receivedTime": "11:00",
            "documents": "",
            "actions": ""
          },
          {
            "id": "10124",
            "TSN": "10124",
            "OSN": "10124",
            "NSE": "",
            "NSR": "",
            "NSQ": "",
            "messageCode": "140",
            "destination": "",
            "description": "SOLICITUDES DE REEMBOLSO",
            "priority": "",
            "status": "07",
            "sender": "HSBC",
            "creationDate": "21/01/2024",
            "creationTime": "09:03",
            "receiver": "",
            "receivedDate": "21/01/2024",
            "receivedTime": "09:03",
            "documents": "",
            "actions": ""
          },
          {
            "id": "20125",
            "TSN": "20125",
            "OSN": "20125",
            "NSE": "",
            "NSR": "",
            "NSQ": "",
            "messageCode": "142",
            "destination": "",
            "description": "COMPROMISOS FUTUROS",
            "priority": "",
            "status": "07",
            "sender": "BCI",
            "creationDate": "21/01/2024",
            "creationTime": "10:12",
            "receiver": "",
            "receivedDate": "21/01/2024",
            "receivedTime": "10:12",
            "documents": "",
            "actions": ""
          },
          {
            "id": "30126",
            "TSN": "30126",
            "OSN": "30126",
            "NSE": "",
            "NSR": "",
            "NSQ": "",
            "messageCode": "226",
            "destination": "",
            "description": "ESTADO SALDOS NETOS RESUMIDOS (BANC...",
            "priority": "",
            "status": "07",
            "sender": "Banco Itaú",
            "creationDate": "21/01/2024",
            "creationTime": "12:12",
            "receiver": "",
            "receivedDate": "21/01/2024",
            "receivedTime": "12:12",
            "documents": "",
            "actions": ""
          },
          {
            "id": "20127",
            "TSN": "20127",
            "OSN": "20127",
            "NSE": "",
            "NSR": "",
            "NSQ": "",
            "messageCode": "241",
            "destination": "",
            "description": "CAJEROS-SALDOS NETOS",
            "priority": "",
            "status": "07",
            "sender": "JP Morgan",
            "creationDate": "20/01/2024",
            "creationTime": "15:10",
            "receiver": "",
            "receivedDate": "20/01/2024",
            "receivedTime": "15:10",
            "documents": "",
            "actions": "",
          },
          {
             "id": "10128",
             "TSN": "10128",
             "OSN": "10128",
             "NSE": "",
             "NSR": "",
             "NSQ": "",
             "messageCode": "136",
             "destination": "ESTADO SALDOS NETOS RESUMIDOS (BANC...",
             "description": "Security",
             "priority": "",
             "status": "07",
             "sender": "",
             "creationDate": "20/01/2024",
             "creationTime": "13:01",
             "receiver": "",
             "receivedDate": "20/01/2024",
             "receivedTime": "13:01",
             "documents": "",
             "actions": ""
           },
           {
             "id": "13010",
             "TSN": "13010",
             "OSN": "13010",
             "NSE": "",
             "NSR": "",
             "NSQ": "",
             "messageCode": "107",
             "destination": "ACEPTACIÓN ALZAMIENTO HIPOTECARIO.",
             "description": "En Proceso",
             "priority": "",
             "status": "07",
             "sender": "Banco de Chile",
             "creationDate": "20/01/2024",
             "creationTime": "11:00",
             "receiver": "",
             "receivedDate": "20/01/2024",
             "receivedTime": "11:00",
             "documents": "",
             "actions": ""
           }
    ]
}

