import React, { FC, useState } from 'react'
import { useLogin, useNotify } from 'react-admin'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from '../constants/defaultRoutes'
import { AuthScreenBaseLayout } from '../common'

const styles = {
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 1,
    },
    submit: {
        marginY: 3,
    },
}

type Props = {
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    buttonText?: string
    signUpRoute?: string
    successMessage?: React.ReactNode
    failureMessage?: React.ReactNode
    title?: string
    copyrights?: React.ReactNode
    forgotPasswordRoute?: string
    onSuccessRedirect?: string
    onLoginErrorText?: string
}

export const LoginPage: FC<Props> = ({
    title = 'Login',
    color = 'primary',
    buttonText = 'Login',
    signUpRoute = SIGN_UP_ROUTE,
    forgotPasswordRoute = FORGOT_PASSWORD_ROUTE,
    onSuccessRedirect = '/',
    onLoginErrorText = 'Invalid email or password',
    ...props
}) => {
    const login = useLogin()
    const notify = useNotify()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login({ email, password }, onSuccessRedirect).catch(() => {
            notify(onLoginErrorText, { type: 'error' })
        })
    }

    return (
        <AuthScreenBaseLayout title={title} {...props}>
            <Box sx={styles.form}>
                <form method="post" onSubmit={onSubmit}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color={color} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color={color}
                        sx={styles.submit}
                    >
                        {buttonText}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to={forgotPasswordRoute}>Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to={signUpRoute}>{" Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </AuthScreenBaseLayout>
    )
}
