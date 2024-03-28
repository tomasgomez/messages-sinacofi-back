const schema = {
   "messageSchemas": [{
      "id": "1", 
      "messageCode": "199", 
      "description": "DESCRIPTION", 
      "parameters": [{
            "id": "123", 
            "name": "institutionDestination", 
            "label": "Institución de Destino", 
            "type": "selector",
            "description": "Todas las instituciones posibles", 
            "placeholder": "Seleccionar institución de destino...", 
            "properties": {
                "name": "selector",
                "column": "2",
                "row": "2",
                "multiple": false,
                "options": [
                    {
                        "label": "",
                        "value": ""
                    }
                ] 
            }
         },
         {
            "id": "456", 
            "name": "userResponsable", 
            "type": "input", 
            "label": "Nombre y Cargo del Responsable", 
            "description": "Nombre y Cargo del Responsable", 
            "value": "Juan Perez", 
            "placeholder": "Agregar nombre y cargo del responsable..." 
         },
         {
            "id": "789", 
            "name": "ourReference", 
            "type": "input", 
            "label": "Nuestra Referencia", 
            "description": "Nuestra Referencia", 
            "value": "38DEAE3278173SDD", 
            "placeholder": "Agregar nuestra referencia..." 
         },
         {
            "id": "101", 
            "name": "yourReference", 
            "type": "input", 
            "label": "Su Referencia", 
            "description": "Su Referencia", 
            "value": "38DEAE3278173SDD", 
            "placeholder": "Agregar su referencia..." 
         },
         {
            "id": "112", 
            "name": "freeText", 
            "type": "longInput", 
            "label": "Texto Libre", 
            "description": "Texto Libre", 
            "value": "", 
            "placeholder": "Agregar texto del mensaje..." 
         },
         {
            "id": "123", 
            "name": "observation", 
            "type": "mediumInput", 
            "label": "Observaciones", 
            "description": "Observaciones", 
            "value": "", 
            "placeholder": "Agregar observaciones si se estima conveniente..." 
         }
      ]
   }]
}