import React, { FC, useState } from 'react'
import { useNotify } from 'react-admin'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useSignUp } from '../hooks'
import { AuthScreenBaseLayout } from '../common'
import { LOGIN_ROUTE } from '../constants/defaultRoutes'

const styles = {
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 3,
    },
    submit: {
        margin: [3, 0, 2],
    },
}

type Props = {
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    buttonText?: string
    signUpRoute?: string
    onSuccessRedirect?: string
    title?: string
    copyrights?: React.ReactNode
}

export const SignUpPage: FC<Props> = ({
    color = 'primary',
    buttonText = 'Sign Up',
    title = 'Sign Up',
    onSuccessRedirect = LOGIN_ROUTE,
    ...props
}) => {
    const notify = useNotify()
    const signUp = useSignUp()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string[]> | undefined>({})

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        signUp(
            {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            },
            onSuccessRedirect
        ).catch((err: any) => {
            setErrors(err.errors)
            notify('Unsuccessful submission!')
        })
    }

    return (
        <AuthScreenBaseLayout title={title} {...props}>
            <ul>
                {errors &&
                    Object.keys(errors).map((key) =>
                        errors[key].map((x) => (
                            <li>
                                <Typography variant="body2" color="error">
                                    {`${key}: ${x}`}
                                </Typography>
                            </li>
                        ))
                    )}
            </ul>
            <form method="post" onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                        />
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
                    <Grid item xs={12}>
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
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
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login">Already have an account? Sign in</Link>
                    </Grid>
                </Grid>
            </form>
        </AuthScreenBaseLayout>
    )
}
