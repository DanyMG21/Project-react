import Cookies from "js-cookie"
import { tokenName } from "../constants/config"
import jwtDecode from 'jwt-decode'

export const getToken=()=>{
    return Cookies.get(tokenName)
}

export const removeToken = ()=>{
    return Cookies.remove(tokenName)
}

export const setToken =(token:string,expires:Date)=>{
    return Cookies.set(tokenName,token,{expires})
}

export const decodeToken =() =>{
    const token = getToken()
    if(token){
        return jwtDecode(token)
    }
    return null
}