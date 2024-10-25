import { router } from "expo-router"
import { RemoveToken } from "../TokenUtil";

export const Logout =() =>{
    RemoveToken()
    router.replace('/');
}