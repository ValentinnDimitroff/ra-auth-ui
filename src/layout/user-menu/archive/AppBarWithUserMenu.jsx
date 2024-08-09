import React from 'react'
import { AppBar } from 'react-admin'
import Typography from '@mui/material/Typography'
import { UserMenu } from './user-menu'

const styles = {
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
}

const AppBarWithUserMenu = (props) => (
    <AppBar color="secondary" elevation={3} userMenu={<UserMenu />} {...props}>
        <Typography variant="h6" color="inherit" sx={styles.title} id="react-admin-title" />
    </AppBar>
)

export default AppBarWithUserMenu
