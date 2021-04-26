import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useNotify } from 'react-admin';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useResetPassword } from '../hooks/useResetPassword';
import { AuthScreenBaseLayout } from '../common';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function getUrlParams() {
    let token = '';
    let uid = '';
    const url = new URL(window.location.href);

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of url.searchParams.entries()) {
        if (key === 'token') {
            token = value;
        } else if (key === 'e') {
            uid = value;
        }
    }

    return [token, uid];
}

export const ResetPasswordPage = ({
    color,
    buttonText,
    onSuccessRedirect,
    ...props
}) => {
    const classes = useStyles();
    const notify = useNotify();
    const resetPassword = useResetPassword();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [token, email] = getUrlParams();

    const onSubmit = (e) => {
        e.preventDefault();

        resetPassword({
            token, email, password, confirmPassword,
        }, onSuccessRedirect)
            .then(() => notify('Success! Your Password has been changed!'))
            .catch((err) => {
                setErrors(err.errors);
                notify('Unsuccessful submission!');
            });
    };

    return (
        <AuthScreenBaseLayout {...props}>
            <ul>
                {errors
                    && Object.keys(errors).map((key) => errors[key].map((x) => (
                        <li>
                            <Typography variant="body2" color="error">
                                {`${key}: ${x}`}
                            </Typography>
                        </li>
                    )))}
            </ul>
            <form className={classes.form} method="post" onSubmit={onSubmit}>
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
                    className={classes.submit}
                >
                    {buttonText}
                </Button>
            </form>
        </AuthScreenBaseLayout>
    );
};

ResetPasswordPage.defaultProps = {
    title: 'Reset Password',
    color: 'primary',
    buttonText: 'Submit',
    onSuccessRedirect: '/signin',
};

ResetPasswordPage.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    buttonText: PropTypes.string,
    onSuccessRedirect: PropTypes.string,
    authProvider: PropTypes.object,
};
