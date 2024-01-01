import React, { useState } from 'react'
import PropTypes from 'prop-types'
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

export const LoginPage = ({
    color,
    buttonText,
    signUpRoute,
    forgotPasswordRoute,
    onSuccessRedirect,
    onLoginErrorText = 'Invalid email or password',
    ...props
}) => {
    const login = useLogin()
    const notify = useNotify()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        login({ email, password }, onSuccessRedirect).catch(() => {
            notify(onLoginErrorText, 'error')
        })
    }

    return (
        <AuthScreenBaseLayout {...props}>
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
                            <Link to={forgotPasswordRoute} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={signUpRoute} variant="body2">
                                {" Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </AuthScreenBaseLayout>
    )
}

LoginPage.defaultProps = {
    title: 'Login',
    color: 'primary',
    buttonText: 'Login',
    signUpRoute: SIGN_UP_ROUTE,
    forgotPasswordRoute: FORGOT_PASSWORD_ROUTE,
    onSuccessRedirect: '/',
}

LoginPage.propTypes = {
    theme: PropTypes.object,
    title: PropTypes.string,
    color: PropTypes.string,
    buttonText: PropTypes.string,
    copyrights: PropTypes.node,
    signUpRoute: PropTypes.string,
    forgotPasswordRoute: PropTypes.string,
    onSuccessRedirect: PropTypes.string,
    onLoginErrorText: PropTypes.string,
}
