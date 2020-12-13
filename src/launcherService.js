import axios from "axios";

export const launcherService = (url)=> {
    
    async function getData() {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log('errrr in api--',)
        }
    }
    return {
        getData
    }
};
