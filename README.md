# ra-auth-ui

Authentication layouts, hooks and pipelines to integrate into react-admin out of the box

No extra dependencies are required except the ones `react-admin` is already using.

What's included?

-   Login and Sign Up
-   Forgot Password and Reset Password
-   Easy to use wrappers

[![npm version](https://img.shields.io/npm/v/ra-auth-ui.svg)](https://www.npmjs.com/package/ra-auth-ui)
[![npm downloads](https://img.shields.io/npm/dm/ra-auth-ui.svg)](https://www.npmjs.com/package/ra-auth-ui)
[![GitHub license](https://img.shields.io/github/license/ValentinnDimitroff/ra-auth-ui.svg)](https://github.com/ValentinnDimitroff/ra-auth-ui/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/ValentinnDimitroff/ra-auth-ui/)
[![minzipped size](https://badgen.net/bundlephobia/minzip/ra-auth-ui)](https://bundlephobia.com/result?p=ra-auth-ui)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[](https://status.david-dm.org/gh/ValentinnDimitroff/ra-auth-ui.svg)

# Installation

Available as a npm package. You can install it using:

```sh
npm install ra-auth-ui
#or
yarn add ra-auth-ui
```

Run the Demo

Install `nodemodules` in `examples/demo`

```sh 
cd ./examples/demo
yarn install
```
Install `nodemodules` in `ra-auth-ui` and execute start

```sh
yarn install 
yarn run start-demo
```

# Available Props

| Name        | Type            | Default   | Description                                                                                           |
| ----------- | --------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| authRoutes  | array           | array     | If unset provides default authentication routes and screens.                                         |
| authLayout  | object          | undefined | If set to '{userMenu: true}' provides default UserMenu. If set to object pass on the props to Layout. |
| profilePage | bool \| element | undefined | If set to 'true' provides default Profile Page layout. You can pass your own component.           |

<br/>

# How to use

## Prepare the authProvider

First you should build your `authProvider` as explained in the react-admin doc's [here](https://marmelab.com/react-admin/Authentication.html). \
Then extend it with the following verbs:

```jsx
const authProvider = {
    // ... default authProvider verbs
    signUp: (params) => Promise.resolve(),
    forgotPassword: (params) => Promise.resolve(),
    resetPassword: (params) => Promise.resolve(),
}
```

## Use AuthAdmin wrapper

The most basic way to add the complete set of authentication screens to your app is to subtitute the `<Admin/>` component with `<AuthAdmin/>`. Built-in routing and custom pages will be added for you.

```jsx
import { AuthAdmin } from 'ra-auth-ui'

const App = () => <AuthAdmin authProvider={authProvider}>// your Routes here</AuthAdmin>
```

`<AuthAdmin>` will pass forward all the props to the `<Admin>` component.

<!-- ## Change route urls

- All you have to do is subtitute the `<Admin/>` component with `<AuthAdmin/>`
- provide `authRoutes` prop

```
Example
```

## Edit auth pages style

- All you have to do is subtitute the `<Admin/>` component with `<AuthAdmin/>`
- provide `authRoutes` prop
- wrap default pages into own components

```
Example
``` -->

Docs Sketches ->

# authLayout

Provides authenticated layout with smart defaults.

### Default

-   if pass profilePage = true, out of the box profile page is loaded

### Supports object

-   userMenu - if no appBar is passed
    -   true - default menu with profile link and logout button
    -   array of object - {to, ...}
    -   array of elements - TODO fnc receiving permissions and return element

Other supported keys

-   menu
-   appBar
-   sideBar

# profilePage

-   if set to true - default page
-   supports passing own component

# Troubleshooting

-   `useRoutes() may be used only in the context of a <Router> component. react-admin`
    This error relates to a missing or misplaced `<BrowserRouter>` wrapper. It should be wrapping the whole `<App/>` e.g.
-   `No QueryClient set, use QueryClientProvider to set one`
