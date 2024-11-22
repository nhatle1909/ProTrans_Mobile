
import { useEffect, useState } from "react";
import { decode } from "@googlemaps/polyline-codec";
export interface Coordinate{
  latitude:number;
  longitude:number;
}
export const origin = {latitude: 10.837932096000031,
  longitude: 106.83272935100007}
export const ConvertAddress=  (name:string ) => {
  const [Coordinate,SetCoordinate] = useState<Coordinate>({latitude:0,longitude:0});
  const Name = encodeURIComponent(name);
  useEffect(() => {
  const fetchData = async () => {
      const response = await fetch(`https://rsapi.goong.io/geocode?address=${Name}&api_key=20C8fOYZrkTRtDBnIPeTFT5nRQXhQr7rKNlm4p9b`).then(response => response.json())
      .then(data => {
        SetCoordinate({
          latitude:data.results[0].geometry.location.lat,
          longitude:data.results[0].geometry.location.lng
        })
      })
      .catch(error => {
        console.error('Error:', error);
      });
     };
     fetchData()
    },[]);
   return Coordinate
}
export const CreateRoute= (lat2:number,long2:number,lat:number,long:number) => {

  const [Routes,SetRoutes] = useState<Coordinate[]>([]);
  if (lat >0){
  const fetchData = async () => {
      let response = await fetch(`https://rsapi.goong.io/Direction?origin=${lat2},${long2}&destination=${lat},${long}&api_key=20C8fOYZrkTRtDBnIPeTFT5nRQXhQr7rKNlm4p9b`).then(response => response.json())
      .then(data => {
       const listStep= decode(data.routes[0].overview_polyline.points);
       const firstCoor = {latitude : origin.latitude,longitude:origin.longitude}
       const newList = [firstCoor,...listStep.map(element => ({
          latitude : element[0],
          longitude : element[1]
        }))]
        SetRoutes(newList);
      })
}
fetchData()
}
return Routes;
}