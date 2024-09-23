// @ts-nocheck
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import { Form, SaveButton, TextInput, required } from 'react-admin'

const styles = {
    actions: {
        justifyContent: 'flex-end',
    },
}

export type PasswordRulesType = {
    RequiteDigit?: boolean
    RequiteLowercase?: boolean
    RequiteNonAlphanumeric?: boolean
    RequiteUppercase?: boolean
    RequitedLength?: PropTypes.number
    RequiteSymbols?: boolean
}

const Title = () => (
    <Box display="flex" alignItems="center">
        <Box mr="10px"> Edit Profile </Box>
        <EditIcon />
    </Box>
)

const AccountDetails = ({ profileData, className, setProfileData, onSubmit }) => {
    const handleSubmit = async (values) => {
        const result = await onSubmit(values)
        setProfileData(result)
    }

    return (
        <Card className={className}>
            <CardHeader subheader="The information can be edited" title={<Title />} />
            <Divider />
            <Form
                initialValues={profileData}
                redirect={false}
                save={handleSubmit}
                onSubmit={handleSubmit}
                // validateOnBlur
                variant="outlined"
            >
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
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextInput
                                label="Last name"
                                source="lastName"
                                fullWidth
                                margin="dense"
                                validate={[required()]}
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
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextInput
                                label="Phone Number"
                                source="phoneNumber"
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={styles.actions}>
                    <SaveButton label="Save details" />
                </CardActions>
            </Form>
        </Card>
    )
}

AccountDetails.defaultProps = {
    onSubmit: () => {
        throw new Error('onSubmit is not implemented')
    },
}

AccountDetails.propTypes = {
    profileData: PropTypes.object,
    setProfileData: PropTypes.func,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
}

export default AccountDetails
