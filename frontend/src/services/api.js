/**
 * Axios client pointed at the Nginx Gateway.
 * Base URL matches docs/api/api-contracts.md.
 */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export default api;
