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

/* PAYLOAD EXAMPLE
{
    “messageCode”: “136",
    “destination”: “730",
    “priority”: “02",
    “sender”: “Alexander”,
    “receiver”: “CONBCLRM323",
    “parameters”: [
        {
            “name”: “descriptionTypeMessage”,
            “label”: “Descripción”,
            “value”: “TRANSFERENCIA DE FONDOS INDIVIDUAL”
        },
        {
            “name”: “authetication”,
            “label”: “Autenticación”,
            “value”: “no”
        },
        {
            “name”: “phoneNumber”,
            “label”: “22: Teléfono”,
            “value”: “9999999”
        },
        {
            “name”: “reference”,
            “label”: “20: Nuestra Referencia”,
            “value”: “TESTTEST”
        },
        {
            “name”: “institutionName”,
            “label”: “AF1: Nombre de Institución”,
            “value”: “0027 CORP BANCA”
        },
        {
            “name”: “modality”,
            “label”: “JAE Modalidad”,
            “value”: “L (En Vivo)”
        },
        {
            “name”: “transmitter”,
            “label”: “AMI: BIC Emisor”,
            “value”: “CONBCLRM323”
        },
        {
            “name”: “emissionDate”,
            “label”: “AMK: Fecha de Emisión”,
            “value”: “4/8/2024”
        },
        {
            “name”: “typeOfCurrency”,
            “label”: “OP2: Tipo de Moneda (ISO 4217)“,
            “value”: “clp”
        },
        {
            “name”: “openrationAmount”,
            “label”: “OP3: Monto de Operación”,
            “value”: “999999"
        },
        {
            “name”: “observations”,
            “label”: “79: Observaciones”,
            “value”: “TESTTEST”
        }
    ]
}*/