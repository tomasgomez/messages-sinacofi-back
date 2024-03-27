const schema = {
   "messageTypes": [
    {
      "id": "1", // String - unique id
      "messageCode": "199", // String - message code that represent its type
      "description": "DESCRIPTION", // String - message description
      "parameters": [{
            "id": "123", // String - Id of the parameter
            "name": "institutionDestination", // String - name of the parameter
            "label": "Institución de Destino", // String- label to use to show to the user
            "type": "selector",// String - type of the parameter
            "description": "Todas las instituciones posibles", // String - description of the parameter
            "placeholder": "Seleccionar institución de destino...", // String - value of the parameter
            "properties": {
                "name": "selector", // String - name of the parameter
                "column": "2",  // String - number of columns
                "row": "2", // String - number of rows
                "multiple": false, // Boolean - multiple selection
                "options": [
                    {
                        "label": "",
                        "value": ""
                    }
                ] // String - different kind of options for the selector
            }
         },
         {
            "id": "456", // String - Id of the parameter
            "name": "userResponsable", // String - name of the parameter
            "label": "Nombre y Cargo del Responsable", // String- label to use to show to the user
            "type": "inputText",// String - type of the parameter
            "description": "Nombre y Cargo del Responsable", // String - description of the parameter
            "placeholder": "Seleccionar institución de destino...", // String - value of the parameter
            "value": "", // String - value of the parameter
            "properties": {
                "name": "inputText", // String - name of the parameter
                "column": "3",  // String - number of columns
                "row": "1", // String - number of rows
                "maxLength": "50" ,// String - maximum length of the input
                "minLength": "0", // String - minimum length of the input
                "isOptional": false // Boolean - if the input is optional
            }
         },
         
         {
            "id": "456", // String - Id of the parameter
            "name": "userResponsable", // String - name of the parameter
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