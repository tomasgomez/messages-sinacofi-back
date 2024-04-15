import {
   NextApiRequest,
   NextApiResponse
} from 'next';
import {
   Methods
} from '@/backend/entities/calls/http';
import {
   errorHandler
} from '@/backend/utils/errorHandler';

// import calls
import {
   getInstitutions
} from '@/backend/handler/institution/get';

/*
Message API 
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
   try {
      const method = req.method;
      switch (method) {
         case Methods.GET:
            /*await messageCalls.GET(req, res);
                   return; */
            let institutionOptions = [];

            let institutions = await getInstitutions();

            // TODO: Handle error
            if (institutions instanceof Error || !institutions || !institutions.length) {
               institutionOptions = institutionOptionsException
            } else {
               for (let institution of institutions) {
                  institutionOptions.push({
                     "value": institution.id,
                     "label": `${institution.id} - ${institution.name}`
                  });
               }
            }

            res.status(200).json(getRuleSchema(institutionOptions));
            return;
         case Methods.PUT:
            /*await messageCalls.PUT(req, res);
                   return;*/
            res.status(200).json(req.body);
         case Methods.POST:
            /*await messageCalls.POST(req, res);
                   return;*/
            res.status(200).json(req.body);
         default:
            res.status(405).end(`Method ${method} Not Allowed`);
      }
      return;
   } catch (error: any) {
      console.log('Error:', error);
      errorHandler(error, req, res);
   }
}

