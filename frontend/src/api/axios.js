import axios from "axios";

export const axiosApi = axios.create({
    baseURL: 'http://localhost/scadi_test/backend/api'
});