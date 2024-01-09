import React, { Children, cloneElement, isValidElement, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-admin'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Menu, Button, IconButton, Tooltip } from '@mui/material'

const MENU_ID = 'user-menu'

const styles = {
    textButton: {
        textTransform: 'none',
    },
}

const UserMenuBase = ({ label, icon, logout, children }) => {
    const translate = useTranslate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    if (!logout && !children) {
        return null
    }

    const onMenuClick = (event) => setAnchorEl(event.currentTarget)
    const onMenuClose = () => setAnchorEl(null)

    return (
        <div>
            {label ? (
                <Button
                    aria-label={label && translate(label, { _: label })}
                    sx={styles.textButton}
                    aria-owns={open ? MENU_ID : null}
                    color="inherit"
                    startIcon={icon}
                    onClick={onMenuClick}
                >
                    {translate(label, { _: label })}
                </Button>
            ) : (
                <Tooltip title="Profile">
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
                {Children.map(children, (menuItem) =>
                    isValidElement(menuItem)
                        ? cloneElement(menuItem, {
                              onClick: onMenuClose,
                          })
                        : null
                )}
                {logout}
            </Menu>
        </div>
    )
}

UserMenuBase.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.node,
    label: PropTypes.string,
    logout: PropTypes.element,
    icon: PropTypes.node,
}

UserMenuBase.defaultProps = {
    icon: <AccountCircleIcon />,
}

export default UserMenuBase
