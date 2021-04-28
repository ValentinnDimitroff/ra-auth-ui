import React, { useContext } from 'react';
import { Layout } from 'react-admin';
import AppBarWithUserMenu from './AppBarWithUserMenu';
import { LayoutConfigContext } from './LayoutConfigContext';

const AuthLayout = (props) => {
    const { appBar, menu, sidebar } = useContext(LayoutConfigContext);

    return (
        <Layout
            {...props}
            appBar={appBar || AppBarWithUserMenu}
            menu={menu}
            sidebar={sidebar}
        />
    );
};

export default AuthLayout;
