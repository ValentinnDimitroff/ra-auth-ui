import React, { FC, useRef, useState } from 'react'
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
import ReCAPTCHA from 'react-google-recaptcha'

const styles = {
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 1,
    },
    submit: {
        marginY: 3,
    },
    captcha: {
        paddingTop: 20,
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
    captchaSiteKey: string
    notCheckedCaptchaError: string
    showReCaptcha: boolean
}

export const LoginPage: FC<Props> = ({
    title = 'Login',
    color = 'primary',
    buttonText = 'Login',
    signUpRoute = SIGN_UP_ROUTE,
    forgotPasswordRoute = FORGOT_PASSWORD_ROUTE,
    onSuccessRedirect = '/',
    onLoginErrorText = 'Invalid email or password',
    notCheckedCaptchaError = 'Please check the reCAPTCHA box to proceed',
    captchaSiteKey,
    showReCaptcha = true,
    ...props
}) => {
    const login = useLogin()
    const notify = useNotify()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
    const captchaRef = useRef()

    const handleVerificationSuccess = () => {
        setIsCaptchaVerified(true)
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!showReCaptcha || (showReCaptcha && isCaptchaVerified)) {
            login({ email, password }, onSuccessRedirect).catch(() => {
                notify(onLoginErrorText, { type: 'error' })
            })
        } else {
            notify(notCheckedCaptchaError, { type: 'error' })
        }
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
            {showReCaptcha && (
                <div style={styles.captcha}>
                    <ReCAPTCHA
                        sitekey={captchaSiteKey}
                        ref={captchaRef}
                        onChange={handleVerificationSuccess}
                    />
                </div>
            )}
        </AuthScreenBaseLayout>
    )
}
