// d:/01. IT CAREER/04. REAL PROJECTS/ra-auth-ui/src/context/AuthOptionsContext.d.ts

import { FC, ReactNode } from 'react';

export interface AuthOptionsContextValue {
    authOptions: {
        profilePage?: ReactNode;
        userMenuItems?: ReactNode[];
    };
}

declare const AuthOptionsContext: React.Context<AuthOptionsContextValue>;

export default AuthOptionsContext;