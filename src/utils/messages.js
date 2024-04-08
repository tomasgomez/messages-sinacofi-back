// Message API Documentation

const messages = {
   "messages": [{
      "id": "1234", // String - unique id of 4 digits
      "TSN": "1234", // String - TSN number of 4 digits
      "OSN": "1234", // String - OSN number of 4 digits
      "NSE": "1234", // String - NSE number of 4 digits
      "NSR": "1234", // String - NSR number of 4 digits
      "NSQ": "1234", // String - NSQ number of 4 digits
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
      "documents": "1", // String - number of documents
      "actions": "1", // String - number of actions
   }]
}

const messagesExamples = {
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
           "actions": "",
           "parameters": []
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