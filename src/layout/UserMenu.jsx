/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
    MenuItemLink, usePermissions, useAuthenticated, useGetIdentity,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CompactUserMenu from './CompactUserMenu';
import { LayoutConfigContext } from './LayoutConfigContext';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.pallete.primary.main,
        textDecoration: 'none',
        '&:hover': {
            color: theme.pallete.primary.main,
        },
        minWidth: '180px',
    },
    icon: {
        color: theme.pallete.primary.main,
        minWidth: '40px',
    },
    active: {
        color: theme.pallete.primary.main,
        backgroundColor: 'transparent',
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const UserMenuItem = ({
    label,
    to,
    icon,
    onClick,
    ...props
}) => {
    const classes = useStyles();

    return (
        <MenuItemLink
            {...props}
            classes={classes}
            to={to}
            primaryText={label}
            leftIcon={icon}
            onClick={onClick}
            sidebarIsOpen
        />
    );
};

const UserMenu = (props) => {
    useAuthenticated();

    const classes = useStyles();
    const { userMenu } = useContext(LayoutConfigContext);

    const { identity, loading: identityLoading } = useGetIdentity();
    const { permissions, loading: permisionsLoading } = usePermissions();

    if (permisionsLoading || identityLoading) return <>Loading...</>;

    return (
        <CompactUserMenu
            {...props}
            label={identity.firstName}
            icon={
                identity.picture ? (
                    <Avatar src={identity.picture} className={classes.avatar} />
                ) : undefined
            }
        >
            {userMenu && userMenu.map((item) => (
                (item?.checkPermissions(permissions)
                || item.checkPermissions === undefined)
                    ? <UserMenuItem {...item} />
                    : null
            ))}
        </CompactUserMenu>
    );
};

UserMenu.propTypes = {};

export default UserMenu;
