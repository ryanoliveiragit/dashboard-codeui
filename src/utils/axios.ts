import axios from "axios"

const BASE_URL = "https://codeui-api-development.up.railway.app/api";

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type" : "application/json"},
})