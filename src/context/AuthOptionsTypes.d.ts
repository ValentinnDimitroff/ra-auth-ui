import { ReactNode } from 'react'

export interface AuthOptionsContextValue {
    profilePage?: ReactNode
    userMenuItems?: ReactNode[]
    loginRedirectPath?: string
}

export default AuthOptionsContext
