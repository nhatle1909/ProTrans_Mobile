import { useEffect } from "react";
import axios from "axios";
import { Platform } from 'react-native';

export const baseURL = Platform.OS === 'web' 
  ? 'http://localhost:5048/api/' 
  : 'http://10.0.2.2:5048/api/';
export const client = axios.create({baseURL});
