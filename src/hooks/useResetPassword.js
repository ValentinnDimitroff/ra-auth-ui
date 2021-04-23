import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useResetPassword = (authProvider) => {
    const history = useHistory();

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
