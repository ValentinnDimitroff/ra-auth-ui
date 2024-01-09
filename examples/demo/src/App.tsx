import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  defaultTheme,
  CustomRoutes,
  AdminProps,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { AuthAdmin } from "ra-auth-ui";
import { FC, PropsWithChildren } from "react";
import { Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       structuralSharing: false,
//     },
//     mutations: {
//       retryDelay: 10000,
//     },
//   },
// });

const InnerApp: FC<AdminProps> = ({ children, ...rest }) => {
  return (
    <Admin loginPage={false} {...rest}>
      {children}
    </Admin>
  );
};

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
