import React from 'react';
import PropTypes from 'prop-types';
import {
    FormWithRedirect, TextInput, SaveButton, required,
} from 'react-admin';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
    root: {},
    actions: {
        justifyContent: 'flex-end',
    },
}));

const Title = () => (
    <Box display="flex" alignItems="center">
        <Box mr="10px"> Edit Profile </Box>
        <EditIcon />
    </Box>
);

const AccountDetails = ({
    profileData,
    className,
    setProfileData,
    onSubmit,
}) => {
    const classes = useStyles();

    const handleSubmit = async (values) => {
        const result = await onSubmit(values);
        setProfileData(result);
    };

    return (
        <Card className={`${classes.root} ${className}`}>
            <CardHeader
                subheader="The information can be edited"
                title={<Title />}
            />
            <Divider />
            <FormWithRedirect
                initialValues={profileData}
                redirect={false}
                save={handleSubmit}
                onSubmit={handleSubmit}
                // validateOnBlur
                variant="outlined"
                render={(formProps) => (
                    <form>
                        {/* autoComplete="off" */}
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="First name"
                                        source="firstName"
                                        resource="profile"
                                        fullWidth
                                        margin="dense"
                                        helperText="Please specify the first name"
                                        validate={[required()]}
                                        variant={formProps.variant}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="Last name"
                                        source="lastName"
                                        fullWidth
                                        margin="dense"
                                        validate={[required()]}
                                        variant={formProps.variant}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="Email Address"
                                        source="email"
                                        fullWidth
                                        disabled
                                        margin="dense"
                                        validate={[required()]}
                                        variant={formProps.variant}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextInput
                                        label="Phone Number"
                                        source="phoneNumber"
                                        fullWidth
                                        margin="dense"
                                        variant={formProps.variant}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions className={classes.actions}>
                            <SaveButton
                                // {...formProps}
                                label="Save details"
                                saving={formProps.saving}
                                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                            />
                        </CardActions>
                    </form>
                )}
            />
        </Card>
    );
};

AccountDetails.defaultProps = {
    onSubmit: () => { throw new Error('onSubmit is not implemented'); },
};

AccountDetails.propTypes = {
    profileData: PropTypes.object,
    setProfileData: PropTypes.func,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
};

export default AccountDetails;
