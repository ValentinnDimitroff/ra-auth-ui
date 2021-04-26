import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthProvider } from 'ra-core';

export const useResetPassword = () => {
    const history = useHistory();
    const authProvider = useAuthProvider();

    const resetPassword = useCallback(
        (values, pathToRedirect) => authProvider.resetPassword(values).then((response) => {
            if (response.ok && response.status === 200) {
                history.push(pathToRedirect);
            }

            return response;
        }),
        [authProvider, history],
    );

    return resetPassword;
};
