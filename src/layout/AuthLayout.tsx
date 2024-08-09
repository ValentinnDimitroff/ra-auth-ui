import { Layout } from 'react-admin'
import { AuthAppBar } from './AuthAppBar'


// Added children to display the body
const AuthLayout = ({ props, children }) => (
    <Layout
        {...props}
        appBar={AuthAppBar}
        // menu={menu}
        // sidebar={sidebar}
    >
        {children}
    </Layout>
)

export default AuthLayout
