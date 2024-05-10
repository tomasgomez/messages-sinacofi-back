
const foreclosureMessageCodes = [
    "670",
    "671",
    "672",
    "673",
    "674",
    "675",
    "676",
    "677",
    "678",
    "679",
 ]

export enum ForeclosureStatus {
    IN_PROCESS = "021",
    APPROVED = "022",
    REJECTED = "023",
    START_NORMALIZATION = "XXX",
    END_NORMALIZATION = "YYY",
    SIGN_IN_PROGRESS = "041",
    SIGNED = "042",
  }
  

 export function isForeclosureMessageCode(code?: string ): boolean {

   if (!code) {
       return false;
   }
    return foreclosureMessageCodes.includes(code);
 }