import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthProvider } from 'react-admin'

export const useResetPassword = () => {
    const navigate = useNavigate()
    const authProvider = useAuthProvider()

    const resetPassword = useCallback(
        (values, pathToRedirect) =>
            authProvider.resetPassword(values).then((response) => {
                if (response.ok && response.status === 200) {
                    navigate(pathToRedirect)
                }

                return response
            }),
        [authProvider, navigate]
    )

    return resetPassword
}
