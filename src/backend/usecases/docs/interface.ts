import { Documents } from "@/backend/entities/message/interface";

export interface DocUsecases {
    storeDoc(doc: Documents): Promise<Documents | Error>;
    findDoc(doc: Documents): Promise<Documents | Error>;
}