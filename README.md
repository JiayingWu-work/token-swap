# Token Swap App

A simplified Token Swap Explorer built with **React + TypeScript + Vite**, allowing users to:

- Select source and target tokens from a predefined popular list
- Input a USD amount and get live conversion
- View the equivalent token amounts based on live API prices

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/JiayingWu-work/token-swap.git
cd token-swap
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add API Key

Create a .env file in the project root:

```js
VITE_FUNKIT_API_KEY = Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk
```

### 4. Run the app

```bash
npm run dev
```

Open http://localhost:5173 to view it in the browser.

### 5. Run tests

```bash
npm run test
```

## Tech Stack

- **Framework: React + TypeScript:** provides a modern, type-safe approach, catches errors early and improves maintainability.
- **Build Tool: Vite:** fast development server and optimized builds for production
- **API:**
  - [@funkit/api-base](https://www.npmjs.com/package/@funkit/api-base): fetch token info and price
  - [Coingecko Uniswap tokens list](https://tokens.coingecko.com/uniswap/all.json): a comprehensive list of tokens
- **State & Data Fetching: @tanstack/react-query:** handles asynchronous API requests, caching, and state updates seamlessly
- **Styling: styled-components:** clean, maintainable syntax in codebase
- **Testing: Vitest + React Testing Library:** lightweight and fast testing setup for TypeScript + React
- **Linting: ESLint with type-aware rules:** ensures code quality and consistency, catching potential bugs early with type-checked linting rules

## Assumptions & Design Choices

- Tokens are pre-filtered using a popular token list to
  - Improve app performance by reducing the number of tokens rendered
  - Simplify the user interface and avoid a overwhelming list of tokens
- Default selection is the first two tokens in the list
- USD amount input needs to be numeric and positive
- Errors in fetching token data are displayed to the user
- Minimalistic design to focus on functionality and usability

## Deployment

The app is deployed on Vercel: https://token-swap-one-sable.vercel.app/
