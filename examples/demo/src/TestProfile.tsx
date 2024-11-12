import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { FC, useEffect, useState } from 'react'
import { useAuthenticated, useGetIdentity } from 'react-admin'

export const TestProfile: FC = () => {
    useAuthenticated()

    const { identity, isLoading, error } = useGetIdentity() //changed prop loading to isLoading, there were no exports for loading
    const [profileData, setProfileData] = useState()

    useEffect(() => {
        if (!isLoading) {
            setProfileData(identity)
        }
    }, [identity, isLoading])

    if (error) return <div>{error}</div>

    if (isLoading || !profileData) {
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
                    <h1>Place holder for photo updates</h1>
                </Grid>
                <Grid item lg={8} md={6} xl={8} xs={12}>
                    <h1>Hello, from TestProfile component. It works, right?</h1>
                </Grid>
            </Grid>
        </Box>
    )
}
