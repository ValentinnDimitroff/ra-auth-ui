import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';

const USER_AVATAR_DEFAULT = '/images/avatars/avatar_11.png';
const USER_AVATAR_SIZE = 15;

const useStyles = makeStyles((theme) => ({
    avatar: {
        marginBottom: '10px',
        width: theme.spacing(USER_AVATAR_SIZE),
        height: theme.spacing(USER_AVATAR_SIZE),
        flexShrink: 0,
        flexGrow: 0,
        margin: '0 auto',
    },
}));

const AvatarThumbnail = ({ record: { fullName, picture } }) => {
    const classes = useStyles();

    return (
        <Avatar
            className={classes.avatar}
            alt={fullName}
            src={picture || USER_AVATAR_DEFAULT}
        />
    );
};

AvatarThumbnail.propTypes = {
    record: PropTypes.object,
};

export default AvatarThumbnail;
