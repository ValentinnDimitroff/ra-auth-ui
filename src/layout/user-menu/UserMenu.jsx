import React, { useContext } from 'react';
import { usePermissions, useAuthenticated, useGetIdentity } from 'react-admin';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { LayoutConfigContext } from '../LayoutConfigContext';
import { PROFILE_ROUTE } from '../../constants/defaultRoutes';
import UserMenuBase from './UserMenuBase';
import UserMenuItem from './UserMenuItem';

const defaultUserMenu = [
    {
        to: PROFILE_ROUTE,
        label: 'Profile',
        icon: <AccountCircleIcon />,
    },
];

const UserMenu = (props) => {
    useAuthenticated();

    const { userMenu: userMenuConfig } = useContext(LayoutConfigContext);
    const { identity, loading: identityLoading } = useGetIdentity();
    const { permissions, loading: permisionsLoading } = usePermissions();

    if (permisionsLoading || identityLoading) return <>Loading...</>;

    const userMenu = userMenuConfig === true
        ? defaultUserMenu
        : userMenuConfig || [];

    return (
        <UserMenuBase
            {...props}
            label={identity.firstName}
            icon={
                identity.picture ? (
                    <Box width={4} height={4}>
                        <Avatar src={identity.picture} />
                    </Box>
                ) : undefined
            }
        >
            {userMenu && userMenu.map((item) => (
                item.checkPermissions
                    ? item.checkPermissions(permissions)
                        ? <UserMenuItem key={item.to} {...item} />
                        : null
                    : <UserMenuItem key={item.to} {...item} />
            ))}
        </UserMenuBase>
    );
};

export default UserMenu;
