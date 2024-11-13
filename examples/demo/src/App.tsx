import { ImportContactsTwoTone } from '@mui/icons-material'
import { AuthAdmin } from '../../../src/AuthAdmin' // NOTE import is intentional to test current changes. Update for production
import {
    EditGuesser,
    ListGuesser,
    MenuItemLink,
    Resource,
    ShowGuesser,
    defaultTheme,
} from 'react-admin'
import { authProvider } from './authProvider'
import { dataProvider } from './dataProvider'
import { TestProfile } from './TestProfile' // import for test profile component if loading or not

export const App = () => {
    return (
        <AuthAdmin
            authOptions={{
                userMenuItems: [
                    <MenuItemLink
                        to="/posts"
                        leftIcon={<ImportContactsTwoTone />}
                        primaryText="Posts"
                        placeholder={''}
                    />,
                ],
                loginRedirectPath: '/comments',
                profilePage: true, // test with true or <TestProfile /> component
            }}
            dataProvider={dataProvider}
            authProvider={authProvider}
            theme={defaultTheme}
        >
            <Resource name="posts" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
            <Resource name="comments" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        </AuthAdmin>
    )
}
