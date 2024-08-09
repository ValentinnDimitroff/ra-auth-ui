import { AuthOptionsContext } from '../../context/AuthOptionsContext'
import { useContext } from 'react'
import { Logout } from 'react-admin'
import { UserMenu } from 'react-admin'

export const AuthUserMenu = () => {
    const { userMenuItems, profilePage } = useContext(AuthOptionsContext)

    console.log('test')

    console.log(typeof userMenuItems);
    

    return (
        <UserMenu>
            {profilePage}
            {...userMenuItems}
            <Logout />
        </UserMenu>
    )
}
