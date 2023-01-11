![host app screenshot](/host-app/public/host-app.png)

The main store app (host) dispatches DOM events. Cart is a separate application (remote) that has an event interface that can listen for events from host or other remotes.

> Goal: demonstrate an object-schema validation mechanism for remote module events. Remotes accept no props and instead rely entirely on DOM events to ensure decoupling.

- [x] Typescript support for remote modules
- [x] Simple zod parsing of remote module events
- [x] Basic events client with type safety from client -> host and host -> client
- [ ] Upgrade FederatedTypesPlugin with support for fetching types from remote cdn.
