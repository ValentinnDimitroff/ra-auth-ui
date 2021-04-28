import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'react-admin';
import AccountCircleIcon from '@material-ui/icons/AccountCircleIcon';
import AppBarWithUserMenu from './AppBarWithUserMenu';
import { LayoutConfigContextProvider } from './LayoutConfigContext';
import { PROFILE_ROUTE } from '../constants/defaultRoutes';

const LayoutWithUserMenu = ({ userMenu, ...props }) => (
    <LayoutConfigContextProvider value={{ userMenu }}>
        <Layout
            {...props}
            appBar={AppBarWithUserMenu}
        />
    </LayoutConfigContextProvider>
);

LayoutWithUserMenu.defaultProps = {
    userMenu: [
        {
            to: PROFILE_ROUTE,
            label: 'Profile',
            icon: <AccountCircleIcon />,
        },
    ],
};

LayoutWithUserMenu.propTypes = {
    userMenu: PropTypes.array,
};

export default LayoutWithUserMenu;
