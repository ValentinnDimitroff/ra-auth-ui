// @ts-nocheck
import Avatar from '@mui/material/Avatar'
import PropTypes from 'prop-types'

const USER_AVATAR_DEFAULT = '/images/avatars/avatar_11.png'
const USER_AVATAR_SIZE = 15

const styles = {
    avatar: {
        marginBottom: '10px',
        width: USER_AVATAR_SIZE,
        height: USER_AVATAR_SIZE,
        flexShrink: 0,
        flexGrow: 0,
        margin: '0 auto',
    },
}

const AvatarThumbnail = ({ record: { fullName, picture } }) => (
    <Avatar sx={styles.avatar} alt={fullName} src={picture || USER_AVATAR_DEFAULT} />
)

AvatarThumbnail.propTypes = {
    record: PropTypes.object,
}

export default AvatarThumbnail
