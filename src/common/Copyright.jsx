import React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://dveconstructions.com/" target="blank">
                DVE Digital Solutions
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

Copyright.propTypes = {}

export default Copyright
