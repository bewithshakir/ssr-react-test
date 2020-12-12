export const getQueryService = (props)=> {
    if (props) {
        console.log('props.history', props.history.location.search)
        const searchStr = props.history.location.search;
        if (searchStr) {
            const param = searchStr.split('&');
            const activeStr = param[1];
            return activeStr;
        } else {
            return null;
        }
        
    }
    
}