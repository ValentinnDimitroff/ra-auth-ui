import { FC, ReactNode } from 'react';

export interface AuthOptionsContextValue {
        profilePage?: ReactNode;
        userMenuItems?: ReactNode[];
}

declare const AuthOptionsContext: React.Context<AuthOptionsContextValue>;

export default AuthOptionsContext;