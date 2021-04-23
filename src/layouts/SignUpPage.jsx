import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNotify } from 'react-admin';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useSignUp from '../hooks/useSignUp';
import { AuthScreenBaseLayout } from '../common';
import { LOGIN_ROUTE } from '../constants/defaultRoutes';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SignUpPage = ({
    color,
    buttonText,
    authProvider,
    onSuccessRedirect,
    ...props
}) => {
    const classes = useStyles();
    const notify = useNotify();
    const signUp = useSignUp(authProvider);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();

        signUp({
            firstName, lastName, email, password, confirmPassword,
        }, onSuccessRedirect)
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
                    className={classes.submit}
                >
                    {buttonText}
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthScreenBaseLayout>
    );
};

SignUpPage.defaultProps = {
    title: 'Sign Up',
    color: 'primary',
    buttonText: 'Sign Up',
    onSuccessRedirect: LOGIN_ROUTE,
};

SignUpPage.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    buttonText: PropTypes.string,
    onSuccessRedirect: PropTypes.string,
    authProvider: PropTypes.object,
};
