import { GetDocuments, GetDocuments2 } from "@/Utils/DocumentAPI/DocumentAPI";
import { GetLanguage } from "@/Utils/LanguageAPI/LanguageAPI";
import { useEffect, useState } from "react";
export interface Document{
    firstLanguageId : string;
    secondLanguageId: string;
    firstLanguage : string;
    secondLanguage: string
    code: string;
    pageNumber: string;
    numberOfNotarizedCopies: number;
}
export interface DocumentListModel{
    id: string;
    document:Document
   
    urlPath:string
    //----------
}
export const useDocumentList = (Token:string,id:string) => {
    const [DocumentList, setDocumentList] = useState<DocumentListModel[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await GetDocuments(Token, id); // Assuming you have token and id
          // Iterate through each assignment notarization and fetch order details
          const updatedData = await Promise.all(
            data.map(async (item) => {
              const firstLanguage = await GetLanguage(Token, item.document.firstLanguageId);
              const secondLanguage = await GetLanguage(Token, item.document.secondLanguageId);
  
              return {
                ...item,
                document: {
                  ...item.document,
                  firstLanguage: firstLanguage.name,
                  secondLanguage: secondLanguage.name,
                },
              };
            })
          );
  
          setDocumentList(updatedData);
          
  
        } catch (error) {
       
        }
      };
      fetchData();
    }, []);
    return DocumentList;
  };
