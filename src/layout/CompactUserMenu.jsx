import React, {
    Children, cloneElement, isValidElement, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import {
    Menu, Button, IconButton, Tooltip,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircleIcon';

const MENU_ID = 'user-menu';

const useStyles = makeStyles({
    userButton: {
        textTransform: 'none',
    },
});

const CompactUserMenu = ({
    children,
    label,
    icon,
    logout,
}) => {
    const classes = useStyles();
    const translate = useTranslate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    if (!logout && !children) {
        return null;
    }

    const onMenuClick = (event) => setAnchorEl(event.currentTarget);
    const onMenuClose = () => setAnchorEl(null);

    return (
        <div className={classes.user}>
            {label ? (
                <Button
                    aria-label={label && translate(label, { _: label })}
                    className={classes.userButton}
                    aria-owns={open ? MENU_ID : null}
                    color="inherit"
                    startIcon={icon}
                    onClick={onMenuClick}
                >
                    {translate(label, { _: label })}
                </Button>
            ) : (
                <Tooltip title={label}>
                    <IconButton
                        aria-label={label}
                        aria-owns={open ? MENU_ID : null}
                        aria-haspopup
                        color="inherit"
                        onClick={onMenuClick}
                    >
                        {icon}
                    </IconButton>
                </Tooltip>
            )}
            <Menu
                id={MENU_ID}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={onMenuClose}
            >
                {Children.map(children, (menuItem) => (isValidElement(menuItem)
                    ? cloneElement(
                        menuItem,
                        {
                            onClick: onMenuClose,
                        },
                    )
                    : null))}
                {logout}
            </Menu>
        </div>
    );
};

CompactUserMenu.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    logout: PropTypes.element,
    icon: PropTypes.node,
};

CompactUserMenu.defaultProps = {
    icon: <AccountCircleIcon />,
};

export default CompactUserMenu;
