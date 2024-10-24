# BeatCode Client

Ship fast

## Installation

Clone this repo

```bash
git clone https://github.com/beatcode-official/beatcode-client.git
```

Install dependencies (Make sure you had node.js installed)

```bash
npm install
```

## Contribution guidelines

### Git

Make sure you create a new branch following the below format every time you upload your code

```bash
git checkout -b "your name-feature"
```

When creating a PR, make sure to add [NO-??] to link a task from Notion with your PR. Example:

```
[NO-69] Centered a div after 5 days
```

Make sure you request review from at least one other person and have it approved before you merge your branch to main. You can always request me @weebao and I will make sure to review it by the end of the day.

Also, please delete the branch after having it merged to keep things clean :D

### Updating the frontend

This is a kind of weird request but please use kebab-case instead of camelCase or PascalCase for components and utilities files' names. Why? That's because git cannot differentiate between two files with the same name but different capitalization so it's generally recommended to name them this way :D