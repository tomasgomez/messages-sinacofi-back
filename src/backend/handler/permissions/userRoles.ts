export interface UserInfo {
    user:        User;
    permissions: { [key: string]: boolean };
}
  
export interface User {
    role:            string;
    rut:             string;
    name:            string;
    institutionCode: string;
    area:            string;
    email:           string;
    status:          string;
}

export const userRoles: Record<string, User> = {
    '18782721-3': { 
        role: 'FullAccess',
        rut: '18782721-3',
        name: "J. BUSTOS", 
        institutionCode: "0027", 
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    '6986932-0': { 
        role:'FullAccess', 
        rut: '6986932-0',
        name: 'LUIS PEREIRA',
        institutionCode: "0016", 
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active" 
    },
    '17604011-4': { 
        role: '07', 
        rut: '17604011-4',
        name: 'NICOLAS ROCA',
        institutionCode: "0037", 
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    '3077016': {
        role: '12',
        rut: '3077016',
        name: "DANIEL KOKAL",
        institutionCode: "350",
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    "3077015": {
        role: '13',
        rut: "3077015",
        name: "LUIS P. UPR1",
        institutionCode: "350",
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    "16088932": {
        role: '13',
        rut: "16088932",
        name: "O. VÉLIZ",
        institutionCode: "0027",
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    "13003450": {
        role: '02',
        rut: "13003450",
        name: "P.RAMÍREZ",
        institutionCode: "0049",
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    "16642594": {
        role: '12',
        rut: "16642594",
        name: "JAVIER CANAL",
        institutionCode: "0051",
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    "30077020": {
        role: '07',
        rut: "30077020",
        name: "MONITOREO",
        institutionCode: "0049",
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },
    "25876655": {
        role: '13',
        rut: "25876655",
        name: "LUIS TOMOCHE",
        institutionCode: "0051",
        area: "05",
        email: "felipe.garcia@coddde.com",
        status: "Active"
    },   
};


// const examle =  {
//     "edit": true, // icono de edit
//     "sendMessage": true, // icono send
//     "updateStatusMortgageDischarge": true, // btn actualizar estado
//     "getStatusMortgageDischargeSent": true, //  ----api/?institucionSelected={sent}&institucionDestino={inbox}
//     "getStatusMortgageDischargeInbox": true, //  ----api/?institucionSelected={sent}&institucionDestino={inbox}
//     "acceptMortgageDischarge": true, // 022 no podes actualizar el btn de estado
//     "signMortgageDischarge": true, //lapiz icono 
//     "rejectMortgageDischarge": true, // 672 estado 023 no podes actualizar el btn de estado
//     "access": true, // no tiene acceso a la pantalla

//     "searchMortgageDischargeSent": true, //no
//     "searchMortgageDischargeInbox": true,//no
//     "searchMasterCopySent": true,//no
//     "searchMasterCopyInbox": true,//no
//     "searchDeedAmendmentsSent": true,//no
//     "searchDeedAmendmentsInbox": true, //no

//     "timelineReports": true, // informes ah???
//     "rejectionReports": true, // informes ah???
//     "clientNormalizationNotice": true, // no puedo pasar al 673 // inicio de cliente en normalizacion deshabilitar actualiar estado
//     "prepaidLiquidationRequest": true, // preguntar 675???
//     "prepaidLiquidation": true, // preguntar 675???
//     "detailForPayments": true, // no 676 solicitar los detalles de pago
//     "paymentDetails": true, // no 677 
//     "paymentNotificationMessage": true,  // no 677 / 678 / 679
//     "paymentConfirmationMortgageDischarge": true, // 677 / 678 / 679 
// }