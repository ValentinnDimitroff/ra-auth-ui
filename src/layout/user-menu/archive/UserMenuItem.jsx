import React from 'react'
import PropTypes from 'prop-types'
import { MenuItemLink, useTranslate } from 'react-admin'

const styles = {
    root: {
        color: 'primary.main',
        textDecoration: 'none',
        '&:hover': {
            color: 'primary.main',
        },
        minWidth: '180px',
    },
    icon: {
        color: 'primary.main',
        minWidth: '40px',
    },
    active: {
        color: 'primary.main',
        backgroundColor: 'transparent',
    },
}

const UserMenuItem = React.forwardRef(({ label, to, icon, onClick, ...props }, ref) => {
    const translate = useTranslate()

    return (
        <MenuItemLink
            {...props}
            ref={ref}
            to={to}
            primaryText={translate(label)}
            leftIcon={icon}
            onClick={onClick}
            sx={styles}
            sidebarIsOpen
        />
    )
})

UserMenuItem.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
}

export default UserMenuItem
