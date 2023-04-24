import axios from "axios";

export const dataBaseInstans = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})