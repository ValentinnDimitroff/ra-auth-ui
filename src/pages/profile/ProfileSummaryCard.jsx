import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import AvatarThumbnail from './AvatarThumbnail';
import UploadPictureButton from './UploadPictureButton';

const useStyles = makeStyles((theme) => ({
    root: {},
    details: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    progress: {
        marginTop: theme.spacing(2),
    },
    uploadButtonLabel: {
        margin: '0px 8px',
        width: '100%',
    },
}));

const calcCompleteness = ({
    firstName, lastName, email, phoneNumber, picture,
}) => {
    const filledFields = !!firstName + !!lastName + !!email + !!phoneNumber + !!picture;

    return Math.trunc((filledFields / 5) * 10) * 10;
};

const AccountSummary = ({
    className, profileData, onPictureUpload, ...rest
}) => {
    const fullName = profileData && `${profileData.firstName} ${profileData.lastName}`;
    const classes = useStyles();
    const completePercentage = calcCompleteness(profileData);
    const [picture, setPicture] = useState(profileData.picture);

    const onUpload = async (file) => {
        const newPicture = await onPictureUpload(file);
        setPicture(newPicture);
    };

    return (
        <Card {...rest} className={`${classes.root} ${className}`}>
            <CardContent>
                <div className={classes.details}>
                    <AvatarThumbnail record={{ fullName, picture }} />
                    <Typography gutterBottom variant="h3">
                        {fullName}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        Sofia, Bulgaria
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {/* {moment().format('hh:mm A')} ({user.timezone}) */}
                    </Typography>
                </div>
                <div className={classes.progress}>
                    <Typography variant="body1">
                        {`Profile Completeness: ${completePercentage}%`}
                    </Typography>
                    <LinearProgress value={completePercentage} variant="determinate" />
                </div>
            </CardContent>
            <Divider />
            <CardActions>
                <UploadPictureButton
                    className={classes.uploadButtonLabel}
                    onUpload={onUpload}
                />
            </CardActions>
        </Card>
    );
};

AccountSummary.defaultProps = {
    onPictureUpload: () => { throw new Error('onPictureUpload is not implemented'); },
};

AccountSummary.propTypes = {
    className: PropTypes.string,
    profileData: PropTypes.object,
    onPictureUpload: PropTypes.func,
};

export default AccountSummary;
