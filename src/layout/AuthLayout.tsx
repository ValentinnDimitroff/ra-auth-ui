import { FC, PropsWithChildren } from 'react'
import { Layout } from 'react-admin'
import { AuthAppBar } from './AuthAppBar'

const AuthLayout: FC<PropsWithChildren> = ({ children, ...props }) => (
    <Layout {...props} appBar={AuthAppBar}>
        {children}
    </Layout>
)

export default AuthLayout
