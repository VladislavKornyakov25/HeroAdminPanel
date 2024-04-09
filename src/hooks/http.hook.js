import { useCallback } from "react";

export const useHttp = () => {
    // const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        console.log('postData');
        // setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            // setProcess('error');
            throw e;
        }
    }, []);

    // const postData = (url, inputData) => useCallback(async (url, method = 'POST', body = JSON.stringify(inputData), headers = {'Content-Type': 'application/json'}) => {
    //     console.log('postData');
    //     const response = await fetch(url, {method, body, headers});
    //     // try {
    //     //     if (!response.ok) {
    //     //         throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    //     //     }
    //     //     const data = await response.json();

    //     //     return data;
    //     // } catch(e) {
    //     //     throw e;
    //     // }

    // }, []);


    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    return {request, 
            // clearError, 
            // process, 
            // setProcess
        }
}