export const userRoles = {
    '18782721-3': { role: 'profileFullAccess', institutionCode: "0027", area: ""},
    '6986932-0': { role:'profile02', institutionCode: "0027", area: "" },
    '17604011-4': { role: 'profile07', institutionCode: "0027", area: "" }
};




const examle =  {
    "edit": true, // icono de edit
    "sendMessage": true, // icono send
    "updateStatusMortgageDischarge": true, // btn actualizar estado
    "getStatusMortgageDischargeSent": true, //  ----api/?institucionSelected={sent}&institucionDestino={inbox}
    "getStatusMortgageDischargeInbox": true, //  ----api/?institucionSelected={sent}&institucionDestino={inbox}
    "acceptMortgageDischarge": true, // 022 no podes actualizar el btn de estado
    "signMortgageDischarge": true, //lapiz icono 
    "rejectMortgageDischarge": true, // 672 estado 023 no podes actualizar el btn de estado
    "access": true, // no tiene acceso a la pantalla






    "searchMortgageDischargeSent": true, //no
    "searchMortgageDischargeInbox": true,//no
    "searchMasterCopySent": true,//no
    "searchMasterCopyInbox": true,//no
    "searchDeedAmendmentsSent": true,//no
    "searchDeedAmendmentsInbox": true, //no

    "timelineReports": true, // informes ah???
    "rejectionReports": true, // informes ah???
    "clientNormalizationNotice": true, // no puedo pasar al 673 // inicio de cliente en normalizacion deshabilitar actualiar estado
    "prepaidLiquidationRequest": true, // preguntar 675???
    "prepaidLiquidation": true, // preguntar 675???
    "detailForPayments": true, // no 676 solicitar los detalles de pago
    "paymentDetails": true, // no 677 
    "paymentNotificationMessage": true,  // no 677 / 678 / 679
    "paymentConfirmationMortgageDischarge": true, // 677 / 678 / 679 
}