import { AppBar } from 'react-admin'
import { AuthUserMenu } from './user-menu/AuthUserMenu'

export const AuthAppBar = ({ ...props }) => <AppBar userMenu={<AuthUserMenu />} {...props} />
