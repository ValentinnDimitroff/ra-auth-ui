import React, { FC } from 'react'
// import { ThemeProvider } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

const styles = {
    paper: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: 1,
        backgroundColor: 'secondary.light',
        color: 'primary',
    },
}

type Props = {
    title: string
    copyrights?: React.ReactNode
    children: React.ReactNode
}

const AuthScreenBaseLayout: FC<Props> = ({ title, copyrights, children }) => (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={styles.paper}>
            <Avatar sx={styles.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {title}
            </Typography>
            {children}
        </Box>
        <Box mt={5}>{copyrights}</Box>
    </Container>
    // </ThemeProvider>
)

export default AuthScreenBaseLayout
