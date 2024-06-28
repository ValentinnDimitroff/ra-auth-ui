import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAuthenticated, useGetIdentity } from 'react-admin'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import ProfileSummaryCard from './ProfileSummaryCard'
import ProfileDetailsCard from './ProfileDetailsCard'

export const ProfilePage = ({ onPictureUpload, onSubmit }) => {
    useAuthenticated()

    const { identity, loading, error } = useGetIdentity()
    const [profileData, setProfileData] = useState()

    useEffect(() => {
        if (!loading) {
            setProfileData(identity)
        }
    }, [identity, loading])

    if (error) return <div>{error}</div>

    if (loading || !profileData) {
        return (
            <Box display="flex" mt={10} justifyContent="center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box mt="20px">
            <Grid container spacing={4}>
                <Grid item lg={4} md={6} xl={4} xs={12}>
                    <ProfileSummaryCard
                        profileData={profileData}
                        onPictureUpload={onPictureUpload}
                    />
                </Grid>
                <Grid item lg={8} md={6} xl={8} xs={12}>
                    <ProfileDetailsCard
                        profileData={profileData}
                        setProfileData={setProfileData}
                        onSubmit={onSubmit}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

ProfilePage.propTypes = {
    onPictureUpload: PropTypes.func,
    onSubmit: PropTypes.func,
}
