import axios from "axios";

export const axiosApi = axios.create({
    baseURL: 'http://scandi-test-assigment.atwebpages.com/backend/api'
});