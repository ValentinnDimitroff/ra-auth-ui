import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthProvider } from 'react-admin'

export const useSignUp = () => {
    const location = useLocation()
    const locationState = location.state
    const navigate = useNavigate()
    const nextPathName = locationState && locationState.nextPathname
    const authProvider = useAuthProvider()

    const singUp = useCallback(
        (params, pathName = '/') =>
            authProvider.signUp(params).then((ret) => {
                navigate(nextPathName || pathName)
                return ret
            }),
        [authProvider, navigate, nextPathName]
    )

    const singUpWithoutProvider = useCallback(() => {
        navigate('/')
        return Promise.resolve()
    }, [navigate])

    return authProvider ? singUp : singUpWithoutProvider
}
