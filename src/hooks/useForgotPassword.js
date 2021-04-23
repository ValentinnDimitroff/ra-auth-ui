import { useCallback } from 'react';

export const useForgotPassword = (authProvider) => {
    const forgotPassword = useCallback(
        (email) => authProvider.forgotPassword(email).then((res) => {
            if (res.ok && res.status === 200) {
                return res;
            }

            throw new Error(res.errors);
        }),
        [authProvider],
    );

    return forgotPassword;
};
