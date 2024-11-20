
import axios from "axios";

// http://localhost:3333 /create
export const api = axios.create({
  baseURL: "http://localhost:3333"
})