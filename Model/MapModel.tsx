
import { useEffect, useState } from "react";
import { decode } from "@googlemaps/polyline-codec";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import { GoongAPI } from "@/constants/API";
export interface Coordinate{
  latitude:number;
  longitude:number;
}
export const ConvertAddress=  (name:string ) => {
  const [Coordinate,SetCoordinate] = useState<Coordinate>({latitude:0,longitude:0});
  const Name = encodeURIComponent(name);
  useEffect(() => {
  const fetchData = async () => {
      const response = await fetch(`https://rsapi.goong.io/geocode?address=${Name}&api_key=${GoongAPI}`).then(response => response.json())
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

  const [Routes,SetRoutes] = useState<Position[]>([]);
  if (lat >0){
  const fetchData = async () => {
      let response = await fetch(`https://rsapi.goong.io/Direction?origin=${lat2},${long2}&destination=${lat},${long}&api_key=${GoongAPI}`).then(response => response.json())
      .then(async data => {
       const listStep= await decode(data.routes[0].overview_polyline.points);
        const newList = await listStep.map(([a,b]) => [b,a])
        SetRoutes(newList);
      })
}
fetchData()
}
return Routes;
}