import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { AuthOptionsContextValue } from './AuthOptionsTypes'

const AuthOptionsContext = createContext<AuthOptionsContextValue>({
    authOptions: {
        profilePage: null,
        userMenuItems: [],
    },
})

AuthOptionsContext.displayName = 'AuthOptionsContext'

type AuthOptionsContextProviderProps = {
    value: AuthOptionsContextValue
    children: React.ReactNode
}

const AuthOptionsContextProvider = ({
    value,
    children,
}: AuthOptionsContextProviderProps) => {
    return <AuthOptionsContext.Provider value={value}>{children}</AuthOptionsContext.Provider>
}

AuthOptionsContextProvider.propTypes = {
    value: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
}

export { AuthOptionsContext, AuthOptionsContextProvider }


