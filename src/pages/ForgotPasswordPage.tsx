import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { FC, useState } from 'react'
import { useNotify } from 'react-admin'
import { Link } from 'react-router-dom'
import { AuthScreenBaseLayout, SubmitButton } from '../common'
import { SIGN_UP_ROUTE } from '../constants/defaultRoutes'
import { useForgotPassword } from '../hooks'

const styles = {
    submit: {
        margin: [3, 0, 2],
    },
}

type Props = {
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    buttonText?: string
    signUpRoute?: string
    successMessage?: React.ReactNode
    failureMessage?: React.ReactNode
    title?: string
    copyrights?: React.ReactNode
}

export const ForgotPasswordPage: FC<Props> = ({
    title = 'Forgot your password?',
    color = 'primary',
    buttonText = 'Resset Password',
    signUpRoute = SIGN_UP_ROUTE,
    successMessage = <SuccessMessage />,
    failureMessage = <FailureMessage />,
    ...props
}) => {
    const notify = useNotify()
    const forgotPassword = useForgotPassword()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<Record<string, string[]> | undefined>()
    const [success, setSuccess] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)

        forgotPassword(email)
            .then(() => {
                notify('Submission successful!', { type: 'success' })
                setSuccess(true)
            })
            .catch((err: any) => {
                setErrors(err.errors)
                notify('Unsuccessful submission!', { type: 'error' })
            })
    }

    return (
        <AuthScreenBaseLayout title={title} {...props}>
            <ul>
                {errors &&
                    Object.keys(errors).map((key) =>
                        errors[key].map((x: string) => (
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
                    <SubmitButton buttonText={buttonText} color={color} />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to={signUpRoute}>Don&apos;t have an account? Sign Up</Link>
                        </Grid>
                    </Grid>
                </form>
            )}
            {errors && failureMessage}
            {success && successMessage}
        </AuthScreenBaseLayout>
    )
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
