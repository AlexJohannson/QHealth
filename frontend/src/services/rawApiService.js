import axios from "axios";
import {baseURL} from "../constants/urls";

const rawApiService = axios.create({ baseURL });

export { rawApiService };