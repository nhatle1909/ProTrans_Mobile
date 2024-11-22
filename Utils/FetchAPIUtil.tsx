import { useEffect } from "react";
import axios from "axios";
import { Platform } from 'react-native';

export const baseURL = 'https://protrans.azurewebsites.net/api/';
export const client = axios.create({baseURL});
