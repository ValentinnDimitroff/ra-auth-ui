// @ts-nocheck
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useAuthenticated, useGetIdentity } from 'react-admin'
import ProfileDetailsCard from './ProfileDetailsCard'
import ProfileSummaryCard from './ProfileSummaryCard'

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
