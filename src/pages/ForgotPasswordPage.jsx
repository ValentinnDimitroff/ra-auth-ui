import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useNotify } from 'react-admin'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForgotPassword } from '../hooks'
import { SIGN_UP_ROUTE } from '../constants/defaultRoutes'
import { AuthScreenBaseLayout } from '../common'

const styles = {
    submit: {
        margin: [3, 0, 2],
    },
}

export const ForgotPasswordPage = ({
    color,
    buttonText,
    signUpRoute,
    successMessage = <SuccessMessage />,
    failureMessage = <FailureMessage />,
    ...props
}) => {
    const notify = useNotify()
    const forgotPassword = useForgotPassword()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState()
    const [success, setSuccess] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)

        forgotPassword(email)
            .then(() => {
                notify('Submission successful!', 'success')
                setSuccess(true)
            })
            .catch((err) => {
                setErrors(err.errors)
                notify('Unsuccessful submission!', 'error')
            })
    }

    return (
        <AuthScreenBaseLayout {...props}>
            <ul>
                {errors &&
                    Object.keys(errors).map((key) =>
                        errors[key].map((x) => (
                            <li key={x}>
                                <Typography variant="body2" color="error">
                                    {`${key}: ${x}`}
                                </Typography>
                            </li>
                        ))
                    )}
            </ul>
            {!submitted && (
                <form method="post" onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                Enter your email address and we&apos;ll send you a link to
                            </Typography>
                            <Typography>reset your password.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color={color}
                        sx={styles.submit}
                    >
                        {buttonText}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={signUpRoute} variant="body2">
                                Don&apos;t have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            )}
            {errors && failureMessage}
            {success && successMessage}
        </AuthScreenBaseLayout>
    )
}

ForgotPasswordPage.defaultProps = {
    title: 'Forgot your password?',
    color: 'primary',
    buttonText: 'Resset Password',
    signUpRoute: SIGN_UP_ROUTE,
}

ForgotPasswordPage.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    buttonText: PropTypes.string,
    signUpRoute: PropTypes.string,
    successMessage: PropTypes.node,
    failureMessage: PropTypes.node,
    authProvider: PropTypes.object,
}

const SuccessMessage = () => (
    <div>
        <div>Thank you!</div>
        <div>We have sent you an e-mail with instructions how to reset your password.</div>
    </div>
)

const FailureMessage = () => (
    <div>
        There has been an error recieving you request. Please try again shortly or contact us if the
        problem remains.
    </div>
)
