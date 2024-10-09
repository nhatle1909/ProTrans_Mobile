import { useEffect } from "react";
import axios from "axios";
const baseURL = 'https://localhost:7122/api/';
export const client = axios.create({baseURL});