function getRuleSchema(institutionOptions: any[]) {
   return {
      "messageSchemas": [{
            "id": "1",
            "messageCode": "136",
            "description": "TRANSFERENCIA DE FONDOS INDIVIDUAL",
            "parameters": [{
                  "id": "codeField",
                  "name": "code",
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
                  "id": "descriptionField",
                  "name": "code",
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
                  "id": "institutionDestination",
                  "name": "institutionDestination",
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
                     "options": [{
                        "label": "02 - Normal Sin Aviso de Entrega",
                        "value": "02",
                     }]
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
                     "options": [{
                           "label": "Sí",
                           "value": "yes"
                        },
                        {
                           "label": "No",
                           "value": "no"
                        }
                     ]
                  }
               },
               {
                  "id": "userResponsable",
                  "name": "userResponsable",
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
                  "id": "phoneNumber",
                  "name": "phoneNumber",
                  "type": "textField",
                  "label": "* 22: Teléfono",
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
                  "label": "* 20: Nuestra Referencia",
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
                  "label": "* AF1: Nombre de Institución",
                  "description": "Nombre de la institución",
                  "value": "",
                  "placeholder": "Ingrese el nombre de la institución...",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "modality",
                  "name": "modality",
                  "type": "textField",
                  "label": "* JAE Modalidad",
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
                  "id": "transmitter",
                  "name": "transmitter",
                  "type": "textField",
                  "label": "* AMI: BIC Emisor",
                  "description": "* AMI: BIC Emisor",
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
                  "id": "receiver",
                  "name": "receiver",
                  "type": "textField",
                  "label": "* AMJ: BIC Receptor",
                  "description": "* AMJ: BIC Receptor",
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
                  "label": "* AMK: Fecha de Emisión",
                  "description": "* AMK: Fecha de Emisión",
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
                  "label": "* OP2: Tipo de Moneda (ISO 4217)",
                  "description": "* OP2: Tipo de Moneda (ISO 4217)",
                  "value": "",
                  "defaultValue": "clp",
                  // "placeholder": "Agregar referencia...",
                  "properties": {
                     "name": "select",
                     "columns": "4",
                     "rows": "1",
                     "options": [{
                        "label": "Peso Chileno CLP",
                        "value": "clp"
                     }]
                  }
               },
               {
                  "id": "typeOfCurrency",
                  "name": "typeOfCurrency",
                  "type": "textField",
                  "label": "* OP3: Monto de Operación",
                  "description": "* OP3: Monto de Operación",
                  "value": "",
                  "defaultValue": "$434,324.03",
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
                  "label": "* 79: Observaciones",
                  "description": "* 79: Observaciones",
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
            "parameters": [{
                  "id": "codeField",
                  "name": "code",
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
                  "id": "descriptionField",
                  "name": "code",
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
                  "id": "institutionDestination",
                  "name": "institutionDestination",
                  "label": "Institución de Destino",
                  "type": "select",
                  "description": "Todas las instituciones posibles",
                  "placeholder": "Seleccionar institución de destino...",
                  "defaultValue": "0027 CORP BANCA",
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
                     "options": [{
                        "label": "02 - Normal Sin Aviso de Entrega",
                        "value": "02",
                     }]
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
                     "options": [{
                           "label": "Sí",
                           "value": "yes"
                        },
                        {
                           "label": "No",
                           "value": "no"
                        }
                     ]
                  }
               },
               {
                  "id": "userResponsable",
                  "name": "userResponsable",
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
                  "label": "* 20: Nuestra Referencia",
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
                  "label": "* 20: Su Referencia",
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
                  "label": "* 79D: Texto Libre",
                  "description": "* 79: Texto Libre",
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
                  "label": "* 79: Observaciones",
                  "description": "* 79: Observaciones",
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
            "id": "3",
            "messageCode": "670",
            "description": "ALZAMIENTO HIPOTECARIO",
            "parameters": [{
                  "id": "codeField",
                  "name": "code",
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
                  "id": "descriptionField",
                  "name": "code",
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
                  "id": "institutionDestination",
                  "name": "institutionDestination",
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
                     "options": [{
                        "label": "02 - Normal Sin Aviso de Entrega",
                        "value": "02",
                     }]
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
                     "options": [{
                           "label": "Sí",
                           "value": "yes"
                        },
                        {
                           "label": "No",
                           "value": "no"
                        }
                     ]
                  }
               },
               {
                  "id": "dateAlzamientoHipotecario",
                  "name": "dateAlzamientoHipotecario",
                  "type": "textField",
                  "label": "#34Q: Fecha Alzamiento Hipotecario",
                  "description": "Fecha Alzamiento Hipotecario",
                  "value": "",
                  "defaultValue": "17/01/2024", //TODO: date now
                  "placeholder": "Fecha Alzamiento Hipotecario",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGA",
                  "name": "SGA",
                  "type": "textField",
                  "label": "SGA: Canal",
                  "description": "SGA",
                  "value": "",
                  "defaultValue": "Personas",
                  "placeholder": "Canal",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "CW7",
                  "name": "CW7",
                  "type": "textField",
                  "label": "CW7: Tipo de Operación",
                  "description": "CW7",
                  "value": "",
                  "defaultValue": "Mutuo con Compraventa",
                  "placeholder": "CW7",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGC",
                  "name": "SGC",
                  "type": "textField",
                  "label": "SGC: Notaría Repertorio",
                  "description": "SGC",
                  "value": "",
                  "defaultValue": "15001-Conservador y Archivero de A...",
                  "placeholder": "SGC",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGD",
                  "name": "SGD",
                  "type": "textField",
                  "label": "SGD: Fecha Repertorio",
                  "description": "SGD",
                  "value": "",
                  "defaultValue": "03/01/2024",
                  "placeholder": "SGD",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGE",
                  "name": "SGE",
                  "type": "textField",
                  "label": "SGE: Número Repertorio",
                  "description": "SGE",
                  "value": "",
                  "defaultValue": "123456-7",
                  "placeholder": "SGE",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                  },
               },
               {
                  "id": "CS0",
                  "name": "CS0",
                  "type": "textField",
                  "label": "CS0: Señores Institución",
                  "description": "CS0",
                  "value": "",
                  "defaultValue": "Seleccione un banco",
                  "placeholder": "CS0",
                  "properties": {
                     "name": "textField",
                     "columns": "12",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGF",
                  "name": "SGF",
                  "type": "textField",
                  "label": "SGF: Don-Doña-La Sociedad (Si corresponde)",
                  "description": "SGF",
                  "value": "",
                  "defaultValue": "Nombre Cliente",
                  "placeholder": "SGF",
                  "properties": {
                     "name": "textField",
                     "columns": "8",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGG",
                  "name": "SGG",
                  "type": "textField",
                  "label": "SGG: RUT del Vendedor (Si corresponde)",
                  "description": "SGG",
                  "value": "",
                  "defaultValue": "RUT Vendedor",
                  "placeholder": "SGG",
                  "properties": {
                     "name": "textField",
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
                  "value": "",
                  "properties": {
                     "name": "linebreak",
                     "columns": "12",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGH",
                  "name": "SGH",
                  "type": "textField",
                  "label": "SGH: Don-Doña-La Sociedad (Comprador o Mutuario)",
                  "description": "SGH",
                  "value": "",
                  "defaultValue": "Nombre Cliente",
                  "placeholder": "SGH",
                  "properties": {
                     "name": "textField",
                     "columns": "8",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGI",
                  "name": "SGI",
                  "type": "textField",
                  "label": "SGI: RUT del Comprador o Mutuario",
                  "description": "SGI",
                  "value": "",
                  "defaultValue": "RUT Comprador",
                  "placeholder": "SGI",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "SS5",
                  "name": "SS5",
                  "type": "textField",
                  "label": "SS5: Inmueble Correspondiente a",
                  "description": "SS5: Dirección inmueble",
                  "value": "",
                  "defaultValue": "Dirección inmueble",
                  "placeholder": "Dirección inmueble",
                  "properties": {
                     "name": "textField",
                     "columns": "12",
                     "rows": "1",
                  }
               },
               {
                  "id": "E32",
                  "name": "E32",
                  "type": "textField",
                  "label": "E32",
                  "description": "E32",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "",
                  "properties": {
                     "name": "textField",
                     "columns": "12",
                     "rows": "2",
                  }
               },
               {
                  "id": "CS6",
                  "name": "CS6",
                  "type": "textField",
                  "label": "CS6: Ubicado en",
                  "description": "CS6",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "Dirección",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "CS7",
                  "name": "CS7",
                  "type": "textField",
                  "label": "CS7: Comuna de",
                  "description": "CS7",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "Comuna",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "CS8",
                  "name": "CS8",
                  "type": "textField",
                  "label": "CS8: Región de",
                  "description": "CS8",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "Región",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGJ",
                  "name": "SGJ",
                  "type": "linebreak",
                  "label": "SGJ: Para pagar parte del precio de la compraventa, si corresponde",
                  "description": "SGJ Linebreak",
                  "value": "",
                  "properties": {
                     "name": "linebreak",
                     "columns": "12",
                     "rows": "1",
                  }
               },
               {
                  "id": "SGK",
                  "name": "SGK",
                  "type": "textField",
                  "label": "SGK: El Banco",
                  "description": "SGK",
                  "value": "", //TODO: value comes from current user
                  "defaultValue": "",
                  "placeholder": "Banco",
                  "properties": {
                     "name": "textField",
                     "columns": "12",
                     "rows": "1",
                     "disabled": true,
                  }
               },
               {
                  "id": "CSB",
                  "name": "CSB",
                  "type": "linebreak",
                  "label": "CSB: Ha otorgado a",
                  "description": "CSB Linebreak",
                  "value": "",
                  "properties": {
                     "name": "linebreak",
                     "columns": "12",
                     "rows": "1",
                  }
               },
               {
                  "id": "CSC",
                  "name": "CSC",
                  "type": "textField",
                  "label": "CSC: Don-Doña-La Sociedad",
                  "description": "CSC",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "Cliente",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "CSD",
                  "name": "CSD",
                  "type": "moneyField",
                  "label": "CSD: Un mutuo por U.F.",
                  "description": "CSD",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "0,00",
                  "properties": {
                     "name": "moneyField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "CSE",
                  "name": "CSE",
                  "type": "textField",
                  "label": "CSE: Pagadero en Plazo de (años)",
                  "description": "CSE",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "0",
                  "properties": {
                     "name": "textField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "CSF",
                  "name": "CSF",
                  "type": "moneyField",
                  "label": "CSF: Un mutuo Complementario de U.F.",
                  "description": "CSF",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "0,00",
                  "properties": {
                     "name": "moneyField",
                     "columns": "4",
                     "rows": "1",
                  }
               },
               {
                  "id": "CUK",
                  "name": "CUK",
                  "type": "textField",
                  "label": "CUK: Código de Operación Interno",
                  "description": "CUK",
                  "value": "",
                  "defaultValue": "",
                  "placeholder": "Código de Operación Interno",
                  "properties": {
                     "name": "textField",
                     "columns": "12",
                     "rows": "1",
                  }
               }



            ]
         }
      ]
   }
}

// TODO:
/*
add this: Incializar forms desde el backend:
136 y 199 Message Type:
* AMI: BIC Emisor. (CONBCLRM323 default value from figma)
* AF1: Nombre de Institución (0027 CORP BANCA default value from figma,/// corresponde a data del current user)
* AMK: Fecha de Emisión (CurrentDate)
Institución Destino (current institution selected)
*/

const institutionOptionsException = [{
      value: '350',
      label: '350 - SEC.PRINCI'
   },
   {
      value: '729',
      label: '729 - LOS HEROES'
   },
   {
      value: '600',
      label: '600 - INKAS ETV'
   },
   {
      value: '732',
      label: '732 - TAPP'
   },
   {
      value: '730',
      label: '730 - TENPO SA'
   },
   {
      value: '265',
      label: '265 - D.C.V.'
   },
   {
      value: '601',
      label: "601 - BRINK'S"
   },
   {
      value: '0016',
      label: '0016 - BCI'
   },
   {
      value: '0027',
      label: '0027 - CORP BANCA'
   },
   {
      value: '0037',
      label: '0037 - SAN'
   },
   {
      value: '0031',
      label: '0031 - HSBC'
   },
   {
      value: '0039',
      label: '0039 - ITAÚ'
   },
   {
      value: '0041',
      label: '0041 - JPM'
   },
   {
      value: '0049',
      label: '0049 - SECURITY'
   },
   {
      value: '0051',
      label: '0051 - FALABELLA'
   }
];

/*
  {
  "id": 1,
  "messageCode": "670",
  "description": "Alzamiento Hipotecario",
  "name": "670-AlzamientoHipotecario",
  "createdAt": "2021-01-01T12:00:00.000Z",
  "updatedAt": "2021-01-01T12:00:00.000Z"
},
"parameters": [
  {
    "id": 1,
    "schemaId": "670",
    "description": "messageCode",
    "row": 1,
    "column": 2,
    "defaultValue": "Código de mensaje",
    "validationRule": {
      "required": true,
      "minLength": 3
    },
    "priority": 1
  },
  {
    "id": 2,
    "schemaId": "670",
    "description": "Institución Destino",
    "row": 2,
    "column": 2,
    "defaultValue": "0012-BANCO ESTADO",
    "validationRule": {
      "required": true
    },
    "priority": 2
  },
  {
    "id": 3,
    "schemaId": "670",
    "description": "Prioridad",
    "row": 3,
    "column": 2,
    "defaultValue": "02-Normal Sin Aviso de Entrega",
    "validationRule": {
      "required": true
    },
    "priority": 3
  },
  {
    "id": 4,
    "schemaId": "670",
    "description": "Autenticación",
    "row": 4,
    "column": 2,
    "defaultValue": "No",
    "validationRule": {
      "required": true
    },
    "priority": 4
  },
  {
    "id": 5,
    "label": "SGA (Canal)",
    "description": "SGA",
    "row": 1,
    "column": 1,
    "defaultValue": "Personas",
    "validationRule": {
      "required": true
    },
    "priority": 1
  },
  {
    "id": 6,
    "label": "CW7",
    "description": "CW7",
    "row": 1,
    "column": 2,
    "defaultValue": "Mutuo con Compraventa",
    "validationRule": {
      "required": true
    },
    "priority": 2
  },
  {
    "id": 7,
    "label": "Fecha Alzamiento Hipotecario",
    "description": "Fecha Alzamiento Hipotecario",
    "row": 2,
    "column": 1,
    "defaultValue": "17/01/2024",
    "validationRule": {
      "required": true,
      "format": "DD/MM/YYYY"
    },
    "priority": 3
  },
  {
    "id": 8,
    "label": "SGC",
    "description": "SGC",
    "row": 2,
    "column": 2,
    "defaultValue": "15001-Conservador y Archivero de A...",
    "validationRule": {
      "required": true
    },
    "priority": 4
  },
  {
    "id": 9,
    "label": "SGD",
    "description": "SGD",
    "row": 3,
    "column": 1,
    "defaultValue": "03/01/2024",
    "validationRule": {
      "required": true,
      "format": "DD/MM/YYYY"
    },
    "priority": 5
  },
  {
  "id": 6,
  "schemaId": "670",
  "description": "SGE",
  "row": 3,
  "column": 2,
  "defaultValue": "123456-7",
  "validationRule": {
    "required": true
  },
  "priority": 6
},{
  "id": 7,
  "schemaId": "670",
  "description": "CS0",
  "row": 4,
  "column": 12,
  "defaultValue": "Seleccione un banco",
  "validationRule": {
    "required": true
  },
  "priority": 7
},
{
  "id": 8,
  "schemaId": "670",
  "description": "SGF: Don-Doña-La Sociedad",
  "row": 5,
  "column": 6,
  "defaultValue": "Nombre Cliente",
  "validationRule": {
    "required": true
  },
  "priority": 8
},
{
  "id": 9,
  "schemaId": "670",
  "description": "SGG: RUT del Vendedor",
  "row": 5,
  "column": 7,
  "defaultValue": "RUT Vendedor",
  "validationRule": {
    "required": true
  },
}


],
"fields": [
  {
    "id": 1,
    "label": "MSG",
    "description": "Código de mensaje",
    "type": "input",
    "placeholder": "Código de mensaje"
  },
  {
    "id": 2,
    "label": "Destino",
    "description": "Institución Destino",
    "type": "input",
    "placeholder": "Institución Destino"
  },
  {
    "id": 3,
    "label": "Prioridad",
    "description": "Prioridad",
    "type": "input",
    "placeholder": "Prioridad"
  },
  {
    "id": 4,
    "label": "Autenticación",
    "description": "Autenticación",
    "type": "input",
    "placeholder": "Autenticación"
  },
  {
    "id": 5,
    "label": "SGA (Canal)",
    "description": "SGA",
    "type": "input",
    "placeholder": "SGA"
  },
  {
    "id": 6,
    "label": "CW7",
    "description": "CW7",
    "type": "input",
    "placeholder": "CW7"
  },
  {
    "id": 7,
    "label": "Fecha Alzamiento Hipotecario",
    "description": "Fecha Alzamiento Hipotecario",
    "type": "input",
    "placeholder": "Fecha Alzamiento Hipotecario"
  },
  {
    "id": 8,
    "label": "SGC",
    "description": "SGC",
    "type": "input",
    "placeholder": "SGC"
  },
  {
    "id": 9,
    "label": "SGD",
    "description": "SGD",
    "type": "input",
    "placeholder": "SGD"
  },
  {
    "id": 10,
    "label": "SGE",
    "description": "SGE",
    "type": "input",
    "placeholder": "SGE"
  },
  {
    "id": 11,
    "label": "CS0",
    "description": "CS0",
    "type": "input",
    "placeholder": "CS0"
  },
  {
    "id": 12,
    "label": "SGF: Don-Doña-La Sociedad (Si corresponde)",
    "description": "SGF: Don-Doña-La Sociedad",
    "type": "input",
    "placeholder": "SGF: Don-Doña-La Sociedad"
  },
  {
    "id": 13,
    "label": "SGG: RUT del Vendedor (Si corresponde)",
    "description": "SGG: RUT del Vendedor",
    "type": "input",
    "placeholder": "SGG: RUT del Vendedor"
  }

],
"messageParameterValues": [
  {
    "parameterId": 1,
    "messageId": 1,
    "value": "670"
  },
  {
    "parameterId": 5,
    "messageId": 1,
    "value": "Personas"
  },
  {
    "parameterId": 7,
    "messageId": 1,
    "value": "17/01/2024"
  }
]
}

{
  "id": "SGH",
  "name": "SGH",
  "type": "textField",
  "label": "SGH: Don-Doña-La Sociedad (Comprador o Mutuario)",
  "description": "SGH",
  "value": "",
  "defaultValue": "Nombre Cliente",
  "placeholder": "SGH",
  "properties": {
    "name": "textField",
    "columns": "25",
    "rows": "1"
  }
},
{
  "id": "SSS",
  "name": "SSS",
  "type": "textField",
  "label": "SSS: Inmueble Correspondiente a",
  "description": "SSS",
  "value": "",
  "defaultValue": "",
  "placeholder": "SSS",
  "properties": {
    "name": "textField",
    "columns": "25",
    "rows": "1"
  }
},
{
  "id": "CS6",
  "name": "CS6",
  "type": "textField",
  "label": "CS6: Ubicado en",
  "description": "CS6",
  "value": "",
  "defaultValue": "",
  "placeholder": "CS6",
  "properties": {
    "name": "textField",
    "columns": "15",
    "rows": "1"
  }
},
{
  "id": "CS7",
  "name": "CS7",
  "type": "textField",
  "label": "CS7: Comuna de",
  "description": "CS7",
  "value": "",
  "defaultValue": "",
  "placeholder": "CS7",
  "properties": {
    "name": "textField",
    "columns": "15",
    "rows": "1"
  }
},
{
  "id": "CS8",
  "name": "CS8",
  "type": "textField",
  "label": "CS8: Región",
  "description": "CS8",
  "value": "",
  "defaultValue": "",
  "placeholder": "CS8",
  "properties": {
    "name": "textField",
    "columns": "15",
    "rows": "1"
  }
}

*/