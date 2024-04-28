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
       "value": "0027",
       "label": "0027 - CORP BANCA"
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
      "title": "Enviar Mensaje",
      "actions": {
         "sendButtonDisabled": false,
         "saveDraftDisabled": false,
         "showCancelMessage": false
      },
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
            },
            "validations": {
               "maxLength": 25,
               "minLength": 1,
               "required": true
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
            "type": "date", 
            "label": "AMK: Fecha de Emisión", 
            "description": "AMK: Fecha de Emisión", 
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
      "title": "Enviar Mensaje",
      "actions": {
         "sendButtonDisabled": false,
         "saveDraftDisabled": false,
         "showCancelMessage": false
      },
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
      "id": "3", 
      "messageCode": "670", 
      "description": "ALZAMIENTO HIPOTECARIO", 
      "title": "Enviar Mensaje",
      "actions": {
         "sendButtonDisabled": true,
         "saveDraftDisabled": false,
         "showCancelMessage": false
      },
      "parameters": [
         {
            "id": "messageCode", 
            "name": "messageCode", 
            "label": "Código", 
            "type": "textField",
            "defaultValue": "670",
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
            "defaultValue": "ALZAMIENTO HIPOTECARIO",
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
            "defaultValue": "02",
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "multiple": false,
               "selected": "02",
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
            "defaultValue": "No",
            "placeholder": "", 
            "properties": {
                "name": "select",
                "columns": "4",
                "rows": "1",
                "multiple": false,
                "selected": "No",
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
            "type": "label",
            "label": "Datos de Hipoteca",
            "properties": {
               "variant": "h6",
               "isOptional": true,
               "columns": "12",
            }
         },
         {
            "id": "emissionDate", 
            "name": "emissionDate", 
            "type": "date", 
            "label": "#34Q: Fecha Alzamiento Hipotecario", 
            "description": "#34Q: Fecha Alzamiento Hipotecario", 
            "defaultValue": new Date().toLocaleDateString(), // "currentDate",
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "4",
               "disabled": true,
               "rows": "1",
            }
         },
         {
            "id": "channel", 
            "name": "channel", 
            "label": "SGA: Canal", 
            "type": "select",
            "description": "Channel select", 
            "defaultValue": "Personas",
            "placeholder": "Seleccione un Canal...", 
            "properties": {
                "name": "select",
                "columns": "4",
                "rows": "1",
                "selected": "Personas",
                "multiple": false,
                "options": [
                  {
                     "label": "Personas",
                     "value": "Personas"
                  },
                  {
                     "label": "Inmobiliarias",
                     "value": "Inmobiliarias"
                  }
               ] 
            }
         },
         {
            "id": "operationType", 
            "name": "operationType", 
            "label": "CW7: Tipo de Operación", 
            "type": "select",
            "description": "OperationType select", 
            "defaultValue": "Mutuo con Compraventa",
            "placeholder": "Seleccione un Tipo de Operación...", 
            "properties": {
                "name": "select",
                "columns": "4",
                "rows": "1",
                "selected": "Mutuo con Compraventa",
                "multiple": false,
                "options": [
                  {
                     "label": "Mutuo con Compraventa",
                     "value": "Mutuo con Compraventa"
                  },
               ] 
            }
         },
         {
            "id": "notaryRepertoire", 
            "name": "notaryRepertoire", 
            "label": "SGC: Notaria Repertorio", 
            "type": "select",
            "description": "notaryRepertoire select", 
            "defaultValue": "15001 - Conservador y Archivero de Arica",
            "placeholder": "Seleccione una Notaria Repertorio...", 
            "properties": {
                "name": "select",
                "columns": "4",
                "rows": "1",
                "selected": "15001 - Conservador y Archivero de Arica",
                "multiple": false,
                "options": [
                  {
                     "label": "15001 - Conservador y Archivero de Arica",
                     "value": "15001 - Conservador y Archivero de Arica"
                  },
               ] 
            }
         },
         {
            "id": "repertoireDate", 
            "name": "repertoireDate", 
            "label": "SGC: Fecha Repertorio", 
            "type": "date",
            "description": "Fecha de repertorio", 
            "placeholder": "", 
            "properties": {
               "name": "date",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "repertoireNumber", 
            "name": "repertoireNumber", 
            "label": "SGE: Numero Repertorio", 
            "type": "number",
            "description": "Descripción del tipo de mensaje", 
            "placeholder": "",
            "properties": {
               "name": "number",
               "columns": "4",
               "rows": "1",
            },
         },
         {
            "id": "gentlemenInstitution", 
            "name": "gentlemenInstitution", 
            "label": "CS0: Señores Institución", 
            "type": "textField",
            "defaultValue": "",
            "description": "Señores Institución", 
            "placeholder": "",
            "properties": {
               "name": "textfield",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "id": "donDonaSociety", 
            "name": "donDonaSociety", 
            "label": "SGF: Don-Doña-La Sociedad (Si corresponde)", 
            "type": "textField",
            "defaultValue": "",
            "description": "Don-Doña-La Sociedad", 
            "placeholder": "",
            "properties": {
               "name": "textfield",
               "columns": "8",
               "rows": "1",
            }
         },
         {
            "id": "rutSeller", 
            "name": "rutSeller", 
            "label": "SGG: RUT del Vendedor (Si corresponde)", 
            "type": "rut",
            "description": "RUT del Vendedor", 
            "placeholder": "",
            "properties": {
               "name": "rut",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "SG3-Linebreak",
            "name": "SG3-Linebreak",
            "type": "linebreak",
            "label": "SG3: Ha vendido a",
            "description": "SG3 Linebreak",
            "properties": {
               "name": "linebreak",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "id": "buyer",
            "name": "buyer",
            "type": "textField",
            "label": "SGH: Don-Doña-La Sociedad (Comprador o Mutuario)",
            "description": "(Comprador o Mutuario)",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "8",
               "rows": "1",
            }
         },
         {
            "id": "rutBuyer",
            "name": "rutBuyer",
            "type": "rut",
            "label": "SGI: RUT del Comprador o Mutuario",
            "description": "rutBuyer",
            "defaultValue": "",
            "placeholder": "rutBuyer",
            "properties": {
               "name": "rut",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "correspondingProperty",
            "name": "correspondingProperty",
            "type": "textField",
            "label": "SS5: Inmueble Correspondiente a",
            "description": "SS5: Inmueble Correspondiente",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "id": "E32",
            "name": "E32",
            "type": "textArea",
            "label": "E32",
            "description": "E32",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textArea",
               "columns": "12",
               "rows": "3",
               "multiline": true,
               "isOptional": true,
            }
         },
         {
            "id": "location",
            "name": "location",
            "type": "textField",
            "label": "CS6: Ubicado en",
            "description": "Ubicación",
            "defaultValue": "",
            "placeholder": "Dirección",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "region",
            "name": "region",
            "type": "select",
            "label": "CS8: Región de",
            "description": "CS8",
            "defaultValue": "",
            "placeholder": "Región",
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "options": [
                  {
                     "value": "Region Metropolitana",
                     "label": "Region Metropolitana"
                  },
                  {
                     "value": "Valparaíso",
                     "label": "Valparaíso"
                  }
               ]
            }
         },
         {
            "id": "commune",
            "name": "commune",
            "type": "select",
            "label": "CS7: Comuna de",
            "description": "commune",
            "defaultValue": "",
            "placeholder": "Comuna",
            "properties": {
               "name": "select",
               "columns": "4",
               "rows": "1",
               "options": [
                  {
                     "value": "Vitacura",
                     "label": "Vitacura"
                  },
                  {
                     "value": "Ñuñoa",
                     "label": "Ñuñoa"
                  },
                  {
                     "value": "Las Condes",
                     "label": "Las Condes"
                  },
                  {
                     "value": "Providencia",
                     "label": "Providencia"
                  },
                  {
                     "value": "Santiago",
                     "label": "Santiago"
                  },
                  {
                     "value": "La Reina",
                     "label": "La Reina"
                  },
                  {
                     "value": "La Florida",
                     "label": "La Florida"
                  }
               ]
            }
         },
         {
            "type": "linebreak",
            "label": "SGJ: Para pagar parte del precio de la compraventa, si corresponde",
            "description": "Para pagar parte del precio de la compraventa, si corresponde",
            "properties": {
               "name": "linebreak",
               "columns": "12",
               "rows": "1",
               "isOptional": true
            }
         },
         {
            "id": "bank",
            "name": "bank",
            "type": "textField",
            "label": "SGK: El Banco",
            "description": "SGK",
            "defaultValue": "CORP BANCA", // Institution by the current user
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "12",
               "rows": "1",
               "disabled": true,
            }
         },
         {
            "type": "linebreak",
            "label": "CSB: Ha otorgado a",
            "description": "CSB Linebreak",
            "properties": {
               "name": "linebreak",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "id": "person",
            "name": "person",
            "type": "textField",
            "label": "CSC: Don-Doña-La Sociedad",
            "description": "Don-Doña-La Sociedad",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "3",
               "rows": "1",
            }
         },
         {
            "id": "mutualForUF",
            "name": "mutualForUF",
            "type": "amount",
            "label": "CSD: Un mutuo por U.F.",
            "description": "CSD",
            "defaultValue": "",
            "placeholder": "0,00",
            "properties": {
               "name": "amount",
               "columns": "3",
               "rows": "1",
            }
         },
         {
            "id": "payableWithin",
            "name": "payableWithin",
            "type": "number",
            "label": "CSE: Pagadero en Plazo de (años)",
            "description": "CSE",
            "defaultValue": "",
            "placeholder": "0",
            "properties": {
               "name": "number",
               "columns": "3",
               "rows": "1",
            }
         },
         {
            "id": "complementaryMutualForUF",
            "name": "complementaryMutualForUF",
            "type": "amount",
            "label": "CSF: Un mutuo Complementario de (UF)",
            "description": "CSF",
            "defaultValue": "",
            "placeholder": "0,00",
            "properties": {
               "name": "amount",
               "currency": "uf",
               "columns": "3",
               "rows": "1",
            }
         },
         {
            "id": "CUK",
            "name": "CUK",
            "type": "textField",
            "label": "CUK: Código de Operación Interno",
            "description": "CUK",
            "defaultValue": "",
            "placeholder": "Código de Operación Interno",
            "properties": {
               "name": "textField",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "type": "linebreak",
            "label": "SGL: Nombre del Deudor",
            "description": "SG3 Linebreak",
            "properties": {
               "name": "linebreak",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "id": "debsName",
            "name": "debsName",
            "type": "textField",
            "label": "E32:",
            "description": "E32",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
               "isOptional": true,
            }
         },
         {
            "id": "debtorRut",
            "name": "debtorRut",
            "type": "rut",
            "label": "CW3: RUT del Deudor",
            "description": "SGI",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "rut",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "id": "amountUF",
            "name": "amountUF",
            "type": "amount",
            "label": "SGM: Monto UF",
            "description": "SGI",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "amount",
               "currency": "uf",
               "columns": "4",
               "rows": "1",
            }
         },
         {
            "type": "label",
            "label": "* CSL: Con objeto de cubrir eventuales diferencias que se puedan producir en\n* CSM: Las deudas que el(la) mencionado(a) Señor(A)",
            "description": "Label",
            "properties": {
               "name": "label",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "id": "designatedBank",
            "name": "designatedBank",
            "type": "textField",
            "label": "SGN: Tiene con ustedes, les señalamos que el Banco",
            "description": "SGI",
            "defaultValue": "CORP BANCA", // Institution by the current user
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "6",
               "rows": "1",
               "disabled": true
            }
         },
         {
            "id": "amountHeldByTheBank",
            "name": "amountHeldByTheBank",
            "type": "amount",
            "label": "CSO: Mantiene en su poder hasta la cantidad de $",
            "description": "Mantiene en su poder hasta la cantidad de $",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "amount",
               "currency": "clp",
               "columns": "6",
               "rows": "1",
            }
         },
         {
            "type": "label",
            "properties": {
               "variant": "body2"
            },
            "label": "CSL: Con objeto de cubrir eventuales diferencias que se puedan producir en\nCSM: Las deudas que el(la) mencionado(a) Señor(A)\nSGN: Tiene con ustedes, les señalamos que el Banco\nCSO: Mantiene en su poder hasta la cantidad de $\nCSP: Con el objeto de aplicarlo al pago de las obligaciones referidas, hasta\nCSQ: El monto señalado. Este pago se realizará contra liquidaciones\nCSR: Practicadas por Uds. Y confuntamente con la entrega del préstamo\nCSS: indicado precedentemente en el plazo antedicho.\nCST: Dicho compromiso lo cumpliremos dentro del plazo de 15 dias hábiles\nCSU: bancarios, contados desde que se encuentren debidamente inscritos el\nSGO: dominio a nombre de vendedor y comprador, si corresponde y las\nSGP: hipotecas y prohibiciones a favor de nuestro banco y previo ALZAMIENTO\nSGR: vuestro favor respecto del inmueble señalado en la escritura, para lo\nSGS: cual solicitamos a ustedes comparecer en ella\nSGT: Firma Electrónica, Enviador\nSGU: Apoderado Nombre, RUT",
         },
         {
            "type": "linebreak",
            "label": "SGT: Firma Electrónica, Enviador",
            "description": "CSB Linebreak",
            "properties": {
               "name": "linebreak",
               "margin": "none",
               "columns": "12",
               "rows": "1",
            }
         },
         {
            "id": "sign",
            "name": "sign",
            "type": "textField",
            "label": "SGU: Apoderado Nombre, RUT",
            "description": "SGI",
            "defaultValue": "-",
            "placeholder": "SGI",
            "properties": {
               "name": "textField",
               "columns": "3",
               "rows": "1",
               "disabled": true
            }
         },
         {
            "id": "moreDetails",
            "name": "moreDetails",
            "type": "textField",
            "label": "E32:",
            "description": "E32",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "12",
               "rows": "1",
               "disabled": true,
               "isOptional": true,
            }
         },
         {
            "id": "observations",
            "name": "observations",
            "type": "textArea",
            "label": "79: Observaciones",
            "description": "E32",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textArea",
               "columns": "12",
               "rows": "3",
               "multiline": true,
            }
         },
         {
            "id": "E32",
            "name": "E32",
            "type": "textField",
            "label": "E32:",
            "description": "E32",
            "defaultValue": "",
            "placeholder": "",
            "properties": {
               "name": "textField",
               "columns": "12",
               "rows": "1",
               "disabled": true,
               "isOptional": true,
            }
         },
      ],
   },
];