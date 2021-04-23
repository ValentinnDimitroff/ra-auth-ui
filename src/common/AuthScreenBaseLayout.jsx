import React from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const AuthScreenBaseLayout = ({
    title,
    theme,
    copyrights,
    children,
}) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    {children}
                </div>
                <Box mt={5}>
                    {copyrights}
                </Box>
                <Notification />
            </Container>
        </ThemeProvider>
    );
};

AuthScreenBaseLayout.propTypes = {
    title: PropTypes.string,
    theme: PropTypes.object,
    children: PropTypes.any,
    copyrights: PropTypes.node,
};

export default AuthScreenBaseLayout;
