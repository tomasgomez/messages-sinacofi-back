const institutionOptions = [
   {
       "value": "350",
       "label": "350 - SEC.PRINCI"
   },
   {
       "value": "729",
       "label": "729 - LOS HEROES"
   },
   {
       "value": "600",
       "label": "600 - INKAS ETV"
   },
   {
       "value": "732",
       "label": "732 - TAPP"
   },
   {
       "value": "730",
       "label": "730 - TENPO SA"
   },
   {
       "value": "265",
       "label": "265 - D.C.V."
   },
   {
       "value": "601",
       "label": "601 - BRINK'S"
   },
   {
       "value": "0016",
       "label": "0016 - BCI"
   },
   {
       "value": "0037",
       "label": "0037 - SAN"
   },
   {
       "value": "0031",
       "label": "0031 - HSBC"
   },
   {
       "value": "0039",
       "label": "0039 - ITAÚ"
   },
   {
       "value": "0041",
       "label": "0041 - JPM"
   },
   {
       "value": "0049",
       "label": "0049 - SECURITY"
   },
   {
       "value": "0051",
       "label": "0051 - FALABELLA"
   }
];

export const messageSchemas = [
   {
      "id": "1", 
      "messageCode": "136", 
      "description": "TRANSFERENCIA DE FONDOS INDIVIDUAL", 
      "parameters": [
         {
            "id": "messageCode", 
            "name": "messageCode", 
            "label": "Código", 
            "type": "textField",
            "defaultValue": "136",
            "description": "Código del tipo de mensaje", 
            "placeholder": "-",
            "properties": {
               "name": "textfield",
               "columns": "3",
               "disabled": true,
               "rows": "1",
            }
         },
         {
            "id": "descriptionTypeMessage", 
            "name": "descriptionTypeMessage", 
            "label": "Descripción", 
            "type": "textField",
            "defaultValue": "TRANSFERENCIA DE FONDOS INDIVIDUAL",
            "description": "Descripción del tipo de mensaje", 
            "placeholder": "Seleccione el tipo de mensaje",
            "properties": {
               "name": "textfield",
               "columns": "9",
               "rows": "1",
               "disabled": true,
            }
         },
         {
            "id": "receiver", 
            "name": "receiver", 
            "label": "Institución de Destino", 
            "type": "select",
            "defaultValue": "",
            "description": "Todas las instituciones posibles", 
            "placeholder": "Seleccionar institución de destino...", 
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "multiple": false,
               "options": institutionOptions,
            }
         },
         {
            "id": "priority", 
            "name": "priority", 
            "label": "Prioridad", 
            "type": "select",
            "description": "Todas las prioridades posibles", 
            "placeholder": "Seleccionar prioridad...", 
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "multiple": false,
               "options": [
                  {
                     "label": "02 - Normal Sin Aviso de Entrega",
                     "value": "02",
                  }
               ] 
            }
         },
         {
            "id": "authetication", 
            "name": "authetication", 
            "label": "Autenticación", 
            "type": "select",
            "description": "Autenticacion select", 
            "defaultValue": "no",
            // "placeholder": "Seleccionar institución de destino...", 
            "properties": {
                "name": "select",
                "columns": "4",
                "rows": "1",
                "multiple": false,
                "options": [
                  {
                     "label": "Sí",
                     "value": "Sí"
                  },
                  {
                     "label": "No",
                     "value": "No"
                  }
               ] 
            }
         },
         {
            "id": "responsible", // Quien envia
            "name": "responsible", 
            "type": "textField", 
            "label": "Nombre y Cargo del Responsable", 
            "description": "Nombre y Cargo del Responsable",
            "defaultValue": "",
            "placeholder": "Agregar nombre y cargo del responsable...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "phoneNumber", 
            "name": "phoneNumber", 
            "type": "phoneNumber", 
            "label": "22: Teléfono", 
            "validations": {
               "pattern": /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/
            },
            "description": "Telefono", 
            "value": "",
            // "placeholder": "Agregar nombre y cargo del responsable...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "reference", 
            "name": "reference", 
            "type": "textField", 
            "label": "20: Nuestra Referencia", 
            "description": "Referencia", 
            "value": "", 
            "placeholder": "Agregar referencia...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "institutionName", 
            "name": "institutionName", 
            "type": "textField", 
            "label": "AF1: Nombre de Institución", 
            "description": "Nombre de la institución", 
            "defaultValue": "CORP BANCA", 
            "placeholder": "Ingrese el nombre de la institución...",
            "properties": {
               "name": "textField",
               "disabled": true,
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "modality", 
            "name": "modality", 
            "type": "textField", 
            "label": "JAE Modalidad", 
            "description": "JAE Modalidad", 
            "value": "", 
            // "placeholder": "Agregar referencia...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "transmitterReference", 
            "name": "transmitterReference", 
            "type": "textField", 
            "label": "AMI: BIC Emisor", 
            "description": "AMI: BIC Emisor", 
            "value": "",
            "defaultValue": "CONBCLRM323",
            // "placeholder": "Agregar referencia...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
               "disabled": true,
            }
         },
         {
            "id": "receiverReference", 
            "name": "receiverReference", 
            "type": "textField", 
            "label": "AMJ: BIC Receptor", 
            "description": "AMJ: BIC Receptor", 
            "value": "",
            "defaultValue": "CONBCLRM323",
            // "placeholder": "Agregar referencia...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "emissionDate", 
            "name": "emissionDate", 
            "type": "textField", 
            "label": "AMK: Fecha de Emisión", 
            "description": "AMK: Fecha de Emisión", 
            "value": "",
            "defaultValue": new Date().toLocaleDateString(),
            // "defaultValue": "currentDate",
            // "placeholder": "Agregar referencia...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "disabled": true,
               "rows": "1",
            }
         },
         {
            "id": "typeOfCurrency", 
            "name": "typeOfCurrency", 
            "type": "select", 
            "label": "OP2: Tipo de Moneda (ISO 4217)", 
            "description": "OP2: Tipo de Moneda (ISO 4217)", 
            "value": "",
            "defaultValue": "clp",
            // "placeholder": "Agregar referencia...",
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "options": [
                  {
                     "label": "Peso Chileno (CLP)",
                     "value": "clp"
                  },
                  {
                     "label": "Unidad de Fomento (UF)",
                     "value": "uf"
                  }
               ]
            }
         },
         {
            "id": "openrationAmount", 
            "name": "openrationAmount", 
            "type": "amount", 
            "label": "OP3: Monto de Operación", 
            "description": "OP3: Monto de Operación", 
            "value": "",
            "defaultValue": "434,324.03",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "observations", 
            "name": "observations", 
            "type": "textArea", 
            "label": "79: Observaciones", 
            "description": "79: Observaciones", 
            "value": "",
            "placeholder": "Agregar observaciones si se estima conveniente...",
            "properties": {
               "name": "textArea",
               "columns": "12",
               "rows": "4",
               "multiline": true,
            }
         },
      ]
   },
   {
      "id": "2", 
      "messageCode": "199", 
      "description": "TEXTO LIBRE", 
      "parameters": [
         {
            "id": "messageCode", 
            "name": "messageCode", 
            "label": "Código", 
            "type": "textField",
            "defaultValue": "199",
            "description": "Código del tipo de mensaje", 
            "placeholder": "-",
            "properties": {
               "name": "textfield",
               "columns": "3",
               "disabled": true,
               "rows": "1",
            }
         },
         {
            "id": "descriptionTypeMessage", 
            "name": "descriptionTypeMessage", 
            "label": "Descripción", 
            "type": "textField",
            "defaultValue": "TEXTO LIBRE",
            "description": "Descripción del tipo de mensaje", 
            "placeholder": "Seleccione el tipo de mensaje",
            "properties": {
               "name": "textfield",
               "columns": "9",
               "rows": "1",
               "disabled": true,
            }
         },
         {
            "id": "receiver", 
            "name": "receiver", 
            "label": "Institución de Destino", 
            "type": "select",
            "description": "Todas las instituciones posibles", 
            "placeholder": "Seleccionar institución de destino...", 
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "multiple": false,
               "options": institutionOptions,
            }
         },
         {
            "id": "priority", 
            "name": "priority", 
            "label": "Prioridad", 
            "type": "select",
            "description": "Todas las prioridades posibles", 
            "placeholder": "Seleccionar prioridad...", 
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "multiple": false,
               "options": [
                  {
                     "label": "02 - Normal Sin Aviso de Entrega",
                     "value": "02",
                  }
               ] 
            }
         },
         {
            "id": "authetication", 
            "name": "authetication", 
            "label": "Autenticación", 
            "type": "select",
            "description": "Autenticacion select", 
            "defaultValue": "no",
            // "placeholder": "Seleccionar institución de destino...", 
            "properties": {
                "name": "select",
                "columns": "4",
                "rows": "1",
                "multiple": false,
                "options": [
                  {
                     "label": "Sí",
                     "value": "Sí"
                  },
                  {
                     "label": "No",
                     "value": "No"
                  }
               ] 
            }
         },
         {
            "id": "responsible", 
            "name": "responsible", 
            "type": "textField", 
            "label": "Nombre y Cargo del Responsable", 
            "description": "Nombre y Cargo del Responsable", 
            "value": "", 
            "placeholder": "Agregar nombre y cargo del responsable...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "ourReference", 
            "name": "ourReference", 
            "type": "textField", 
            "label": "20: Nuestra Referencia", 
            "description": "Nuestra referencia", 
            "value": "", 
            "placeholder": "Agregar referencia...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "yourReference", 
            "name": "yourReference", 
            "type": "textField", 
            "label": "20: Su Referencia", 
            "description": "Su referencia", 
            "value": "", 
            "placeholder": "Agregar referencia...",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "freeText", 
            "name": "freeText", 
            "type": "textArea", 
            "label": "79D: Texto Libre", 
            "description": "79: Texto Libre", 
            "value": "",
            "placeholder": "Agregar texto del mensaje...",
            "properties": {
               "name": "textArea",
               "columns": "12",
               "rows": "8",
               "multiline": true,
            }
         },
         {
            "id": "observations", 
            "name": "observations", 
            "type": "textArea", 
            "label": "79: Observaciones", 
            "description": "79: Observaciones", 
            "value": "",
            "placeholder": "Agregar observaciones si se estima conveniente...",
            "properties": {
               "name": "textArea",
               "columns": "12",
               "rows": "4",
               "multiline": true,
            }
         },
      ]
   }
];