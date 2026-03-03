# Back-Office Dashboard Assessment

Single-page React.js application with crypto prices, portfolio and transaction history. Just as requested.

## How to Run

```bash
# Install dependencies
npm install
yarn install

# Run the app
npm run dev
yarn dev

# Run the json-server (optional)
npm run server
yarn server
```

## Tech Stack

- React.js
- TypeScript
- Vite
- Material UI
  - X Charts
  - DataGrid Table
  - Material Icons
- TanStack Query
- Axios
- Prettier and Eslint
- Json Server

## Why I Used What I Used

- **TanStack Query:** I used TanStack Query for data fetching and state management. It provides caching, background updates, and other features that make it a great choice for data fetching. I used `invalidateQueries` method for **reload button** which is more readable and easier way to refetch all data. Also I find **error handling and loading states** more manageable with TanStack Query.

- **Axios:** This kind of app usually doesn't need Axios. You can use the native Fetch API. But I used Axios because I wanted to **future-proof the app**. The same goes for TanStack Query. In a large scale app, Axios provides more features like request/response interceptors and request cancellation. You should need interceptors if you have to add auth to the app.

- **Json Server:** I used Json Server for **mock data**. It provides a simple way to create a REST API for your application. You can use it for development and testing purposes. In a production environment, you would use a real backend server. I also added a fallback json to Json Server for the production. On [Netlify deploy](https://crypto-admin-task.netlify.app/), **it is going to use the fallback json.**

- **Prettier and Eslint:** I used Prettier and Eslint for **code formatting and linting**. They also help future-proofing the app by maintaining code quality and consistency. In a real life large projects, it will be harder to maintain code quality with bigger teams. If you want to go further you can add [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) to your project.

## Estimated Time

I estimate that this project took me **~8 hours** to complete. Here is the breakdown:

- **Project Setup & Choosing Tech Stack:** 1 hour
- **UI Design & Responsiveness:** 3 hours
- **Data Fetching:** 2 hours
- **Finding Bugs & Fixing Them:** 1 hour
- **Polishing:** 1 hour
