import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiUrl";


const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  withCredentials: true,
});

export default axiosInstance;