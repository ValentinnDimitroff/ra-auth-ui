import React from 'react';
import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { UserMenu } from './user-menu';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const AppBarWithUserMenu = (props) => {
    const classes = useStyles();

    return (
        <AppBar
            color="secondary"
            elevation={3}
            userMenu={(
                <UserMenu />
            )}
            {...props}
        >
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
        </AppBar>
    );
};

export default AppBarWithUserMenu;
