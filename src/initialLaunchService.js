import axios from "axios";
import { configData } from "./components/shared/config";

export const initialLaunchService = (limit)=> {
    
    async function getData() {
        try {
            const response = await axios.get(`${configData.apiPath}?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.log('errrr in api--',)
        }
    }
    return {
        getData
    }
};
