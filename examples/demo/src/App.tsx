import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  defaultTheme,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { AuthAdmin } from "ra-auth-ui";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      structuralSharing: false,
    },
    mutations: {
      retryDelay: 10000,
    },
  },
});

export const App = () => {
  console.log("App");
  const Wrapper = AuthAdmin;
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper
        dataProvider={dataProvider}
        authProvider={authProvider}
        theme={defaultTheme}
        queryClient={undefined}
        // queryClient={queryClient}
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
      </Wrapper>
    </QueryClientProvider>
  );
};
