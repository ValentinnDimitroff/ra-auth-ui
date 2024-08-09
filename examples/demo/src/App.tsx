import {
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  defaultTheme,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { AuthAdmin } from "../../../src/AuthAdmin";

//added test menu item
const Menuitem = ({ name }: String) => {
  return (
    <div>
      <h5>{name}</h5>
    </div>
  );
};

export const App = () => {
  return (
    <AuthAdmin
      authOptions={{ userMenuItems: [<Menuitem name="test" />] }}
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
