import { useEffect } from "react";
import axios from "axios";
import { Platform } from 'react-native';
import { baseURL } from "@/constants/API";
export const client = axios.create({baseURL});
