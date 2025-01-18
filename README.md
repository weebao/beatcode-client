# BeatCode Client

Live LeetCode battle where users can also use abilities to sabotage their opponents like forcing them to code in light mode :>

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Contribution guidelines](#contribution-guidelines)
    - [Git](#git)
        - [Creating branches](#creating-branches)
        - [Pre-push](#pre-push)
        - [Opening PRs](#opening-prs)
        - [Closing PRs](#closing-prs)
    - [Updating the frontend](#updating-the-frontend)
- [Testing](#testing)
    - [Unit Tests](#unit-tests)
    - [End-to-end (E2E) Tests](#end-to-end-e2e-tests)
        - [Writing E2E tests](#writing-e2e-tests)

## Installation

Clone this repo

```bash
git clone https://github.com/beatcode-official/beatcode-client.git
```

Install dependencies (Make sure you had node.js installed)

```bash
npm install
```

## Configuration

For running the backend, you should find an `.env.example` file that looks something like below:

```
API_URL = backend-api-url
WEBSOCKET_URL = websocket-api-url
FRONTEND_URL = client-localhost-url
```

Copying straight from the file should work out of the box, but if not, please check the hostname of your backend local server.

## Contribution guidelines

### Git

#### Creating branches

For non-members, make sure you fork the repo first before working on the code.

Please create a new branch following the below format every time you upload your code

```bash
git checkout -b "<your-name>-<feature>"
```

Make sure you request review from at least one other person and have it approved before you merge your branch to main. You can always request me [@weebao](https://github.com/weebao) and I will make sure to review it by the end of the day.

Also, please delete the branch after having it merged to keep things clean.

#### Pre-push

Just so you won't be confused, I set up a pre-push script that will run every time you run `git push`. It will be quite annoying so please bare with it :>

#### Opening PRs

It's ideal to link your PRs with an existing issues by writing "Closes #1" or "Fixes #1". Also, make sure you start your PRs' names with "feat", "fix", or "docs".

### Closing PRs

Please delete your branch once your PRs is merged to keep things clean.

### Updating the frontend

This is a kind of weird request but please use `kebab-case` instead of `camelCase` or `PascalCase` for components and utilities files' names. Why? That's because git cannot differentiate between two files with the same name but different capitalization so it's generally recommended to name them this way.

## Testing

### Unit Tests

This will test the custom components except those in `src/lib/components/ui` which are mostly components installed from [@huntabyte/shadcn-svelte](https://github.com/huntabyte/shadcn-svelte)

```bash
npm test
```

### End-to-end (E2E) Tests

Have the backend running before testing, the instructions for setting up can be found in [beatcode-server](https://github.com/beatcode-official/beatcode-server)

Also, make sure you run the commands below in a different terminal

```
npm build
npm run preview
```

Running E2E tests with Playwright

```bash
npm run test:e2e
```

For better feedbacks, I recommend installing the VSCode extension for Playwright since you can have live browser view and traces which are pretty neat. You can also get that browser view with the normal command:

```bash
npx playwright test
```

#### Writing E2E tests

I recommend using the command below for tracing the user flow

```bash
npx playwright codegen
```

There will be an inspector on the side for you to copy the code and put it in your `*.spec.ts` file for writing your Playwright code.
