import { useEffect } from "react";
import axios from "axios";
import { Platform } from 'react-native';

export const realbaseURL = Platform.OS === 'web' 
  ? 'http://localhost:5048/api/' 
  : 'http://192.168.42.44:5048/api/';
export const baseURL = 'https://protrans.azurewebsites.net/api/';
export const client = axios.create({baseURL});
