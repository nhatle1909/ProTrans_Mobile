import { GetDocument, GetDocuments2 } from "@/Utils/DocumentAPI/DocumentAPI";
import { GetLanguage } from "@/Utils/LanguageAPI/LanguageAPI";
import { useEffect, useState } from "react";
import { Document } from "./DocumentModel";

export interface NotarizationDetail{
    id:string;
    documentId : string;
    firstLanguage : string;
    secondLanguage: string
    code: string;
    pageNumber: string;
    numberOfNotarizedCopies: number;
}
export const useDocumentList2 =  (Token:string,id:string) => {
    const [DocumentList, setDocumentList] = useState<NotarizationDetail[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await GetDocuments2(Token, id); // Assuming you have token and id
          setDocumentList(data); // Update state with initial data
          // Iterate through each assignment notarization and fetch order details
          const updatedData = await Promise.all(
            data.map(async (item) => {
              const Document = await GetDocument(Token,item.documentId);
              const firstLanguage = await GetLanguage(Token, Document.firstLanguageId);
              const secondLanguage = await GetLanguage(Token, Document.secondLanguageId);
  
              return {
                ...item,
                firstLanguage: firstLanguage.name,
                secondLanguage: secondLanguage.name,
                code: Document.code,
                pageNumber : Document.pageNumber,
                numberOfNotarizedCopies:Document.numberOfNotarizedCopies
              };
            })
          );
  
          setDocumentList(updatedData);
          
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    return DocumentList;
  };
