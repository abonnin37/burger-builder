import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // Remplace componentWillMount()
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    // Remplace componentWillUnmount(), on nettoie les intercepteurs à chaque fois que ceux ci sont instancier et que je composant va se démonter
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];
}