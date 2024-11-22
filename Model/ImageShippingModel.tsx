import { getImageShippingId } from "@/Utils/ImageShippingAPI/ImageShippingAPI";
import { useEffect, useState } from "react"

export interface ImageShipping {
    id:string
}
export const useImageShipping = (Token:string,id:string) =>{
 const [imageShipping,setImageShipping] = useState<ImageShipping>();
 useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await getImageShippingId(Token, id); // Assuming you have token and id
          setImageShipping(data); 
        }catch (error) {
    
        }
      };
  
      fetchData();
 },[])
 return imageShipping;
}