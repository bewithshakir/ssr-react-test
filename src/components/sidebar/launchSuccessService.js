import axios from "axios";
import { configData } from "../shared/config";

export const launchSuccessService = (val, limit)=> {
    
    async function getData() {
        try {
            const response = await axios.get(`${configData.apiPath}?limit=${limit}&launch_success=${val}`);
            return response.data;
        } catch (error) {
            console.log('errrr in successfull api--',)
        }
    }
    return {
        getData
    }
};
