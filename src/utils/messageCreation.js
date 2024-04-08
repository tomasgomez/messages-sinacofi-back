const messageCreation = {
    "messageCode": "199",
    "destination": "21",
    "priority": "02",
    "status": "sent",
    "sender": "0123", // institutionId
    "receiver": "02",
    "receivedDate": "2020-01-01",
    "receivedTime": "12:00",
    "parameters": [
        {
            "label": "Institution",
            "name": "institutionDestination",
            "value": "0111",
        },
        {
            "id": "456",
            "name": "userResponsable",
            "label": "Nombre y Cargo del Responsable",
            "type": "inputText",
            "description": "Nombre y Cargo del Responsable",
            "placeholder": "Seleccionar institución de destino...",
            "value": "",
            "validations": {
                "required": true,
                "maxLength": 50,
                "minLength": 2
            }
        },
        {
            "id": "789",
            "name": "ourReference",
            "type": "input",
            "label": "Nuestra Referencia",
            "description": "Nuestra Referencia",
            "value": "38DEAE3278173SDD",
            "placeholder": "Agregar nuestra referencia...",
            "validations": {
                "required": false,
                "maxLength": 50,
                "minLength": 0
            }
        },
        {
            "id": "101",
            "name": "yourReference",
            "type": "input",
            "label": "Su Referencia",
            "description": "Su Referencia",
            "value": "38DEAE3278173SDD",
            "placeholder": "Agregar su referencia...",
            "validations": {
                "required": false,
                "maxLength": 50,
                "minLength": 0
            }
        },
        {
            "id": "112",
            "name": "freeText",
            "type": "longInput",
            "label": "Texto Libre",
            "description": "Texto Libre",
            "value": "",
            "placeholder": "Agregar texto del mensaje...",
            "validations": {
                "required": false,
                "maxLength": 500,
                "minLength": 0
            }
        },
        {
            "id": "123",
            "name": "observation",
            "type": "mediumInput",
            "label": "Observaciones",
            "description": "Observaciones",
            "value": "",
            "placeholder": "Agregar observaciones si se estima conveniente...",
            "validations": {
                "required": false,
                "maxLength": 500,
                "minLength": 0
            }
        }
    ]
}