import { Documents } from "@/backend/entities/message/interface";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function storeDoc(doc: Documents): Promise <Documents | Error> {

    // check if the required fields are missing
    if (!doc.content) {
        return new Error('Content is required');
    }

    // check if the name is missing
    if (!doc.documentName) {
        return new Error('Name is required');
    }

    const FILES_PATH = process.env["FILES_HOST"]|| '/files';

    // create a unique id
    const fileId = uuidv4();
    const filePath = path.join(FILES_PATH, fileId, doc.documentName);

    console.log(filePath);

    // check if the folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // decode the base64 content
    const buffer = Buffer.from(doc.content, 'base64');

    try {
        // save the file
        fs.writeFileSync(filePath, buffer);
    } catch (error) {
        return new Error('Error saving the file');
    }

    const urlToBeStored = path.join(fileId, doc.documentName);
    
    // create the response
    const docResponse: Documents = {
        documentName: doc.documentName,
        url: urlToBeStored,
        messageId: doc.messageId
    }

    return docResponse;
}