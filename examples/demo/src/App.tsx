import {
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  defaultTheme,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { AuthAdmin } from "ra-auth-ui";

export const App = () => {
  return (
    <AuthAdmin
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={defaultTheme}
    >
      <Resource
        name="posts"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="comments"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </AuthAdmin>
  );
};
