# Federated Design System Example

Example demonstrating a remote design system app consumed by a host app via
Webpack 5's Module Federation.

## Local Usage

1. Start the remote design system

```bash
# federated-design-system PORT 3001
yarn install
yarn dev
```

2. Start the host app in another terminal

```bash
# host-app PORT 3000
yarn install
yarn dev
```

## How It Works

The `design-system` project is serving as a design system library and `host-app`
is a host application that consumes modules from the design system.

### Design System Library

The DSL contains a React [Context](https://reactjs.org/docs/context.html) hook,
CSS styles, and low-level atomic components (ThemeToggler button) which the host
application consumes.

The webpack configuration for the DSL is set up to publish it's static files to
the [unpkg](https://unpkg.com/) content delivery network with semantic
versioning so that it can be developed and published independently from any apps
consuming it.

### Host Application

The host application in this case doesn't need to contain any design system
related code (except for optional fallbacks) and could rather just handle the
management of remote apps.

As long as we have `React` and `styled-components` as a dependency in the host
app, we can import the rest of the modules that we need from our DSL library.

```js
// App.js imports

import React from "react";

import { ThemeProvider } from "styled-components";

const RemoteThemeToggle = React.lazy(() => import("design-system/ThemeToggle"));
const RemoteGlobalStyle = React.lazy(() => import("design-system/GlobalStyle"));
const RemoteButton = React.lazy(() => import("design-system/Button"));
const RemoteMessageBox = React.lazy(() => import("design-system/MessageBox"));

import GlobalStyle from "./styles/global";

import { lightTheme as RemoteLightTheme } from "design-system/lightTheme";
import { darkTheme as RemoteDarkTheme } from "design-system/darkTheme";

import useThemeMode from "design-system/useThemeMode";
```

Now we can use our remote modules as we need them, utilizing `React.Suspense` to
lazily load in React components and static imports for our `lightTheme`,
`darkTheme`, and our `useThemeMode` hook to handle switching between the two.

```js
// App.js

const App = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? RemoteLightTheme : RemoteDarkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <React.Suspense fallback={<GlobalStyle />}>
        <RemoteGlobalStyle />
      </React.Suspense>
      <React.Suspense fallback="Loading Theme Toggler">
        <RemoteThemeToggle themeToggler={themeToggler} />
      </React.Suspense>
      <br></br>
      <h1>Design system</h1>
      <h2>Consumed via Module Federation</h2>
      <br></br>
      <React.Suspense fallback="Loading Button">
        <RemoteButton text={"Button with primary color"}></RemoteButton>
      </React.Suspense>
      <br></br>
      <React.Suspense fallback="Loading MessageBox">
        <RemoteMessageBox
          text={"Message box with secondary color"}
          messageType={"info"}
        ></RemoteMessageBox>
      </React.Suspense>
    </ThemeProvider>
  );
};
```
