import { validateGetMessage } from "@/backend/presenter/message";
import { messageDetailUseCase } from "@/backend/usecases/messageDetail/usecases";
import { NextApiRequest, NextApiResponse } from "next";

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
        // let messageResponse = await messageDetailUseCase.getMessageDetail(message, count, offset)

        // /* If the message is not found, return a 404 error */
        // if (!messageResponse) {
        //   res.status(404).json(new Error('message not found'));
        //   return;
        // }

        /* Return the message */
        res.status(200).json(messageResponse);

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
      }
}


const messageResponse = {
  "messages": [{
     "id": "1234", // String - unique id of 4 digits
     "TSN": "1234", // String - TSN number of 4 digits
     "OSN": "1234", // String - OSN number of 4 digits
     "NSE": "1234", // String - NSE number of 4 digits
     "messageCode": "199", // String - message code that represent its type
     "destination": "21", // String - represents the destination institution code 
     "description": "DESCRIPTION", // String - message description
     "priority": "02", // String - message priority
     "status": "01", // String - message status
     "sender": "0123", // String - message sender institution code , 3 or 4 characters XXXX
     "creationDate": "2020-01-01", // String - message date
     "creationTime": "12:00", // String - message time
     "receiver": "02", // String - message receiver
     "receivedDate": "2020-01-01", // String - message date
     "receivedTime": "12:00", // String - message time
     "parameters": [{
           "id": "123", // String - Id of the parameter
           "name": "institutionDestination", // String - name of the parameter
           "label": "Institución de Destino", // String- label to use to show to the user
           "type": "selector",// String - type of the parameter
           "description": "Todas las instituciones posibles", // String - description of the parameter
           "placeholder": "Seleccionar institución de destino...", // String - value of the parameter
           "value": "", // String - value of the parameter
           "defaultValue": "", // String - default value of the parameter
           "validations": {
              "required": true, // Boolean - if the parameter is required
              "maxLength": 50, // Number - maximum length of the input
              "minLength": 1 // Number - minimum length of the input
           },
        },
        {
           "id": "456", // String - Id of the parameter
           "name": "userResponsable", // String - name of the parameter
           "label": "Nombre y Cargo del Responsable", // String- label to use to show to the user
           "type": "inputText",// String - type of the parameter
           "description": "Nombre y Cargo del Responsable", // String - description of the parameter
           "placeholder": "Seleccionar institución de destino...", // String - value of the parameter
           "value": "", // String - value of the parameter
           "validations": {
              "required": true, // Boolean - if the parameter is required
              "maxLength": 50, // Number - maximum length of the input
              "minLength": 2 // Number - minimum length of the input
           },
        },
        {
           "id": "789", // String - Id of the parameter
           "name": "ourReference", // String - name of the parameter
           "type": "input", // String - type of the parameter
           "label": "Nuestra Referencia", // String- label to use to show to the user
           "description": "Nuestra Referencia", // String - description of the parameter
           "value": "38DEAE3278173SDD", // String - value of the parameter
           "placeholder": "Agregar nuestra referencia..." ,// String - value of the parameter
           "validations": {
              "required": false, // Boolean - if the parameter is required
              "maxLength": 50, // Number - maximum length of the input
              "minLength": 0 // Number - minimum length of the input
           },
        },
        {
           "id": "101", // String - Id of the parameter
           "name": "yourReference", // String - name of the parameter
           "type": "input", // String - type of the parameter
           "label": "Su Referencia", // String- label to use to show to the user
           "description": "Su Referencia", // String - description of the parameter
           "value": "38DEAE3278173SDD", // String - value of the parameter
           "placeholder": "Agregar su referencia..." ,// String - value of the parameter
           "validations": {
              "required": false, // Boolean - if the parameter is required
              "maxLength": 50, // Number - maximum length of the input
              "minLength": 0 // Number - minimum length of the input
           },
        },
        {
           "id": "112", // String - Id of the parameter
           "name": "freeText", // String - name of the parameter
           "type": "longInput", // String - type of the parameter
           "label": "Texto Libre", // String- label to use to show to the user
           "description": "Texto Libre", // String - description of the parameter
           "value": "", // String - value of the parameter
           "placeholder": "Agregar texto del mensaje...", // String - value of the parameter
           "validations": {
              "required": false, // Boolean - if the parameter is required
              "maxLength": 500, // Number - maximum length of the input
              "minLength": 0 // Number - minimum length of the input
           },
        },
        {
           "id": "123", // String - Id of the parameter
           "name": "observation", // String - name of the parameter
           "type": "mediumInput", // String - type of the parameter
           "label": "Observaciones", // String- label to use to show to the user
           "description": "Observaciones", // String - description of the parameter
           "value": "", // String - value of the parameter
           "placeholder": "Agregar observaciones si se estima conveniente...", // String - value of the parameter
           "validations": {
              "required": false, // Boolean - if the parameter is required
              "maxLength": 500, // Number - maximum length of the input
              "minLength": 0 // Number - minimum length of the input
           },
        }
     ]
  }]
}