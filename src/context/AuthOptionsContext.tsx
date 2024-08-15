import { createContext, FC, PropsWithChildren, ReactNode } from 'react'

export interface AuthOptionsContextType {
    profilePage?: ReactNode
    userMenuItems?: ReactNode[]
    loginRedirectPath?: string
}

export const AuthOptionsContext = createContext<AuthOptionsContextType>({
    profilePage: null,
    userMenuItems: [],
})

AuthOptionsContext.displayName = 'AuthOptionsContext'

type Props = AuthOptionsContextType & PropsWithChildren

export const AuthOptionsContextProvider: FC<Props> = ({ children, ...props }) => {
    return <AuthOptionsContext.Provider value={props}>{children}</AuthOptionsContext.Provider>
}

