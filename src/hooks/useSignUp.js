import { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export const useSignUp = (authProvider) => {
    const location = useLocation();
    const locationState = location.state;
    const history = useHistory();
    const nextPathName = locationState && locationState.nextPathname;

    const singUp = useCallback(
        (params, pathName = '/') => authProvider.signUp(params).then((ret) => {
            history.push(nextPathName || pathName);
            return ret;
        }),
        [authProvider, history, nextPathName],
    );

    const singUpWithoutProvider = useCallback(
        () => {
            history.push('/');
            return Promise.resolve();
        },
        [history],
    );

    return authProvider ? singUp : singUpWithoutProvider;
};
