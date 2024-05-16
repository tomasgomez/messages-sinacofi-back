import { Documents } from "@/backend/entities/message/interface";
import fs from 'fs/promises';

// get Documents
export async function findDoc(doc: Documents): Promise <Documents | Error> {
    

    // check if the url is missing
    if (!doc.url) {
        return new Error('Url is required');
    }

    console.log(doc.url);
    // read the file
    try {
        const buffer = await fs.readFile(doc.url);
        const content = buffer.toString('base64');

        // create the response
        const docResponse: Documents = {
            documentName: doc.documentName,
            content: content,
            messageId: doc.messageId
        }

        return docResponse;
    } catch (error) {
        return new Error('Error reading the file');
    }

}