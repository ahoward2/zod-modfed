![featured image](/images/feature-image.png)

The main store app (host) dispatches DOM events. Cart is a separate application (remote) that has an event interface that can listen for events from host or other remotes.

> Goal: demonstrate a schema validation mechanism for remote module events. Remotes accept no props and instead rely entirely on window DOM events to ensure decoupling.

- [x] Typescript support for remote modules
- [x] Simple zod parsing of remote module events
- [x] Lightweight events client with type safety from client -> host & host -> client with the [EventClient](https://github.com/rocket-science-core/core/blob/main/docs/event-client/overview.md).
- [x] [FederatedTypesPlugin](https://github.com/module-federation/universe/tree/main/packages/typescript) with support for fetching types from remote cdn.
- [x] Remote checkout `@ahowardtech/checkout` app published to npm and available on unpkg cdn.

## Run the app

This works best when using two terminal windows.

```bash
# REMOTE
cd checkout
# install dependencies
yarn install
# run storybook
yarn storybook
# build and run local server hosting federated modules
yarn build && yarn federate

# HOST
cd host-app
# install dependencies
yarn install
# run app pointing to local server hosting remote federated modules
yarn dev:local
## run app pointing to unpkg cdn hosting remote federation modules
yarn dev
```

![host app screenshot](/images/host-app.png)
