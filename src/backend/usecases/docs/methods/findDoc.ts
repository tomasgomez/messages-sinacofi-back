import { Documents } from "@/backend/entities/message/interface";
import { PrismaClientWrapper } from "@/backend/repository/prismaWrapper";
import fs from 'fs/promises';
import path from "path";

// get Documents
export async function findDoc(doc: Documents): Promise <Documents | Error> {
    

    if(!doc.url && doc.id){
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();
        let newDoc = await prismaClient.documents.findUnique({where: { id: doc.id }})
        
        if (!newDoc){
            return new Error('errror getting doc')
        }
        doc = newDoc
    }

    if (doc.content){
        return doc;
    }

    // check if the url is missing
    if (!doc.url || !doc.id) {
        return new Error('Url is required');
    }

    const FILES_PATH = process.env["FILES_HOST"] || '/files';
    const filePath = path.join(FILES_PATH, doc.url);
    // read the file
    try {
        const buffer = await fs.readFile(filePath);
        const content = buffer.toString('base64');

        // create the response
        const docResponse: Documents = {
            documentName: doc.documentName,
            content: content,
            messageId: doc.messageId,
            url: doc.url,
            id: doc.id
        }

        return docResponse;
    } catch (error) {
        // console.error('Error reading the file:', error);    
        return doc;    
        return new Error('Error reading the file');
    }

}