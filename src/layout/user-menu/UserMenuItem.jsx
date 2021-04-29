import React from 'react';
import PropTypes from 'prop-types';
import { MenuItemLink, useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.primary.main,
        },
        minWidth: '180px',
    },
    icon: {
        color: theme.palette.primary.main,
        minWidth: '40px',
    },
    active: {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

const UserMenuItem = React.forwardRef(
    ({
        label,
        to,
        icon,
        onClick,
        ...props
    },
    ref) => {
        const classes = useStyles();
        const translate = useTranslate();

        return (
            <MenuItemLink
                {...props}
                ref={ref}
                to={to}
                primaryText={translate(label)}
                leftIcon={icon}
                onClick={onClick}
                classes={classes}
                sidebarIsOpen
            />
        );
    },
);

UserMenuItem.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
};

export default UserMenuItem;
