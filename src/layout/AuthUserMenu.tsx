import { FC, useContext } from 'react'
import { Logout, MenuItemLink, UserMenu } from 'react-admin'
import { AuthOptionsContext } from '../context/AuthOptionsContext'
import { Person } from '@mui/icons-material'

/**
 * UserMenu constructed by authOptions' profilePage and userMenuItems
 * @returns
 */
export const AuthUserMenu: FC = () => {
    const { userMenuItems, profilePage } = useContext(AuthOptionsContext)
    
    return (
        <UserMenu>
            {profilePage && (
                <MenuItemLink
                    to="/profile"
                    leftIcon={<Person />}
                    primaryText="Profile"
                    placeholder={''}
                />
            )}

            {userMenuItems?.map((item, key) => (
                <li key={key}>{item}</li>
            ))}
            <Logout />
        </UserMenu>
    )
}
