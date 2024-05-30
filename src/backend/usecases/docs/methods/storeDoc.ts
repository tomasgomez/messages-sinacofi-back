import { Documents } from "@/backend/entities/message/interface";
import { Message } from "@/backend/entities/message/message";
import fs from 'fs';
import path from 'path';

export async function storeDoc(doc: Documents, messagePath: string): Promise <Documents | Error> {

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
    const storedPath = path.join(FILES_PATH, messagePath, doc.documentName);
    try{
        const ensureDirectoryExistence = (filePath: string) => {
        const dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        fs.mkdirSync(dirname, { recursive: true });
        };
        ensureDirectoryExistence(storedPath);
    }catch(error){
        console.log(error)
        return new Error("saving files")
    }

    // decode the base64 content
    const buffer = Buffer.from(doc.content, 'base64');
    try {
        // save the file
        fs.writeFileSync(storedPath, buffer);
    } catch (error) {
        return new Error('Error saving the file');
    }

    const urlToBeStored = path.join(messagePath, doc.documentName);
    
    // create the response
    const docResponse: Documents = {
        documentName: doc.documentName,
        url: urlToBeStored,
        messageId: doc.messageId
    }

    return docResponse;
}