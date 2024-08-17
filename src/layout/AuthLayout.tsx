import { FC } from 'react'
import { Layout, LayoutProps } from 'react-admin'
import { AuthAppBar } from './AuthAppBar'

/**
 * Layout with built in auth connected appBar
 * @param props - LayoutProps
 */
export const AuthLayout: FC<Omit<LayoutProps, "appBar">> = (props) => (
    <Layout {...props} appBar={AuthAppBar} />
)

