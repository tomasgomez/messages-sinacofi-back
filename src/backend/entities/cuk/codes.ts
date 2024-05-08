
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

 export function isForeclosureMessageCode(code?: string ): boolean {

   if (!code) {
       return false;
   }
    return foreclosureMessageCodes.includes(code);
 }