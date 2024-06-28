import { AuthOptionsContext } from '../../context/AuthOptionsContext'

export const AuthUserMenu = (props) => {
    const {
        authOptions: { userMenuItems, profilePage: ProfilePage },
    } = useContext(AuthOptionsContext)
    return (
        <UserMenu>
            {profilePage && <ProfilePage />}
            {...userMenuItems}
            {...props}
            <Logout />
        </UserMenu>
    )
}
