run prettier and eslint command

Now you can run:

npm run lint: To check for linting errors.
npm run lint:fix: To automatically fix lint errors.
npm run format: To format your code with Prettier.

// new
for link the project : npx eslint . --ext .js,.jsx --fix
Format the project with Prettier: npx prettier --write .

# Project Name

## Code Quality and Formatting

This project uses ESLint for linting and Prettier for code formatting.

## Available Commands

### 1. Check for Linting Errors

To check for linting errors, run:

```bash
npm run lint
```

### 2. Automatically Fix Linting Errors

To automatically fix linting errors, run:

```bash
npm run lint:fix
```

### 3. Format Code with Prettier

To format your code with Prettier, run:

```bash
npm run format
```

## Manual Commands

### Lint the project manually

To lint the project manually, use the following command:

```bash
npx eslint . --ext .js,.jsx --fix
```

### Format the project with Prettier

To format the project manually with Prettier, use the following command:

```bash
npx prettier --write .
```
