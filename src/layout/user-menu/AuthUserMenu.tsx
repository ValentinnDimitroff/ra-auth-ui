import { useContext } from 'react'
import { Logout, UserMenu } from 'react-admin'
import { AuthOptionsContext } from '../../context/AuthOptionsContext'

export const AuthUserMenu = () => {
    const { userMenuItems, profilePage } = useContext(AuthOptionsContext)

    return (
        <UserMenu>
            {profilePage}
            {userMenuItems}
            <Logout />
        </UserMenu>
    )
}
