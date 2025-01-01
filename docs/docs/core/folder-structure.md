---
sidebar_position: 0
---

# Folder Structure

In this project we have the following folder structure and it's name is **modular directory structure** or a **feature-based** structure.

## Key Characteristics of This Structure

1. **Components Directory**:  
   Contains reusable components used across multiple modules/pages.

2. **Pages Directory**:  
   Follows the Next.js convention, defining application routes and serving as entry points for each page.

3. **Modules Directory**:  
   Groups related functionality and files for specific features or pages into isolated modules. Each module typically includes:
   - `components/`: Components specific to the feature or page.
   - `hooks/`: Custom hooks related to the feature or page.
   - `contexts/`: Context providers and related files.
   - Other related assets (e.g., `services/`, `utils/`).

![Docusaurus Logo](/img/structure.png)

## About directories

1. **public**:
   Contains static files that are served as-is. Each file inside this directory is mapped to `/`.
2. **assets**:
   Contains images, fonts, and other assets used in the application.
3. **components**: all the common components that are used in the application.
4. **configs**: contains all the configuration files.
   - 4.1 **axios**:configuration of the axios instance.
   - 4.2 **wagmi**: configuration of the wagmi instance. wagmi is used for integrating the ethereum blockchain.
5. **context**: in the root context directory, we have the global context provider. In the modules directory, we have the context provider for each module.
   - 5.1 **auth**: there is a global context provider for the authentication.
   - 5.2 **TelegramAuthProvider**: there is a global context provider for the telegram authentication and telegram mini app configuration.
   - 5.3 **WebSocket**: Websocket context provider that is handling the websocket connection.
6. **hooks**: contains all the global custom hooks.
   - 6.1 **useAuthorization**: there is hook that returns the authorization token, user details and a hook to dispatch the user details.
   - 6.2 **useIntersectionObserver**: The `useIntersectionObserver` hook is used to observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
   - 6.3 **useNavigateToLobby**: The `useNavigateToLobby` hook is used to navigate to the lobby page when the quiz will start after the 60 seconds.
   - 6.4 **useWalletConnection**: The `useWalletConnection` hook is used to connect the wallet with the application. in this version we don't have the wallet connection.
   - 6.5 **useWebSocket**: The `useWebSocket` hook is used to connect the websocket with the application.
7. **modules**: contains all the modules of the application. in the prev section we described the structure of the app. for every pages we create a directory in modules directory and every modules have the self contained components, hooks, context, pages an etc.
8. pages: contains all the pages of the application. in the pages directory we have the index.js file that is the home page of the application.
9. theme: contains the theme of the application. in the theme directory we have the global styles, colors, and the theme provider.
