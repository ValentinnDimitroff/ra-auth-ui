import { useCallback } from 'react'
import { useAuthProvider } from 'ra-core'

export const useForgotPassword = () => {
    const authProvider = useAuthProvider()

    const forgotPassword = useCallback(
        (email: string) =>
            authProvider.forgotPassword(email).then((res: Response & { errors: string }) => {
                if (res.ok && res.status === 200) {
                    return res
                }

                throw new Error(res.errors)
            }),
        [authProvider]
    )

    return forgotPassword
}
