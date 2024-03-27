// Message API Documentation

const messages = {
   "messages": [{
      "id": "1234", // String - unique id of 4 digits
      "messageCode": "199", // String - message code that represent its type
      "destination": "21", // String - represents the destination institution code 
      "description": "DESCRIPTION", // String - message description
      "priority": "02", // String - message priority
      "status": "01", // String - message status
      "date": "2020-01-01", // String - message date
      "time": "12:00", // String - message time
      "sender": "0123", // String - message sender institution code , 3 or 4 characters XXXX
      "receiver": "02", // String - message receiver
      "parameters": [{
            "id": "123", // String - Id of the parameter
            "name": "institutionDestination", // String - name of the parameter
            "type": "selector", // String - type of the parameter
            "label": "Institución de Destino", // String- label to use to show to the user
            "description": "Todas las instituciones posibles", // String - description of the parameter
            "options": [
               "21",
               "02",
               "11"
            ], // String - different kind of options for the selector
            "placeholder": "Seleccionar institución de destino..." // String - value of the parameter
         },
         {
            "id": "456", // String - Id of the parameter
            "name": "userResponsable", // 
            "type": "input", // String - type of the parameter
            "label": "Nombre y Cargo del Responsable", // String- label to use to show to the user
            "description": "Nombre y Cargo del Responsable", // String - description of the parameter
            "value": "Juan Perez", // String - value of the parameter
            "placeholder": "Agregar nombre y cargo del responsable..." // String - value of the parameter
         },
         {
            "id": "789", // String - Id of the parameter
            "name": "ourReference", // String - name of the parameter
            "type": "input", // String - type of the parameter
            "label": "Nuestra Referencia", // String- label to use to show to the user
            "description": "Nuestra Referencia", // String - description of the parameter
            "value": "38DEAE3278173SDD", // String - value of the parameter
            "placeholder": "Agregar nuestra referencia..." // String - value of the parameter
         },
         {
            "id": "101", // String - Id of the parameter
            "name": "yourReference", // String - name of the parameter
            "type": "input", // String - type of the parameter
            "label": "Su Referencia", // String- label to use to show to the user
            "description": "Su Referencia", // String - description of the parameter
            "value": "38DEAE3278173SDD", // String - value of the parameter
            "placeholder": "Agregar su referencia..." // String - value of the parameter
         },
         {
            "id": "112", // String - Id of the parameter
            "name": "freeText", // String - name of the parameter
            "type": "longInput", // String - type of the parameter
            "label": "Texto Libre", // String- label to use to show to the user
            "description": "Texto Libre", // String - description of the parameter
            "value": "", // String - value of the parameter
            "placeholder": "Agregar texto del mensaje..." // String - value of the parameter
         },
         {
            "id": "123", // String - Id of the parameter
            "name": "observation", // String - name of the parameter
            "type": "mediumInput", // String - type of the parameter
            "label": "Observaciones", // String- label to use to show to the user
            "description": "Observaciones", // String - description of the parameter
            "value": "", // String - value of the parameter
            "placeholder": "Agregar observaciones si se estima conveniente..." // String - value of the parameter
         }
      ]
   }]
}