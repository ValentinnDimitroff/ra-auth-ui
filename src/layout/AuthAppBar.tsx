import { FC } from 'react'
import { AppBar, AppBarProps } from 'react-admin'
import { AuthUserMenu } from './AuthUserMenu'

/**
 * AppBar with built in auth connected userMenu
 * @param props - AppBarProps
 */
export const AuthAppBar: FC<Omit<AppBarProps, "userMenu">> = (props) => <AppBar {...props} userMenu={<AuthUserMenu />} />
