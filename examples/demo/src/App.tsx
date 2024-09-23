import { ImportContactsTwoTone } from '@mui/icons-material'
import { AuthAdmin } from 'ra-auth-ui'
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
