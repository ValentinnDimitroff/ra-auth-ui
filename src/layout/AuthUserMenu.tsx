import { FC, useContext } from 'react'
import { Logout, UserMenu } from 'react-admin'
import { AuthOptionsContext } from '../context/AuthOptionsContext'

/**
 * UserMenu constructed by authOptions' profilePage and userMenuItems 
 * @returns 
 */
export const AuthUserMenu: FC = () => {
    const { userMenuItems, profilePage } = useContext(AuthOptionsContext)

    return (
        <UserMenu>
            {/* {profilePage} */}
            {userMenuItems}
            <Logout />
        </UserMenu>
    )
}
