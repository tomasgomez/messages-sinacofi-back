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
                      "value": "mutuoConCompraVenta",
                      "label": "Mutuo con compraventa"
                  },
                  {
                      "value": "mutuoSinCompraVenta",
                      "label": "Mutuo sin compraventa"
                  },
                  {
                      "value": "letraHipotecariaConCompraVenta",
                      "label": "Letra Hipotecaria con compraventa"
                  },
                  {
                      "value": "letraHipotecariaSinCompraVenta",
                      "label": "Letra Hipotecaria sin compraventa"
                  }
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
                      "value": "ConservadorYArchiveroDeAltoHospicio",
                      "label": "Conservador Y Archivero De Alto Hospicio"
                  },
                  {
                      "value": "ConservadorYArchiveroDeLosVilos",
                      "label": "Conservador Y Archivero De Los Vilos"
                  },
                  {
                      "value": "20MaNotariaDeSantiago",
                      "label": "20Ma Notaria De Santiago"
                  },
                  {
                      "value": "2DaNotaria",
                      "label": "2Da Notaria"
                  },
                  {
                      "value": "3RaNotariaDeChillan",
                      "label": "3Ra Notaria De Chillan"
                  },
                  {
                      "value": "ConservadorYArchiveroDePozoAlmonte",
                      "label": "Conservador Y Archivero De Pozo Almonte"
                  },
                  {
                      "value": "NotariaDePozoAlmonte",
                      "label": "Notaria De Pozo Almonte"
                  },
                  {
                      "value": "Cbr,ComercioYArchiveroDeAntofagasta",
                      "label": "Cbr, Comercio Y Archivero De Antofagasta"
                  },
                  {
                      "value": "1RaNotariaDeAntofagasta",
                      "label": "1Ra Notaria De Antofagasta"
                  },
                  {
                      "value": "2DaNotariaDeAntofagasta",
                      "label": "2Da Notaria De Antofagasta"
                  },
                  {
                      "value": "3RaNotariaDeAntofagasta",
                      "label": "3Ra Notaria De Antofagasta"
                  },
                  {
                      "value": "4TaNotariaDeAntofagasta",
                      "label": "4Ta Notaria De Antofagasta"
                  },
                  {
                      "value": "5TaNotariaDeAntofagasta",
                      "label": "5Ta Notaria De Antofagasta"
                  },
                  {
                      "value": "6TaNotariaDeAntofagasta",
                      "label": "6Ta Notaria De Antofagasta"
                  },
                  {
                      "value": "7MaNotariaDeAntofagastaAstoSierraGorda",
                      "label": "7Ma Notaria De Antofagasta Asto Sierra Gorda"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeMejillones",
                      "label": "Notaria, Conservador Y Archivero De Mejillones"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeTaltal",
                      "label": "Notario, Conservador Y Archivero De Taltal"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeTocopilla",
                      "label": "Notaria, Conservador Y Archivero De Tocopilla"
                  },
                  {
                      "value": "2DaNot.CuracautinAsientoEnLonquimay",
                      "label": "2Da Not. Curacautin Asiento En Lonquimay"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeLoncoche",
                      "label": "Notaria, Conservador Y Archivero De Loncoche"
                  },
                  {
                      "value": "NotariaDePucon",
                      "label": "Notaria De Pucon"
                  },
                  {
                      "value": "NotariaYConservadorDeMariaElena",
                      "label": "Notaria Y Conservador De Maria Elena"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeCalama",
                      "label": "Cbr, Cons. Comercio Y Archivero De Calama"
                  },
                  {
                      "value": "1RaNotariaDeCalama",
                      "label": "1Ra Notaria De Calama"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeCalama",
                      "label": "2Da Notaria Y Cons. Minas De Calama"
                  },
                  {
                      "value": "3RaNotariaDeCalama",
                      "label": "3Ra Notaria De Calama"
                  },
                  {
                      "value": "47MaNotaria",
                      "label": "47Ma Notaria"
                  },
                  {
                      "value": "ConservadorYArchiveroDeArica",
                      "label": "Conservador Y Archivero De Arica"
                  },
                  {
                      "value": "1RaNotariaDeArica",
                      "label": "1Ra Notaria De Arica"
                  },
                  {
                      "value": "2DaNotariaDeArica",
                      "label": "2Da Notaria De Arica"
                  },
                  {
                      "value": "3RaNotariaDeArica",
                      "label": "3Ra Notaria De Arica"
                  },
                  {
                      "value": "4TaNotariaDeArica",
                      "label": "4Ta Notaria De Arica"
                  },
                  {
                      "value": "ConservadorYArchiveroDeIquique",
                      "label": "Conservador Y Archivero De Iquique"
                  },
                  {
                      "value": "1RaNotariaDeIquique",
                      "label": "1Ra Notaria De Iquique"
                  },
                  {
                      "value": "2DaNotariaDeIquique",
                      "label": "2Da Notaria De Iquique"
                  },
                  {
                      "value": "3RaNotariaDeIquique",
                      "label": "3Ra Notaria De Iquique"
                  },
                  {
                      "value": "4TaNotariaDeIquique",
                      "label": "4Ta Notaria De Iquique"
                  },
                  {
                      "value": "5TaNotariaDeIquiqueAstoIquique",
                      "label": "5Ta Notaria De Iquique Asto Iquique"
                  },
                  {
                      "value": "6TaNotariaDeIquiqueAstoIquique",
                      "label": "6Ta Notaria De Iquique Asto Iquique"
                  },
                  {
                      "value": "7MaNotariaDeIquiqueAstoAltoHospicio",
                      "label": "7Ma Notaria De Iquique Asto Alto Hospicio"
                  },
                  {
                      "value": "4TaNotariaDeCalama",
                      "label": "4Ta Notaria De Calama"
                  },
                  {
                      "value": "5TaNotariaDeCalamaAstoSanPedroDeAtacama",
                      "label": "5Ta Notaria De Calama Asto San Pedro De Atacama"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeCopiapo",
                      "label": "Cbr, Cons. Comercio Y Archivero De Copiapo"
                  },
                  {
                      "value": "1RaNotariaDeCopiapo",
                      "label": "1Ra Notaria De Copiapo"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeCopiapo",
                      "label": "2Da Notaria Y Cons. Minas De Copiapo"
                  },
                  {
                      "value": "3RaNotariaDeCopiapo",
                      "label": "3Ra Notaria De Copiapo"
                  },
                  {
                      "value": "4TaNotariaDeCopiapo",
                      "label": "4Ta Notaria De Copiapo"
                  },
                  {
                      "value": "5TaNotariaDeCopiapoAstoTierraAmarilla",
                      "label": "5Ta Notaria De Copiapo Asto Tierra Amarilla"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeCaldera",
                      "label": "Notario, Conservador Y Archivero De Caldera"
                  },
                  {
                      "value": "1RaNotariaDeVallenarYCbrDeVallenar",
                      "label": "1Ra Notaria De Vallenar Y Cbr De Vallenar"
                  },
                  {
                      "value": "2DaNotariaDeVallenar,Cons.ComercioYConserv.",
                      "label": "2Da Notaria De Vallenar, Cons. Comercio Y Conserv."
                  },
                  {
                      "value": "3RaNot.VallenarAstoAltoDelCarmenYConserv.",
                      "label": "3Ra Not. Vallenar Asto Alto Del Carmen Y Conserv."
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeChanaral",
                      "label": "Notario, Conservador Y Archivero De Chanaral"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDiegoDeAlmagro",
                      "label": "Notario, Conservador Y Archivero Diego De Almagro"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDefreirina",
                      "label": "Notario, Conservador Y Archivero Defreirina"
                  },
                  {
                      "value": "48VaNotaria",
                      "label": "48Va Notaria"
                  },
                  {
                      "value": "ConservadorYArchiveroDeLaSerena",
                      "label": "Conservador Y Archivero De La Serena"
                  },
                  {
                      "value": "1RaNotariaDeLaSerena",
                      "label": "1Ra Notaria De La Serena"
                  },
                  {
                      "value": "2DaNotariaDeLaSerena",
                      "label": "2Da Notaria De La Serena"
                  },
                  {
                      "value": "3RaNotariaDeLaSerena",
                      "label": "3Ra Notaria De La Serena"
                  },
                  {
                      "value": "4TaNotariaDeLaSerena",
                      "label": "4Ta Notaria De La Serena"
                  },
                  {
                      "value": "5TaNotariaDeLaSerena",
                      "label": "5Ta Notaria De La Serena"
                  },
                  {
                      "value": "6TaNotariaDeLaSerena",
                      "label": "6Ta Notaria De La Serena"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeCoquimbo",
                      "label": "Cbr, Cons. Comercio Y Archivero De Coquimbo"
                  },
                  {
                      "value": "1RaNotariaDeCoquimbo",
                      "label": "1Ra Notaria De Coquimbo"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeCoquimbo",
                      "label": "2Da Notaria Y Cons. Minas De Coquimbo"
                  },
                  {
                      "value": "3RaNotariaDeCoquimbo",
                      "label": "3Ra Notaria De Coquimbo"
                  },
                  {
                      "value": "4TaNotariaDeCoquimbo",
                      "label": "4Ta Notaria De Coquimbo"
                  },
                  {
                      "value": "5TaNotariaDeCoquimbo",
                      "label": "5Ta Notaria De Coquimbo"
                  },
                  {
                      "value": "6TaNotariaDeCoquimbo",
                      "label": "6Ta Notaria De Coquimbo"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeAndacollo",
                      "label": "Notario, Conservador Y Archivero De Andacollo"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeVicuna",
                      "label": "Notario, Conservador Y Archivero De Vicuna"
                  },
                  {
                      "value": "Cbr.,Cons.ComercioYArchiveroDeIllapel",
                      "label": "Cbr., Cons. Comercio Y Archivero De Illapel"
                  },
                  {
                      "value": "1RaNotariaYCons.MinasDeIllapel",
                      "label": "1Ra Notaria Y Conserv. Minas De Illapel"
                  },
                  {
                      "value": "2DaNotariaDeIllapelAstoSalamanca",
                      "label": "2Da Notaria De Illapel Asto Salamanca"
                  },
                  {
                      "value": "NotariaDeLosVilos",
                      "label": "Notaria De Los Vilos"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeCombarbala",
                      "label": "Notaria, Conservador Y Archivero De Combarbala"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeOvalle",
                      "label": "Cbr, Cons. Comercio Y Archivero De Ovalle"
                  },
                  {
                      "value": "1RaNotariaDeOvalle",
                      "label": "1Ra Notaria De Ovalle"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeOvalle",
                      "label": "2Da Notaria Y Cons. Minas De Ovalle"
                  },
                  {
                      "value": "3RaNotariaDeOvalle",
                      "label": "3Ra Notaria De Ovalle"
                  },
                  {
                      "value": "4TaNot.OvalleAstoMontePatriaYConservador",
                      "label": "4Ta Not. Ovalle Asto Monte Patria Y Conservador"
                  },
                  {
                      "value": "5TaNotariaDeOvalle",
                      "label": "5Ta Notaria De Ovalle"
                  },
                  {
                      "value": "Cbr.YCons.ComercioDeValparaiso",
                      "label": "Cbr. Y Cons. Comercio De Valparaiso"
                  },
                  {
                      "value": "1RaNotariaYCons.MinasDeValparaiso",
                      "label": "1Ra Notaria Y Cons. Minas De Valparaiso"
                  },
                  {
                      "value": "2DaNotariaYArchiveroDeValparaiso",
                      "label": "2Da Notaria Y Archivero De Valparaiso"
                  },
                  {
                      "value": "3RaNotariaDeValparaiso",
                      "label": "3Ra Notaria De Valparaiso"
                  },
                  {
                      "value": "4TaNotariaDeValparaiso",
                      "label": "4Ta Notaria De Valparaiso"
                  },
                  {
                      "value": "5TaNotariaDeValparaiso",
                      "label": "5Ta Notaria De Valparaiso"
                  },
                  {
                      "value": "6TaNotariaDeValparaiso",
                      "label": "6Ta Notaria De Valparaiso"
                  },
                  {
                      "value": "7MaNotariaDeValparaiso",
                      "label": "7Ma Notaria De Valparaiso"
                  },
                  {
                      "value": "8VaNotariaDeValparaiso",
                      "label": "8Va Notaria De Valparaiso"
                  },
                  {
                      "value": "9NaNotariaDeValparaiso",
                      "label": "9Na Notaria De Valparaiso"
                  },
                  {
                      "value": "10MaNotariaDeValparaisoAstoJuanFernandez",
                      "label": "10Ma Notaria De Valparaiso Asto Juan Fernandez"
                  },
                  {
                      "value": "ConservadorYArchiveroDeVinaDelMar",
                      "label": "Conservador Y Archivero De Vina Del Mar"
                  },
                  {
                      "value": "ConservadorAstoEnConcon",
                      "label": "Conservador Asto En Concon"
                  },
                  {
                      "value": "1RaNotariaDeVinaDelMar",
                      "label": "1Ra Notaria De Vina Del Mar"
                  },
                  {
                      "value": "2DaNotariaDeVinaDelMar",
                      "label": "2Da Notaria De Vina Del Mar"
                  },
                  {
                      "value": "3RaNotariaDeVinaDelMar",
                      "label": "3Ra Notaria De Vina Del Mar"
                  },
                  {
                      "value": "4TaNotariaDeVinaDelMar",
                      "label": "4Ta Notaria De Vina Del Mar"
                  },
                  {
                      "value": "5TaNotariaDeVinaDelMar",
                      "label": "5Ta Notaria De Vina Del Mar"
                  },
                  {
                      "value": "6TaNotariaDeVinaDelMarAstoConcon",
                      "label": "6Ta Notaria De Vina Del Mar Asto Concon"
                  },
                  {
                      "value": "7MaNotariaDeVinaDelMar",
                      "label": "7Ma Notaria De Vina Del Mar"
                  },
                  {
                      "value": "8VaNotariaDeVinaDelMarAstoRenaca",
                      "label": "8Va Notaria De Vina Del Mar Asto Renaca"
                  },
                  {
                      "value": "Cbr,Cons.ComercioDeQuilpue",
                      "label": "Cbr, Cons. Comercio De Quilpue"
                  },
                  {
                      "value": "1RaNotariaDeQuilpue",
                      "label": "1Ra Notaria De Quilpue"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeQuilpue",
                      "label": "2Da Notaria Y Cons. Minas De Quilpue"
                  },
                  {
                      "value": "3RaNotariaDeQuilpue",
                      "label": "3Ra Notaria De Quilpue"
                  },
                  {
                      "value": "ConservadorDeVillaAlemana",
                      "label": "Conservador De Villa Alemana"
                  },
                  {
                      "value": "1RaNotariaDeVillaAlemana",
                      "label": "1Ra Notaria De Villa Alemana"
                  },
                  {
                      "value": "2DaNotariaDeVillaAlemana",
                      "label": "2Da Notaria De Villa Alemana"
                  },
                  {
                      "value": "ConservadorDeCasablanca",
                      "label": "Conservador De Casablanca"
                  },
                  {
                      "value": "1RaNotariaDeCasablanca",
                      "label": "1Ra Notaria De Casablanca"
                  },
                  {
                      "value": "2DaNotariaDeCasablancaAstoCuracavi",
                      "label": "2Da Notaria De Casablanca Asto Curacavi"
                  },
                  {
                      "value": "3RaNot.CasablancaAstoElQuiscoYConservador",
                      "label": "3Ra Not. Casablanca Asto El Quisco Y Conservador"
                  },
                  {
                      "value": "ConservadorDeQuillota",
                      "label": "Conservador De Quillota"
                  },
                  {
                      "value": "1RaNotariaDeQuillota",
                      "label": "1Ra Notaria De Quillota"
                  },
                  {
                      "value": "2DaNotariaDeQuillota",
                      "label": "2Da Notaria De Quillota"
                  },
                  {
                      "value": "ConservadorDeQuintero",
                      "label": "Conservador De Quintero"
                  },
                  {
                      "value": "1RaNotariaDeQuintero",
                      "label": "1Ra Notaria De Quintero"
                  },
                  {
                      "value": "2DaNotariaDeQuinteroAstoPuchuncavi",
                      "label": "2Da Notaria De Quintero Asto Puchuncavi"
                  },
                  {
                      "value": "ConservadorDeCalera",
                      "label": "Conservador De Calera"
                  },
                  {
                      "value": "1RaNotariaAstoLaCalera",
                      "label": "1Ra Notaria Asto La Calera"
                  },
                  {
                      "value": "ConservadorDeLimache",
                      "label": "Conservador De Limache"
                  },
                  {
                      "value": "1RaNotariaDeLimache",
                      "label": "1Ra Notaria De Limache"
                  },
                  {
                      "value": "2DaNotariaLimacheAstoOlmue",
                      "label": "2Da Notaria Limache Asto Olmue"
                  },
                  {
                      "value": "NotariaYConservadorDeIslaDePascua",
                      "label": "Notaria Y Conservador De Isla De Pascua"
                  },
                  {
                      "value": "ConservadorDeLaLigua",
                      "label": "Conservador De La Ligua"
                  },
                  {
                      "value": "1RaNotariaDeLaLigua",
                      "label": "1Ra Notaria De La Ligua"
                  },
                  {
                      "value": "2DaNotariaDeLaLiguaAstoCabildo",
                      "label": "2Da Notaria De La Ligua Asto Cabildo"
                  },
                  {
                      "value": "NotariaYConservadorDePetorca",
                      "label": "Notaria Y Conservador De Petorca"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeLosAndes",
                      "label": "Cbr, Cons. Comercio Y Archivero De Los Andes"
                  },
                  {
                      "value": "1RaNotariaDeLosAndes",
                      "label": "1Ra Notaria De Los Andes"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeLosAndes",
                      "label": "2Da Notaria Y Cons. Minas De Los Andes"
                  },
                  {
                      "value": "3RaNotariaDeLosAndesAstoSanEsteban",
                      "label": "3Ra Notaria De Los Andes Asto San Esteban"
                  },
                  {
                      "value": "CbrYCons.ComercioDeSanFelipe",
                      "label": "Cbr Y Cons.Comercio De San Felipe"
                  },
                  {
                      "value": "1RaNotariaDeSanFelipe",
                      "label": "1Ra Notaria De San Felipe"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeSanFelipe",
                      "label": "2Da Notaria Y Cons. Minas De San Felipe"
                  },
                  {
                      "value": "3RaNot.SanFelipeAstoLlayllayYConservador",
                      "label": "3Ra Not. San Felipe Asto Llayllay Y Conservador"
                  },
                  {
                      "value": "NotariaYConservadorDePutaendo",
                      "label": "Notaria Y Conservador De Putaendo"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeSanAntonio",
                      "label": "Cbr, Cons. Comercio Y Archivero De San Antonio"
                  },
                  {
                      "value": "1RaNotariaYCons.MinasDeSanAntonio",
                      "label": "1Ra Notaria Y Cons. Minas De San Antonio"
                  },
                  {
                      "value": "2DaNotariaDeSanAntonio",
                      "label": "2Da Notaria De San Antonio"
                  },
                  {
                      "value": "3RaNotariaDeSanAntonioAstoCartagena",
                      "label": "3Ra Notaria De San Antonio Asto Cartagena"
                  },
                  {
                      "value": "Cons.Bs.RsYComercio",
                      "label": "Cons. Bs. Rs Y Comercio"
                  },
                  {
                      "value": "Cons.Reg.InterdiccionesYProhibiciones",
                      "label": "Cons. Reg. Interdicciones Y Prohibiciones"
                  },
                  {
                      "value": "Cons.Reg.HipotecasYGravamenes",
                      "label": "Cons. Reg. Hipotecas Y Gravamenes"
                  },
                  {
                      "value": "Cons.DeMinas,Notaria",
                      "label": "Cons. De Minas, Notaria"
                  },
                  {
                      "value": "ArchiveroJudicial",
                      "label": "Archivero Judicial"
                  },
                  {
                      "value": "1RaNotariaDeSantiago",
                      "label": "1Ra Notaria De Santiago"
                  },
                  {
                      "value": "2DaNotariaDeSantiago",
                      "label": "2Da Notaria De Santiago"
                  },
                  {
                      "value": "3RaNotariaDeSantiago",
                      "label": "3Ra Notaria De Santiago"
                  },
                  {
                      "value": "4TaNotariaDeSantiago",
                      "label": "4Ta Notaria De Santiago"
                  },
                  {
                      "value": "5TaNotariaDeSantiago",
                      "label": "5Ta Notaria De Santiago"
                  },
                  {
                      "value": "6TaNotariaDeSantiago",
                      "label": "6Ta Notaria De Santiago"
                  },
                  {
                      "value": "7MaNotariaDeSantiago",
                      "label": "7Ma Notaria De Santiago"
                  },
                  {
                      "value": "8VaNotariaDeSantiagoAstoSantiago",
                      "label": "8Va Notaria De Santiago Asto Santiago"
                  },
                  {
                      "value": "9NaNotariaDeSantiago",
                      "label": "9Na Notaria De Santiago"
                  },
                  {
                      "value": "10MaNotariaDeSantiago",
                      "label": "10Ma Notaria De Santiago"
                  },
                  {
                      "value": "11MaNotariaDeSantiago",
                      "label": "11Ma Notaria De Santiago"
                  },
                  {
                      "value": "12MaNotariaDeSantiago",
                      "label": "12Ma Notaria De Santiago"
                  },
                  {
                      "value": "13RaNotariaDeSantiago",
                      "label": "13Ra Notaria De Santiago"
                  },
                  {
                      "value": "14TaNotariaDeSantiago",
                      "label": "14Ta Notaria De Santiago"
                  },
                  {
                      "value": "15TaNotariaDeSantiago",
                      "label": "15Ta Notaria De Santiago"
                  },
                  {
                      "value": "16TaNotariaDeSantiago",
                      "label": "16Ta Notaria De Santiago"
                  },
                  {
                      "value": "17MaNotariaDeSantiago",
                      "label": "17Ma Notaria De Santiago"
                  },
                  {
                      "value": "18VaNotariaDeSantiago",
                      "label": "18Va Notaria De Santiago"
                  },
                  {
                      "value": "19NaNotariaDeSantiago",
                      "label": "19Na Notaria De Santiago"
                  },
                  {
                      "value": "21RaNotariaDeSantiago",
                      "label": "21Ra Notaria De Santiago"
                  },
                  {
                      "value": "22DaNotariaDeSantiago",
                      "label": "22Da Notaria De Santiago"
                  },
                  {
                      "value": "23RaNotariaDeSantiago",
                      "label": "23Ra Notaria De Santiago"
                  },
                  {
                      "value": "24TaNotariaDeSantiago",
                      "label": "24Ta Notaria De Santiago"
                  },
                  {
                      "value": "25TaNotariaDeSantiagoAstoSantiago",
                      "label": "25Ta Notaria De Santiago Asto Santiago"
                  },
                  {
                      "value": "26TaNotariaDeSantiago",
                      "label": "26Ta Notaria De Santiago"
                  },
                  {
                      "value": "27MaNotariaDeSantiago",
                      "label": "27Ma Notaria De Santiago"
                  },
                  {
                      "value": "28VaNotaria",
                      "label": "28Va Notaria"
                  },
                  {
                      "value": "29NaNotaria",
                      "label": "29Na Notaria"
                  },
                  {
                      "value": "30MaNotaria",
                      "label": "30Ma Notaria"
                  },
                  {
                      "value": "31RaNotaria",
                      "label": "31Ra Notaria"
                  },
                  {
                      "value": "32DaNotaria",
                      "label": "32Da Notaria"
                  },
                  {
                      "value": "33RaNotaria",
                      "label": "33Ra Notaria"
                  },
                  {
                      "value": "34TaNotaria",
                      "label": "34Ta Notaria"
                  },
                  {
                      "value": "35TaNotaria",
                      "label": "35Ta Notaria"
                  },
                  {
                      "value": "36TaNotaria",
                      "label": "36Ta Notaria"
                  },
                  {
                      "value": "37MaNotaria",
                      "label": "37Ma Notaria"
                  },
                  {
                      "value": "38VaNotariaSantiagoAstoSantiago",
                      "label": "38Va Notaria Santiago Asto Santiago"
                  },
                  {
                      "value": "39NaNotaria",
                      "label": "39Na Notaria"
                  },
                  {
                      "value": "40MaNotaria",
                      "label": "40Ma Notaria"
                  },
                  {
                      "value": "41RaNotaria",
                      "label": "41Ra Notaria"
                  },
                  {
                      "value": "42DaNotaria",
                      "label": "42Da Notaria"
                  },
                  {
                      "value": "43RaNotaria",
                      "label": "43Ra Notaria"
                  },
                  {
                      "value": "44TaNotaria",
                      "label": "44Ta Notaria"
                  },
                  {
                      "value": "45TaNotaria",
                      "label": "45Ta Notaria"
                  },
                  {
                      "value": "46TaNotaria",
                      "label": "46Ta Notaria"
                  },
                  {
                      "value": "49NaNotariaDeSantiagoAstoSantiago",
                      "label": "49Na Notaria De Santiago Asto Santiago"
                  },
                  {
                      "value": "50MaNotaria",
                      "label": "50Ma Notaria"
                  },
                  {
                      "value": "51RaNotaria",
                      "label": "51Ra Notaria"
                  },
                  {
                      "value": "1RaNotariaCerrillos",
                      "label": "1Ra Notaria Cerrillos"
                  },
                  {
                      "value": "1RaNotariaConAstoEnCerroNavia",
                      "label": "1Ra Notaria Con Asto En Cerro Navia"
                  },
                  {
                      "value": "1RaNotariaAstoConchali",
                      "label": "1Ra Notaria Asto Conchali"
                  },
                  {
                      "value": "1RaNotariaDeEstacionCentral",
                      "label": "1Ra Notaria De Estacion Central"
                  },
                  {
                      "value": "1RaNotariaAsto.Huechuraba",
                      "label": "1Ra Notaria Asto. Huechuraba"
                  },
                  {
                      "value": "2DaNotariaDeHuechuraba",
                      "label": "2Da Notaria De Huechuraba"
                  },
                  {
                      "value": "1RaNotariaDeIndependencia",
                      "label": "1Ra Notaria De Independencia"
                  },
                  {
                      "value": "1RaNotariaAstoLaFlorida",
                      "label": "1Ra Notaria Asto La Florida"
                  },
                  {
                      "value": "2DaNotariaAstoLaFlorida",
                      "label": "2Da Notaria Asto La Florida"
                  },
                  {
                      "value": "3RaNotariaDeLaFlorida",
                      "label": "3Ra Notaria De La Florida"
                  },
                  {
                      "value": "1RaNotariaAsto.LaReina",
                      "label": "1Ra Notaria Asto. La Reina"
                  },
                  {
                      "value": "2DaNotariaDeLaReina",
                      "label": "2Da Notaria De La Reina"
                  },
                  {
                      "value": "1RaNotariaAstoLasCondes",
                      "label": "1Ra Notaria Asto Las Condes"
                  },
                  {
                      "value": "2DaNotariaDeLasCondes",
                      "label": "2Da Notaria De Las Condes"
                  },
                  {
                      "value": "1RaNotariaAstoLoBarnechea",
                      "label": "1Ra Notaria Asto Lo Barnechea"
                  },
                  {
                      "value": "2DaNotariaDeLoBarnechea",
                      "label": "2Da Notaria De Lo Barnechea"
                  },
                  {
                      "value": "1RaNotariaDeLoPrado",
                      "label": "1Ra Notaria De Lo Prado"
                  },
                  {
                      "value": "1RaNotariaAstoMacul",
                      "label": "1Ra Notaria Asto Macul"
                  },
                  {
                      "value": "2DaNotariaDeMacul",
                      "label": "2Da Notaria De Macul"
                  },
                  {
                      "value": "1RaNotariaMaipu",
                      "label": "1Ra Notaria Maipu"
                  },
                  {
                      "value": "2DaNotariaMaipu",
                      "label": "2Da Notaria Maipu"
                  },
                  {
                      "value": "3RaNotariaMaipu",
                      "label": "3Ra Notaria Maipu"
                  },
                  {
                      "value": "1RaNotarioAsto.nunoa",
                      "label": "1Ra Notario Asto. nunoa"
                  },
                  {
                      "value": "1RaNotariaAstoPenalolen",
                      "label": "1Ra Notaria Asto Penalolen"
                  },
                  {
                      "value": "2DaNotariaDePenalolen",
                      "label": "2Da Notaria De Penalolen"
                  },
                  {
                      "value": "1RaNotariaAstoProvidencia",
                      "label": "1Ra Notaria Asto Providencia"
                  },
                  {
                      "value": "2DaNotariaAstoProvidencia",
                      "label": "2Da Notaria Asto Providencia"
                  },
                  {
                      "value": "3RaNotariaDeProvidencia",
                      "label": "3Ra Notaria De Providencia"
                  },
                  {
                      "value": "4TaNotariaDeProvidencia",
                      "label": "4Ta Notaria De Providencia"
                  },
                  {
                      "value": "1RaNotariaPudahuel",
                      "label": "1Ra Notaria Pudahuel"
                  },
                  {
                      "value": "2DaNotariaDePudahuel",
                      "label": "2Da Notaria De Pudahuel"
                  },
                  {
                      "value": "1RaNotariaAstoQuilicura",
                      "label": "1Ra Notaria Asto Quilicura"
                  },
                  {
                      "value": "2DaNotariaDeQuilicura",
                      "label": "2Da Notaria De Quilicura"
                  },
                  {
                      "value": "1RaNotariaAstoQuintaNormal",
                      "label": "1Ra Notaria Asto Quinta Normal"
                  },
                  {
                      "value": "1RaNotariaDeRecoleta",
                      "label": "1Ra Notaria De Recoleta"
                  },
                  {
                      "value": "1RaNotariaAstoRenca",
                      "label": "1Ra Notaria Asto Renca"
                  },
                  {
                      "value": "2DaNotariaDeRenca",
                      "label": "2Da Notaria De Renca"
                  },
                  {
                      "value": "1RaNotariaAstoVitacura",
                      "label": "1Ra Notaria Asto Vitacura"
                  },
                  {
                      "value": "2DaNotariaDeVitacura",
                      "label": "2Da Notaria De Vitacura"
                  },
                  {
                      "value": "3RaNotariaDeVitacura",
                      "label": "3Ra Notaria De Vitacura"
                  },
                  {
                      "value": "1RaNotaria",
                      "label": "1Ra Notaria"
                  },
                  {
                      "value": "2DaNotariaAstoLampa",
                      "label": "2Da Notaria Asto Lampa"
                  },
                  {
                      "value": "3RaNotariaDeColina",
                      "label": "3Ra Notaria De Colina"
                  },
                  {
                      "value": "Conservador",
                      "label": "Conservador"
                  },
                  {
                      "value": "Archivero,NotarioAstoSanMiguel",
                      "label": "Archivero, Notario Asto San Miguel"
                  },
                  {
                      "value": "1RaNotariaSanMiguel",
                      "label": "1Ra Notaria San Miguel"
                  },
                  {
                      "value": "2DaNotariaSanMiguel",
                      "label": "2Da Notaria San Miguel"
                  },
                  {
                      "value": "3RaNotariaSanMiguel",
                      "label": "3Ra Notaria San Miguel"
                  },
                  {
                      "value": "4TaNotariaSanMiguel",
                      "label": "4Ta Notaria San Miguel"
                  },
                  {
                      "value": "5TaNotariaSanMiguel",
                      "label": "5Ta Notaria San Miguel"
                  },
                  {
                      "value": "6TaNotariaSanMiguel",
                      "label": "6Ta Notaria San Miguel"
                  },
                  {
                      "value": "7MaNotariaSanMiguel",
                      "label": "7Ma Notaria San Miguel"
                  },
                  {
                      "value": "8VaNotariaAstoSanMiguel",
                      "label": "8Va Notaria Asto San Miguel"
                  },
                  {
                      "value": "9NaNotariaAstoSanMiguel",
                      "label": "9Na Notaria Asto San Miguel"
                  },
                  {
                      "value": "10MaNotariaAstoSanMiguel",
                      "label": "10Ma Notaria Asto San Miguel"
                  },
                  {
                      "value": "1RaNotaria,Cons.YArch.AstoEnLaPintana",
                      "label": "1Ra Notaria, Conserv. Y Arch. Asto En La Pintana"
                  },
                  {
                      "value": "1RaNot.Cons.YArch.AstoPedroAguirreCerda",
                      "label": "1Ra Not. Conserv. Y Arch. Asto Pedro Aguirre Cerda"
                  },
                  {
                      "value": "1RaNotariaAstoLaCisterna",
                      "label": "1Ra Notaria Asto La Cisterna"
                  },
                  {
                      "value": "2DaNotariaAstoLaCisterna",
                      "label": "2Da Notaria Asto La Cisterna"
                  },
                  {
                      "value": "3RaNotariaAstoLaCisterna",
                      "label": "3Ra Notaria Asto La Cisterna"
                  },
                  {
                      "value": "4TaNotariaAstoLaCisterna",
                      "label": "4Ta Notaria Asto La Cisterna"
                  },
                  {
                      "value": "5TaNotariaAstoLaCisterna",
                      "label": "5Ta Notaria Asto La Cisterna"
                  },
                  {
                      "value": "1RaNotariaAstoLaGranja",
                      "label": "1Ra Notaria Asto La Granja"
                  },
                  {
                      "value": "2DaNotariaAstoLaGranja",
                      "label": "2Da Notaria Asto La Granja"
                  },
                  {
                      "value": "1RaNotariaAstoElBosque",
                      "label": "1Ra Notaria Asto El Bosque"
                  },
                  {
                      "value": "1RaNotariaAstoLoEspejo",
                      "label": "1Ra Notaria Asto Lo Espejo"
                  },
                  {
                      "value": "1RaNotariaAstoSanJoaquin",
                      "label": "1Ra Notaria Asto San Joaquin"
                  },
                  {
                      "value": "1RaNotariaAstoSanRamon",
                      "label": "1Ra Notaria Asto San Ramon"
                  },
                  {
                      "value": "ConservadorYArchiveroDePuenteAlto",
                      "label": "Conservador Y Archivero De Puente Alto"
                  },
                  {
                      "value": "3RaNotaria",
                      "label": "3Ra Notaria"
                  },
                  {
                      "value": "4TaNotaria",
                      "label": "4Ta Notaria"
                  },
                  {
                      "value": "5TaNot.PteAltoAstoPirqueYCons.YArchiv.",
                      "label": "5Ta Not. Pte Alto Asto Pirque Y Conserv. Y Archiv."
                  },
                  {
                      "value": "6TaNotariaAstoPuenteAlto",
                      "label": "6Ta Notaria Asto Puente Alto"
                  },
                  {
                      "value": "7MaNot.PuenteAltoAstoSanJoseDeMaipo",
                      "label": "7Ma Not. Puente Alto Asto San Jose De Maipo"
                  },
                  {
                      "value": "ConservadorYArchiveroSanBernardo",
                      "label": "Conservador Y Archivero San Bernardo"
                  },
                  {
                      "value": "1RaNotariaSanBernardo",
                      "label": "1Ra Notaria San Bernardo"
                  },
                  {
                      "value": "2DaNotariaSanBernardo",
                      "label": "2Da Notaria San Bernardo"
                  },
                  {
                      "value": "3RaNotariaSanBernardo",
                      "label": "3Ra Notaria San Bernardo"
                  },
                  {
                      "value": "4TaNotariaAstoEnSanBernardo",
                      "label": "4Ta Notaria Asto En San Bernardo"
                  },
                  {
                      "value": "5TaNot.SanBernardoAstoCaleraDeTango",
                      "label": "5Ta Not. San Bernardo Asto Calera De Tango"
                  },
                  {
                      "value": "ConservadorYArchiveroDeTalagante",
                      "label": "Conservador Y Archivero De Talagante"
                  },
                  {
                      "value": "1RaNotariaDeTalagante",
                      "label": "1Ra Notaria De Talagante"
                  },
                  {
                      "value": "2DaNot.TalaganteAstoElMonte",
                      "label": "2Da Not. Talagante Asto El Monte"
                  },
                  {
                      "value": "3RaNotariaTalaganteAstoIslaDeMaipo",
                      "label": "3Ra Notaria Talagante Asto Isla De Maipo"
                  },
                  {
                      "value": "ConservadorYArchiveroDePenaflor",
                      "label": "Conservador Y Archivero De Penaflor"
                  },
                  {
                      "value": "1RaNotariaDePenaflor",
                      "label": "1Ra Notaria De Penaflor"
                  },
                  {
                      "value": "2DaNotariaDePenaflorAstoPadreHurtado",
                      "label": "2Da Notaria De Penaflor Asto Padre Hurtado"
                  },
                  {
                      "value": "CbrYCons.ComercioDeBuin",
                      "label": "Cbr Y Cons. Comercio De Buin"
                  },
                  {
                      "value": "1RaNotariaDeBuin",
                      "label": "1Ra Notaria De Buin"
                  },
                  {
                      "value": "2DaNotaria,Cons.MinasYArchiveroDeBuin",
                      "label": "2Da Notaria, Cons. Minas Y Archivero De Buin"
                  },
                  {
                      "value": "3RaNotariaBuinAstoPaine",
                      "label": "3Ra Notaria Buin Asto Paine"
                  },
                  {
                      "value": "1RaNotariaYCbrDeMelipilla",
                      "label": "1Ra Notaria Y Cbr De Melipilla"
                  },
                  {
                      "value": "2DaNotariaYCons.ComercioMelipilla",
                      "label": "2Da Notaria Y Cons. Comercio Melipilla"
                  },
                  {
                      "value": "3RaNotaria,Cons.MinasYArchiveroMelipilla",
                      "label": "3Ra Notaria, Cons. Minas Y Archivero Melipilla"
                  },
                  {
                      "value": "ConservadorYArchiveroDeRancagua",
                      "label": "Conservador Y Archivero De Rancagua"
                  },
                  {
                      "value": "1RaNotariaDeRancagua",
                      "label": "1Ra Notaria De Rancagua"
                  },
                  {
                      "value": "2DaNotariaDeRancagua",
                      "label": "2Da Notaria De Rancagua"
                  },
                  {
                      "value": "3RaNotariaDeRancaguaAstoGraneros",
                      "label": "3Ra Notaria De Rancagua"
                  },
                  {
                      "value": "5TaNotariaRancagua",
                      "label": "4Ta Notaria De Rancagua Asto Graneros"
                  },
                  {
                      "value": "6TaNotariaDeRancaguaAstoMachali",
                      "label": "6Ta Notaria De Rancagua Asto Machali"
                  },
                  {
                      "value": "7MaNotariaAstoRancagua",
                      "label": "7Ma Notaria Asto Rancagua"
                  },
                  {
                      "value": "8VaNotariaRancaguaAstoDonihue",
                      "label": "8Va Notaria Rancagua Asto Donihue"
                  },
                  {
                      "value": "ConservadorDonihue",
                      "label": "Conservador Donihue"
                  },
                  {
                      "value": "ConservadorDeGraneros",
                      "label": "Conservador De Graneros"
                  },
                  {
                      "value": "ConservadorYArchiveroDeRengo",
                      "label": "Conservador Y Archivero De Rengo"
                  },
                  {
                      "value": "1RaNotariaDeRengo",
                      "label": "1Ra Notaria De Rengo"
                  },
                  {
                      "value": "2DaNotariaAstoRengo",
                      "label": "2Da Notaria Asto Rengo"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeSanVicente",
                      "label": "Cbr, Cons. Comercio Y Archivero De San Vicente"
                  },
                  {
                      "value": "1RaNotariaYCons.MinasDeSanVicente",
                      "label": "1Ra Notaria Y Cons. Minas De San Vicente"
                  },
                  {
                      "value": "2DaNotariaAstoSanVicente",
                      "label": "2Da Notaria Asto San Vicente"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroSanFernando",
                      "label": "Cbr, Cons. Comercio Y Archivero San Fernando"
                  },
                  {
                      "value": "1RaNotariaDeSanFernando",
                      "label": "1Ra Notaria De San Fernando"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasSanFernando",
                      "label": "2Da Notaria Y Cons. Minas San Fernando"
                  },
                  {
                      "value": "3RaNotariaSanFernandoAstoChimbarongo",
                      "label": "3Ra Notaria San Fernando Asto Chimbarongo"
                  },
                  {
                      "value": "1RaNotariaYCbrYArchiveroDeSantaCruz",
                      "label": "1Ra Notaria Y Cbr Y Archivero De Santa Cruz"
                  },
                  {
                      "value": "2DaNotaria,Cons.ComercioYMinasDeSantaCruz",
                      "label": "2Da Notaria, Cons. Comercio Y Minas De Santa Cruz"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDePeumo",
                      "label": "Notaria, Conservador Y Archivero De Peumo"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDePichilemu",
                      "label": "Notaria, Conservador Y Archivero De Pichilemu"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDePeralillo",
                      "label": "Notaria, Conservador Y Archivero De Peralillo"
                  },
                  {
                      "value": "Notaria,CbrYArchiveraDeLitueche",
                      "label": "Notaria, Cbr Y Archivera De Litueche"
                  },
                  {
                      "value": "ConservadorYArchiveroDeCurico",
                      "label": "Conservador Y Archivero De Curico"
                  },
                  {
                      "value": "1RaNotariaDeCurico",
                      "label": "1Ra Notaria De Curico"
                  },
                  {
                      "value": "2DaNotariaDeCurico",
                      "label": "2Da Notaria De Curico"
                  },
                  {
                      "value": "3RaNotariaDeCurico",
                      "label": "3Ra Notaria De Curico"
                  },
                  {
                      "value": "4TaNotariaDeCurico",
                      "label": "4Ta Notaria De Curico"
                  },
                  {
                      "value": "5TaNotariaDeCuricoAstoTeno",
                      "label": "5Ta Notaria De Curico Asto Teno"
                  },
                  {
                      "value": "Conservador,ArchiveraDeTalca",
                      "label": "Conservador, Archivera De Talca"
                  },
                  {
                      "value": "1RaNotariaDeTalca",
                      "label": "1Ra Notaria De Talca"
                  },
                  {
                      "value": "2DaNotariaDeTalca",
                      "label": "2Da Notaria De Talca"
                  },
                  {
                      "value": "3RaNotariaDeTalca",
                      "label": "3Ra Notaria De Talca"
                  },
                  {
                      "value": "4TaNotariaDeTalca",
                      "label": "4Ta Notaria De Talca"
                  },
                  {
                      "value": "5TaNotariaDeTalca",
                      "label": "5Ta Notaria De Talca"
                  },
                  {
                      "value": "6TaNotariaTalcaAstoSanClemente",
                      "label": "6Ta Notaria Talca Asto San Clemente"
                  },
                  {
                      "value": "7MaNotariaAstoTalca",
                      "label": "7Ma Notaria Asto Talca"
                  },
                  {
                      "value": "8VaNotariaTalcaAstoMaule",
                      "label": "8Va Notaria Talca Asto Maule"
                  },
                  {
                      "value": "ConservadorMaule",
                      "label": "Conservador Maule"
                  },
                  {
                      "value": "ConservadorYArchiveroDeSanClemente",
                      "label": "Conservador Y Archivero De San Clemente"
                  },
                  {
                      "value": "ConservadorYArchiveroConstitucion",
                      "label": "Conservador Y Archivero Constitucion"
                  },
                  {
                      "value": "NotariaConstitucion",
                      "label": "Notaria Constitucion"
                  },
                  {
                      "value": "NotariaYConservadorDeCurepto",
                      "label": "Notaria Y Conservador De Curepto"
                  },
                  {
                      "value": "NotariaYConservadoraDeLicanten",
                      "label": "Notaria Y Conservadora De Licanten"
                  },
                  {
                      "value": "ConservadorYArchiveroDeMolina",
                      "label": "Conservador Y Archivero De Molina"
                  },
                  {
                      "value": "NotariaDeMolina",
                      "label": "Notaria De Molina"
                  },
                  {
                      "value": "Cbr,ComercioYArchiveroDeLinares",
                      "label": "Cbr, Comercio Y Archivero De Linares"
                  },
                  {
                      "value": "1RaNotariaDeLinares",
                      "label": "1Ra Notaria De Linares"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeLinares",
                      "label": "2Da Notaria Y Cons. Minas De Linares"
                  },
                  {
                      "value": "3RaNotariaDeLinares",
                      "label": "3Ra Notaria De Linares"
                  },
                  {
                      "value": "4TaNotariaLinaresAstoLongavi",
                      "label": "4Ta Notaria Linares Asto Longavi"
                  },
                  {
                      "value": "ConservadorLongavi",
                      "label": "Conservador Longavi"
                  },
                  {
                      "value": "ConservadorYArchiveroDeSanJavier",
                      "label": "Conservador Y Archivero De San Javier"
                  },
                  {
                      "value": "NotariaDeSanJavier",
                      "label": "Notaria De San Javier"
                  },
                  {
                      "value": "ConservadorYArchiveroDeCauquenes",
                      "label": "Conservador Y Archivero De Cauquenes"
                  },
                  {
                      "value": "1RaNotariaDeCauquenes",
                      "label": "1Ra Notaria De Cauquenes"
                  },
                  {
                      "value": "2DaNotariaDeCauquenes",
                      "label": "2Da Notaria De Cauquenes"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeChanco",
                      "label": "Notaria, Conservador Y Archivero De Chanco"
                  },
                  {
                      "value": "ConservadorYArchiveroDeParral",
                      "label": "Conservador Y Archivero De Parral"
                  },
                  {
                      "value": "NotariaDeParral",
                      "label": "Notaria De Parral"
                  },
                  {
                      "value": "ConservadorYArchiveroDeChillan",
                      "label": "Conservador Y Archivero De Chillan"
                  },
                  {
                      "value": "1RaNotariaDeChillan",
                      "label": "1Ra Notaria De Chillan"
                  },
                  {
                      "value": "2DaNotariaDeChillan",
                      "label": "2Da Notaria De Chillan"
                  },
                  {
                      "value": "4TaNotariaDeChillan",
                      "label": "4Ta Notaria De Chillan"
                  },
                  {
                      "value": "5TaNotariaAstoChillan",
                      "label": "5Ta Notaria Asto Chillan"
                  },
                  {
                      "value": "6TaNotariaAstoChillan",
                      "label": "6Ta Notaria Asto Chillan"
                  },
                  {
                      "value": "7MaNotariaDeChillanAstoPintoYConserv.",
                      "label": "7Ma Notaria De Chillan Asto Pinto Y Conserv."
                  },
                  {
                      "value": "8VaNotariaAstoCoihuecoYConservador",
                      "label": "8Va Notaria Asto Coihueco Y Conservador"
                  },
                  {
                      "value": "9NaNot.AstoChillanViejoYConserv.YArchivero",
                      "label": "9Na Not. Asto Chillan Viejo Y Conserv. Y Archivero"
                  },
                  {
                      "value": "ConservadorYArchiveroSanCarlos",
                      "label": "Conservador Y Archivero San Carlos"
                  },
                  {
                      "value": "1RaNotariaDeSanCarlos",
                      "label": "1Ra Notaria De San Carlos"
                  },
                  {
                      "value": "2DaNotariaDeSanCarlosAstoniquen",
                      "label": "2Da Notaria De San Carlos Asto niquen"
                  },
                  {
                      "value": "ConservadorYArchiveroDeYungay",
                      "label": "Conservador Y Archivero De Yungay"
                  },
                  {
                      "value": "1RaNotariaDeYungay",
                      "label": "1Ra Notaria De Yungay"
                  },
                  {
                      "value": "2DaNotariaYungayAsto.Tucapel",
                      "label": "2Da Notaria Yungay Asto. Tucapel"
                  },
                  {
                      "value": "ConservadorYArchiveroDeBulnes",
                      "label": "Conservador Y Archivero De Bulnes"
                  },
                  {
                      "value": "1RaNotariaDeBulnes",
                      "label": "1Ra Notaria De Bulnes"
                  },
                  {
                      "value": "2DaNotariaBulnesAstoQuillon",
                      "label": "2Da Notaria Bulnes Asto Quillon"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeCoelemu",
                      "label": "Notaria, Conservador Y Archivero De Coelemu"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeQuirihue",
                      "label": "Notaria, Conservador Y Archivero De Quirihue"
                  },
                  {
                      "value": "Cbr,ComercioYArchiveroDeConcepcion",
                      "label": "Cbr, Comercio Y Archivero De Concepcion"
                  },
                  {
                      "value": "1RaNotariaYCons.MinasDeConcepcion",
                      "label": "1Ra Notaria Y Cons. Minas De Concepcion"
                  },
                  {
                      "value": "2DaNotariaDeConcepcion",
                      "label": "2Da Notaria De Concepcion"
                  },
                  {
                      "value": "3RaNotariaDeConcepcion",
                      "label": "3Ra Notaria De Concepcion"
                  },
                  {
                      "value": "4TaNotariaDeConcepcion",
                      "label": "4Ta Notaria De Concepcion"
                  },
                  {
                      "value": "5TaNotariaDeConcepcion",
                      "label": "5Ta Notaria De Concepcion"
                  },
                  {
                      "value": "6TaNotariaDeConcepcion",
                      "label": "6Ta Notaria De Concepcion"
                  },
                  {
                      "value": "7MaNotariaDeConcepcion",
                      "label": "7Ma Notaria De Concepcion"
                  },
                  {
                      "value": "8VaNotariaDeConcepcionAstoChiguayante",
                      "label": "8Va Notaria De Concepcion Asto Chiguayante"
                  },
                  {
                      "value": "9NaNotariaDeConcepcionAstoSanPedroDeLaPaz",
                      "label": "9Na Notaria De Concepcion Asto San Pedro De La Paz"
                  },
                  {
                      "value": "10MaNotariaDeConcepcionAstoPenco",
                      "label": "10Ma Notaria De Concepcion Asto Penco"
                  },
                  {
                      "value": "11RaNotariaAstoConcepcion",
                      "label": "11Ra Notaria Asto Concepcion"
                  },
                  {
                      "value": "12DaNotariaAstoConcepcion",
                      "label": "12Da Notaria Asto Concepcion"
                  },
                  {
                      "value": "13RaNotariaDeConcepcionAstoChiguayante",
                      "label": "13Ra Notaria De Concepcion Asto Chiguayante"
                  },
                  {
                      "value": "14TaNot.DeConcepcionAstoSanPedroDeLaPaz",
                      "label": "14Ta Not. De Concepcion Asto San Pedro De La Paz"
                  },
                  {
                      "value": "15TaNot.ConcepcionAstoHualquiYConservador",
                      "label": "15Ta Not. Concepcion Asto Hualqui Y Conservador"
                  },
                  {
                      "value": "ConservadorDeChiguayante",
                      "label": "Conservador De Chiguayante"
                  },
                  {
                      "value": "ConservadorDeSanPedroDeLaPaz",
                      "label": "Conservador De San Pedro De La Paz"
                  },
                  {
                      "value": "CbrYComercioDeTalcahuano",
                      "label": "Cbr Y Comercio De Talcahuano"
                  },
                  {
                      "value": "1RaNotariaDeTalcahuano",
                      "label": "1Ra Notaria De Talcahuano"
                  },
                  {
                      "value": "2DaNotariaYCons.MinasDeTalcahuano",
                      "label": "2Da Notaria Y Cons. Minas De Talcahuano"
                  },
                  {
                      "value": "3RaNotariaYArchiveroDeTalcahuano",
                      "label": "3Ra Notaria Y Archivero De Talcahuano"
                  },
                  {
                      "value": "4TaNotariaTalcahuanoAstoHualpen",
                      "label": "4Ta Notaria Talcahuano Asto Hualpen"
                  },
                  {
                      "value": "5TaNotariaAstoEnTalcahuano",
                      "label": "5Ta Notaria Asto En Talcahuano"
                  },
                  {
                      "value": "ConservadorDeHualpen",
                      "label": "Conservador De Hualpen"
                  },
                  {
                      "value": "ConservadorYArchiveroDeTome",
                      "label": "Conservador Y Archivero De Tome"
                  },
                  {
                      "value": "1RaNotariaDeTome",
                      "label": "1Ra Notaria De Tome"
                  },
                  {
                      "value": "2DaNotariaDeTome",
                      "label": "2Da Notaria De Tome"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeFlorida",
                      "label": "Notaria, Conservador Y Archivero De Florida"
                  },
                  {
                      "value": "NotariaYConservadorDeSantaJuana",
                      "label": "Notaria Y Conservador De Santa Juana"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeLota",
                      "label": "Notaria, Conservador Y Archivero De Lota"
                  },
                  {
                      "value": "ConservadorYArchiveroDeCoronel",
                      "label": "Conservador Y Archivero De Coronel"
                  },
                  {
                      "value": "1RaNotariaDeCoronel",
                      "label": "1Ra Notaria De Coronel"
                  },
                  {
                      "value": "2DaNotariaDeCoronel",
                      "label": "2Da Notaria De Coronel"
                  },
                  {
                      "value": "3RaNotariaAstoEnCoronel",
                      "label": "3Ra Notaria Asto En Coronel"
                  },
                  {
                      "value": "ConservadorYArchiveroDeLosAngeles",
                      "label": "Conservador Y Archivero De Los Angeles"
                  },
                  {
                      "value": "1RaNotariaDeLosAngeles",
                      "label": "1Ra Notaria De Los Angeles"
                  },
                  {
                      "value": "2DaNotariaDeLosAngeles",
                      "label": "2Da Notaria De Los Angeles"
                  },
                  {
                      "value": "3RaNotariaDeLosAngeles",
                      "label": "3Ra Notaria De Los Angeles"
                  },
                  {
                      "value": "4TaNotariaDeLosAngeles",
                      "label": "4Ta Notaria De Los Angeles"
                  },
                  {
                      "value": "5TaNotariaAstoEnLosAngeles",
                      "label": "5Ta Notaria Asto En Los Angeles"
                  },
                  {
                      "value": "NotariaYConservadorDeSantaBarbara",
                      "label": "Notaria Y Conservador De Santa Barbara"
                  },
                  {
                      "value": "NotariaYConservadorDeMulchen",
                      "label": "Notaria Y Conservador De Mulchen"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeNacimiento",
                      "label": "Notaria, Conservador Y Archivero De Nacimiento"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeLaja",
                      "label": "Notaria, Conservador Y Archivero De Laja"
                  },
                  {
                      "value": "NotariaYConservadorDeYumbel",
                      "label": "Notaria Y Conservador De Yumbel"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeCabrero",
                      "label": "Notario, Conservador Y Archivero De Cabrero"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeLebu",
                      "label": "Notario, Conservador Y Archivero De Lebu"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeArauco",
                      "label": "Notaria, Conservador Y Archivero De Arauco"
                  },
                  {
                      "value": "NotariaYConservadorYArchiveroDeCuranilahue",
                      "label": "Notaria Y Conservador Y Archivero De Curanilahue"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeCanete",
                      "label": "Notaria, Conservador Y Archivero De Canete"
                  },
                  {
                      "value": "1RaConservadorYArchiveroTemuco",
                      "label": "1Ra Conservador Y Archivero Temuco"
                  },
                  {
                      "value": "2DaConservadorAstoTemuco",
                      "label": "2Da Conservador Asto Temuco"
                  },
                  {
                      "value": "1RaNotariaDeTemuco",
                      "label": "1Ra Notaria De Temuco"
                  },
                  {
                      "value": "2DaNotariaDeTemuco",
                      "label": "2Da Notaria De Temuco"
                  },
                  {
                      "value": "3RaNotariaDeTemuco",
                      "label": "3Ra Notaria De Temuco"
                  },
                  {
                      "value": "4TaNotariaDeTemuco",
                      "label": "4Ta Notaria De Temuco"
                  },
                  {
                      "value": "5TaNotariaDeTemuco",
                      "label": "5Ta Notaria De Temuco"
                  },
                  {
                      "value": "6TaNotariaDeTemucoAstoPadreLasCasas",
                      "label": "6Ta Notaria De Temuco Asto Padre Las Casas"
                  },
                  {
                      "value": "9NaNotariaAstoTemuco",
                      "label": "9Na Notaria Asto Temuco"
                  },
                  {
                      "value": "7MaNot.TemucoAstoVilcunYConserv.YArchivero",
                      "label": "7Ma Not. Temuco Asto Vilcun Y Conserv. Y Archivero"
                  },
                  {
                      "value": "8VaNot.DeTemucoAstoCuncoYConserv.YArchiv.",
                      "label": "8Va Not. De Temuco Asto Cunco Y Conserv. Y Archiv."
                  },
                  {
                      "value": "ConservadorYArchiveroDeAngo",
                      "label": "Conservador Y Archivero De Ango"
                  },
                  {
                      "value": "1RaNotariaDeAngol",
                      "label": "1Ra Notaria De Angol"
                  },
                  {
                      "value": "2DaNotariaDeAngol",
                      "label": "2Da Notaria De Angol"
                  },
                  {
                      "value": "Notaria,Conservador,ArchiveroDeCollipulli",
                      "label": "Notaria, Conservador, Archivero De Collipulli"
                  },
                  {
                      "value": "Notaria,Conservador,ArchiveroDePuren",
                      "label": "Notaria, Conservador, Archivero De Puren"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeTraiguen",
                      "label": "Notaria, Conservador Y Archivero De Traiguen"
                  },
                  {
                      "value": "ConservadorYArchiveroDeVictoria",
                      "label": "Conservador Y Archivero De Victoria"
                  },
                  {
                      "value": "NotariaDeVictoria",
                      "label": "Notaria De Victoria"
                  },
                  {
                      "value": "ConservadorYArchiveroDeCuracautin",
                      "label": "Conservador Y Archivero De Curacautin"
                  },
                  {
                      "value": "1RaNotariaDeCuracautin",
                      "label": "1Ra Notaria De Curacautin"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeTolten",
                      "label": "Notaria, Conservador Y Archivero De Tolten"
                  },
                  {
                      "value": "ConservadorYArchiveroDePitrufquen",
                      "label": "Conservador Y Archivero De Pitrufquen"
                  },
                  {
                      "value": "NotariaDePitrufquen",
                      "label": "Notaria De Pitrufquen"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeVillarrica",
                      "label": "Cbr, Cons. Comercio Y Archivero De Villarrica"
                  },
                  {
                      "value": "NotariaYCons.MinasDeVillarrica",
                      "label": "Notaria Y Cons. Minas De Villarrica"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeNuevaImperial",
                      "label": "Notaria, Conservador Y Archivero De Nueva Imperial"
                  },
                  {
                      "value": "ConservadorYArchiveroDePucon",
                      "label": "Conservador Y Archivero De Pucon"
                  },
                  {
                      "value": "ConservadorYArchiveroDeLautaro",
                      "label": "Conservador Y Archivero De Lautaro"
                  },
                  {
                      "value": "1RaNotariaDeLautaro",
                      "label": "1Ra Notaria De Lautaro"
                  },
                  {
                      "value": "2DaNotariaDeLautaroAstoGalvarino",
                      "label": "2Da Notaria De Lautaro Asto Galvarino"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeCarahue",
                      "label": "Notaria, Conservador Y Archivero De Carahue"
                  },
                  {
                      "value": "ConservadorYArchiveroDeValdivia",
                      "label": "Conservador Y Archivero De Valdivia"
                  },
                  {
                      "value": "1RaNotariaDeValdivia",
                      "label": "1Ra Notaria De Valdivia"
                  },
                  {
                      "value": "2DaNotariaDeValdivia",
                      "label": "2Da Notaria De Valdivia"
                  },
                  {
                      "value": "3RaNotariaDeValdivia",
                      "label": "3Ra Notaria De Valdivia"
                  },
                  {
                      "value": "4TaNotariaDeValdiviaAstoValdivia",
                      "label": "4Ta Notaria De Valdivia Asto Valdivia"
                  },
                  {
                      "value": "ConservadorYArchiveroDeMariquina",
                      "label": "Conservador Y Archivero De Mariquina"
                  },
                  {
                      "value": "NotariaDeMariquina",
                      "label": "Notaria De Mariquina"
                  },
                  {
                      "value": "ConservadorYArchiveroDeLosLagos",
                      "label": "Conservador Y Archivero De Los Lagos"
                  },
                  {
                      "value": "NotariaDeLosLagos",
                      "label": "Notaria De Los Lagos"
                  },
                  {
                      "value": "ConservadorYArchiveroDePanguipulli",
                      "label": "Conservador Y Archivero De Panguipulli"
                  },
                  {
                      "value": "NotariaDePanguipulli",
                      "label": "Notaria De Panguipulli"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDePaillaco",
                      "label": "Notaria, Conservador Y Archivero De Paillaco"
                  },
                  {
                      "value": "ConservadorYArchiveroDeLaUnion",
                      "label": "Conservador Y Archivero De La Union"
                  },
                  {
                      "value": "NotariaDeLaUnion",
                      "label": "Notaria De La Union"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeRioBueno",
                      "label": "Notaria, Conservador Y Archivero De Rio Bueno"
                  },
                  {
                      "value": "Cbr,Cons.ComercioYArchiveroDeOsorno",
                      "label": "Cbr, Cons. Comercio Y Archivero De Osorno"
                  },
                  {
                      "value": "1RaNotariaYCons.MinasDeOsorno",
                      "label": "1Ra Notaria Y Cons. Minas De Osorno"
                  },
                  {
                      "value": "2DaNotariaDeOsorno",
                      "label": "2Da Notaria De Osorno"
                  },
                  {
                      "value": "3RaNotariaDeOsorno",
                      "label": "3Ra Notaria De Osorno"
                  },
                  {
                      "value": "4TaNotariaDeOsornoAstoOsorno",
                      "label": "4Ta Notaria De Osorno Asto Osorno"
                  },
                  {
                      "value": "NotariaYConservadorDeRioNegro",
                      "label": "Notaria Y Conservador De Rio Negro"
                  },
                  {
                      "value": "ConservadorYArchiveroDePuertoMontt",
                      "label": "Conservador Y Archivero De Puerto Montt"
                  },
                  {
                      "value": "1RaNotariaDePuertoMontt",
                      "label": "1Ra Notaria De Puerto Montt"
                  },
                  {
                      "value": "2DaNotariaDePuertoMontt",
                      "label": "2Da Notaria De Puerto Montt"
                  },
                  {
                      "value": "3RaNotariaDePuertoMontt",
                      "label": "3Ra Notaria De Puerto Montt"
                  },
                  {
                      "value": "4TaNotariaDePuertoMontt",
                      "label": "4Ta Notaria De Puerto Montt"
                  },
                  {
                      "value": "5TaNotariaDePuertoMontt",
                      "label": "5Ta Notaria De Puerto Montt"
                  },
                  {
                      "value": "6TaNotariaAstoPuertoMontt",
                      "label": "6Ta Notaria Asto Puerto Montt"
                  },
                  {
                      "value": "ConservadorYArchiveroDePuertoVaras",
                      "label": "Conservador Y Archivero De Puerto Varas"
                  },
                  {
                      "value": "1RaNotariaDePuertoVaras",
                      "label": "1Ra Notaria De Puerto Varas"
                  },
                  {
                      "value": "2DaNotariaDePuertoVarasAstoLlanquihue",
                      "label": "2Da Notaria De Puerto Varas Asto Llanquihue"
                  },
                  {
                      "value": "3RaNotariaDePuertoVarasAstoPuertoVaras",
                      "label": "3Ra Notaria De Puerto Varas Asto Puerto Varas"
                  },
                  {
                      "value": "4TaNotariaDePuertoVarasAstoEnFresia",
                      "label": "4Ta Notaria De Puerto Varas Asto En Fresia"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeCalbuco",
                      "label": "Notaria, Conservador Y Archivero De Calbuco"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeMaullin",
                      "label": "Notaria, Conservador Y Archivero De Maullin"
                  },
                  {
                      "value": "NotariaYConservadorDeLosMuermos",
                      "label": "Notaria Y Conservador De Los Muermos"
                  },
                  {
                      "value": "ConservadorYArchiveroDeCastro",
                      "label": "Conservador Y Archivero De Castro"
                  },
                  {
                      "value": "1RaNotariaDeCastro",
                      "label": "1Ra Notaria De Castro"
                  },
                  {
                      "value": "2DaNotariaDeCastroAstoCastro",
                      "label": "2Da Notaria De Castro Asto Castro"
                  },
                  {
                      "value": "NotariaYConservadorDeQuellon",
                      "label": "Notaria Y Conservador De Quellon"
                  },
                  {
                      "value": "NotariaYConservadorDeAncud",
                      "label": "Notaria Y Conservador De Ancud"
                  },
                  {
                      "value": "Sec,Notaria,ConservadorYReceptorJud.Quinchao",
                      "label": "Sec, Notaria, Conservador Y Receptor Jud. Quinchao"
                  },
                  {
                      "value": "1RaNotaria,ConservadorYArchiveroDeChaiten",
                      "label": "1Ra Notaria, Conservador Y Archivero De Chaiten"
                  },
                  {
                      "value": "2DaNot.DeChaitenAstoFutaleufuYConservador",
                      "label": "2Da Not. De Chaiten Asto Futaleufu Y Conservador"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeHualaihue",
                      "label": "Notaria, Conservador Y Archivero De Hualaihue"
                  },
                  {
                      "value": "ConservadorYArchiveroDeCoyhaique",
                      "label": "Conservador Y Archivero De Coyhaique"
                  },
                  {
                      "value": "1RaNotariaDeCoyhaique",
                      "label": "1Ra Notaria De Coyhaique"
                  },
                  {
                      "value": "2DaNotariaDeCoyhaique",
                      "label": "2Da Notaria De Coyhaique"
                  },
                  {
                      "value": "ConservadorYArchiveroDeAysen",
                      "label": "Conservador Y Archivero De Aysen"
                  },
                  {
                      "value": "1RaNotariaDeAysen",
                      "label": "1Ra Notaria De Aysen"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeCisnes",
                      "label": "Notaria, Conservador Y Archivero De Cisnes"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeChileChico",
                      "label": "Notaria, Conservador Y Archivero De Chile Chico"
                  },
                  {
                      "value": "Notaria,ConservadorYArchiveroDeCochrane",
                      "label": "Notaria, Conservador Y Archivero De Cochrane"
                  },
                  {
                      "value": "ConservadorYArchiveroDePuntaArenas",
                      "label": "Conservador Y Archivero De Punta Arenas"
                  },
                  {
                      "value": "1RaNotariaDePuntaArenas",
                      "label": "1Ra Notaria De Punta Arenas"
                  },
                  {
                      "value": "2DaNotariaDePuntaArenas",
                      "label": "2Da Notaria De Punta Arenas"
                  },
                  {
                      "value": "3RaNotariaDePuntaArenas",
                      "label": "3Ra Notaria De Punta Arenas"
                  },
                  {
                      "value": "NotariaYConservadorDeNatales",
                      "label": "Notaria Y Conservador De Natales"
                  },
                  {
                      "value": "Sec.,Notario,ConservadorYReceptorDePorvenir",
                      "label": "Sec., Notario, Conservador Y Receptor De Porvenir"
                  },
                  {
                      "value": "Notario,ConservadorYArchiveroDeCaboDeHornos",
                      "label": "Notario, Conservador Y Archivero De Cabo De Hornos"
                  }
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
            "placeholder": "",
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
            "validations": {
               "required": false,
            },
            "properties": {
               "name": "textArea",
               "columns": "12",
               "rows": "3",
               "multiline": true,
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
                      "value": "antofagasta",
                      "label": "Región de Antofagasta"
                  },
                  {
                      "value": "araucania",
                      "label": "Región de La Araucanía"
                  },
                  {
                      "value": "arica",
                      "label": "Región de Arica y Parinacota"
                  },
                  {
                      "value": "atacama",
                      "label": "Región de Atacama"
                  },
                  {
                      "value": "aysen",
                      "label": "Región de Aysén del General Carlos Ibáñez del Campo"
                  },
                  {
                      "value": "biobio",
                      "label": "Región del Biobío"
                  },
                  {
                      "value": "coquimbo",
                      "label": "Región de Coquimbo"
                  },
                  {
                      "value": "losLagos",
                      "label": "Región de Los Lagos"
                  },
                  {
                      "value": "losRios",
                      "label": "Región de Los Ríos"
                  },
                  {
                      "value": "magallanes",
                      "label": "Región de Magallanes y de la Antártica Chilena"
                  },
                  {
                      "value": "maule",
                      "label": "Región del Maule"
                  },
                  {
                      "value": "metropolitana",
                      "label": "Región Metropolitana"
                  },
                  {
                      "value": "nuble",
                      "label": "Región de Ñuble"
                  },
                  {
                      "value": "oHiggins",
                      "label": "Región del Libertador General Bernardo O'Higgins"
                  },
                  {
                      "value": "tarapaca",
                      "label": "Región de Tarapacá"
                  },
                  {
                      "value": "valparaiso",
                      "label": "Región de Valparaíso"
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
               "columns": "12",
               "rows": "1",
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
            "id": "cukCode",
            "name": "cukCode",
            "type": "textField",
            "label": "CUK: Código de Operación Interno",
            "description": "CUK",
            "defaultValue": "",
            "placeholder": "Código de Operación Interno",
            "validations": {
               "required": false
            },
            "properties": {
               "disabled": true,
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
            "validations": {
               "required": true,
            },
            "properties": {
               "name": "textField",
               "columns": "4",
               "rows": "1",
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
            "validations": {
               "required": false,
            },
            "properties": {
               "name": "textField",
               "columns": "12",
               "rows": "1",
               "disabled": true,
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
            "validations": {
               "required": false,
            },
            "properties": {
               "name": "textField",
               "columns": "12",
               "rows": "1",
               "disabled": true,
            }
         },
      ],
   },
];