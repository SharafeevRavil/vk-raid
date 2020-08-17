import {useCallback, useContext, useState} from 'react'

export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body && !headers['Content-Type']) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {
                method, body, headers
            });

            if (!response.ok) {
                throw new Error('Что-то пошло не так')
            }
            const data = await response.json();
            console.log(data);
            if (data.message) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false);
            return data
        } catch (e) {
            setLoading(false);
            setError(e.message)
        }
    },[]);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
};
