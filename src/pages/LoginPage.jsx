import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    useLogin, useNotify, USER_LOGIN_SUCCESS,
} from 'react-admin';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from '../constants/defaultRoutes';
import { AuthScreenBaseLayout } from '../common';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const LoginPage = ({
    color,
    buttonText,
    signUpRoute,
    forgotPasswordRoute,
    onSuccessRedirect,
    onLoginErrorText = 'Invalid email or password',
    ...props
}) => {
    const classes = useStyles();
    const login = useLogin();
    const notify = useNotify();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        login({ email, password }, onSuccessRedirect)
            .then(() => {
                dispatch({ type: USER_LOGIN_SUCCESS });
            })
            .catch(() => {
                notify(onLoginErrorText, 'error');
            });
    };

    return (
        <AuthScreenBaseLayout {...props}>
            <form method="post" className={classes.form} onSubmit={onSubmit}>
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
                    className={classes.submit}
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
        </AuthScreenBaseLayout>
    );
};

LoginPage.defaultProps = {
    title: 'Login',
    color: 'primary',
    buttonText: 'Login',
    signUpRoute: SIGN_UP_ROUTE,
    forgotPasswordRoute: FORGOT_PASSWORD_ROUTE,
    onSuccessRedirect: '/',
};

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
};
