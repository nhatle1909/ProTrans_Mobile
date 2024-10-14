import { useEffect } from "react";
import axios from "axios";
export const baseURL = 'http://10.0.2.2:5048/api/';
export const client = axios.create({baseURL});
