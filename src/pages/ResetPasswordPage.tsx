import React, { FC, useState } from 'react'
import { useNotify } from 'react-admin'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useResetPassword } from '../hooks/useResetPassword'
import { AuthScreenBaseLayout } from '../common'

const styles = {
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 3,
    },
    submit: {
        margin: [3, 0, 2],
    },
}

function getUrlParams() {
    let token = ''
    let uid = ''
    const url = new URL(window.location.href)

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of url.searchParams.entries()) {
        if (key === 'token') {
            token = value
        } else if (key === 'e') {
            uid = value
        }
    }

    return [token, uid]
}

type Props = {
    title?: string
    color?: 'primary' | 'secondary'
    buttonText?: string
    onSuccessRedirect?: string
}

export const ResetPasswordPage: FC<Props> = ({
    title = 'Reset Password',
    color = 'primary',
    buttonText = 'Submit',
    onSuccessRedirect = '/signin',
    ...props
}) => {
    const notify = useNotify()
    const resetPassword = useResetPassword()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string[]> | undefined>({})
    const [token, email] = getUrlParams()

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        resetPassword(
            {
                token,
                email,
                password,
                confirmPassword,
            },
            onSuccessRedirect
        )
            .then(() => notify('Success! Your Password has been changed!'))
            .catch((err: any) => {
                setErrors(err.errors)
                notify('Unsuccessful submission!')
            })
    }

    return (
        <AuthScreenBaseLayout title={title} {...props}>
            <ul>
                {errors &&
                    Object.keys(errors).map((key) =>
                        errors[key].map((x: string) => (
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
            </form>
        </AuthScreenBaseLayout>
    )
}
