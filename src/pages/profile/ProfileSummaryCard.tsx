// @ts-nocheck
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { useState } from 'react'
import AvatarThumbnail from './AvatarThumbnail'
import UploadPictureButton from './UploadPictureButton'

const styles = {
    details: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    progress: {
        marginTop: 2,
    },
    uploadButtonLabel: {
        margin: '0px 8px',
        width: '100%',
    },
}

const calcCompleteness = ({ firstName, lastName, email, phoneNumber, picture }) => {
    const filledFields = !!firstName + !!lastName + !!email + !!phoneNumber + !!picture

    return Math.trunc((filledFields / 5) * 10) * 10
}

const AccountSummary = ({ className, profileData, onPictureUpload, ...rest }) => {
    const fullName = profileData && `${profileData.firstName} ${profileData.lastName}`
    const completePercentage = calcCompleteness(profileData)
    const [picture, setPicture] = useState(profileData.picture)

    const onUpload = async (file) => {
        const newPicture = await onPictureUpload(file)
        setPicture(newPicture)
    }

    return (
        <Card {...rest} className={className}>
            <CardContent>
                <Box sx={styles.details}>
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
                </Box>
                <Box sx={styles.progress}>
                    <Typography variant="body1">
                        {`Profile Completeness: ${completePercentage}%`}
                    </Typography>
                    <LinearProgress value={completePercentage} variant="determinate" />
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <UploadPictureButton sx={styles.uploadButtonLabel} onUpload={onUpload} />
            </CardActions>
        </Card>
    )
}

AccountSummary.defaultProps = {
    onPictureUpload: () => {
        throw new Error('onPictureUpload is not implemented')
    },
}

AccountSummary.propTypes = {
    className: PropTypes.string,
    profileData: PropTypes.object,
    onPictureUpload: PropTypes.func,
}

export default AccountSummary
