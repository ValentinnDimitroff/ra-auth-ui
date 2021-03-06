import { useCallback } from 'react';
import { useAuthProvider } from 'ra-core';

export const useForgotPassword = () => {
    const authProvider = useAuthProvider();

    const forgotPassword = useCallback(
        (email) => authProvider.forgotPassword(email)
            .then((res) => {
                if (res.ok && res.status === 200) {
                    return res;
                }

                throw new Error(res.errors);
            }),
        [authProvider],
    );

    return forgotPassword;
};
