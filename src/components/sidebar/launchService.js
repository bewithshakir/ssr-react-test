import axios from "axios";
import { configData } from "../shared/config";

export const launchService = (val, limit)=> {
    
    async function getData() {
        try {
            const response = await axios.get(`${configData.apiPath}?limit=${limit}&launch_year=${val}`);
            return response.data;
        } catch (error) {
            console.log('errrr in api--',)
        }
    }
    return {
        getData
    }
};
