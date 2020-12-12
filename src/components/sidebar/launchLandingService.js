import axios from "axios";
import { configData } from "../shared/config";

export const launchLandingService = (val, limit)=> {
    
    async function getData() {
        try {
            const response = await axios.get(`${configData.apiPath}?limit=${limit}&land_success=${val}`);
            return response.data;
        } catch (error) {
            console.log('errrr in api--',)
        }
    }
    return {
        getData
    }
};
