// import AppBarWithUserMenu from './AppBarWithUserMenu';
import React from 'react'
import { Layout } from 'react-admin'
import { AuthAppBar } from './AuthAppBar'

const AuthLayout = (props) => (
    <Layout
        {...props}
        appBar={AuthAppBar}
        // menu={menu}
        // sidebar={sidebar}
    />
);

export default AuthLayout
