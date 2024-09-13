import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import { FC, useEffect, useState } from 'react'
import { useAuthenticated, useGetIdentity } from 'react-admin'

export const TestProfile: FC = () => {
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
                    <h1>Place holder for photo updates</h1>
                </Grid>
                <Grid item lg={8} md={6} xl={8} xs={12}>
                    <h1>Hello, from TestProfile component. It works, right?</h1>
                </Grid>
            </Grid>
        </Box>
    )
}
