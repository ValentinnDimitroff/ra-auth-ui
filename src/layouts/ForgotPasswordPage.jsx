import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNotify } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useForgotPassword } from '../hooks';
import { SIGN_UP_ROUTE } from '../constants/defaultRoutes';
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

export const ForgotPasswordPage = ({
    color,
    buttonText,
    signUpRoute,
    successMessage,
    failureMessage,
    authProvider,
    ...props
}) => {
    const classes = useStyles();
    const notify = useNotify();
    const forgotPassword = useForgotPassword(authProvider);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(undefined);

    const onSubmit = (e) => {
        e.preventDefault();

        forgotPassword(email)
            .then(() => {
                notify('Submission successful!', 'success');
                setResult(true);
            })
            .catch((err) => {
                setErrors(err.errors);
                notify('Unsuccessful submission!', 'error');
                setResult(false);
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
            {result === undefined && (
                <form className={classes.form} method="post" onSubmit={onSubmit}>
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
                        className={classes.submit}
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
            {result !== undefined && (result ? successMessage : failureMessage)}
        </AuthScreenBaseLayout>
    );
};

ForgotPasswordPage.defaultProps = {
    title: 'Forgot your password?',
    color: 'primary',
    buttonText: 'Resset Password',
    signUpRoute: SIGN_UP_ROUTE,
    successMessage: <SuccessMessage />,
    failureMessage: <FailureMessage />,
};

ForgotPasswordPage.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    buttonText: PropTypes.string,
    signUpRoute: PropTypes.string,
    successMessage: PropTypes.node,
    failureMessage: PropTypes.node,
    authProvider: PropTypes.object,
};

const SuccessMessage = () => (
    <div>
        <div>Thank you!</div>
        <div>We have sent you an e-mail with instructions how to reset your password.</div>
    </div>
);

const FailureMessage = () => (
    <div>
        There has been an error recieving you request. Please try again shortly or contact us if
        the problem remains.
    </div>
);

export default ForgotPasswordPage;
