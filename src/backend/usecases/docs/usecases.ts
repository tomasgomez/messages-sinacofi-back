import { Documents } from "@/backend/entities/message/interface";
import { DocUsecases } from "./interface";
import { storeDoc } from "./methods/storeDoc";
import { findDoc } from "./methods/findDoc";


class DocUsecase implements DocUsecases  {
    constructor() {} 

    // get docs
    findDoc = async (doc: Documents): Promise<any | Error> => findDoc(doc);

    // store docs
    storeDoc = async (doc: Documents, messagePath: string): Promise<any | Error> => storeDoc(doc, messagePath);
}

export const docUseCase: DocUsecases = new DocUsecase(); 
