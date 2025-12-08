---
description: Commit message guidelines, use it when doing a git commit
applyTo: **
---

# Conventional Commits

## Structure

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Scope (Optional)

The scope provides additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

## Description

The description contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes".
- Don't capitalize the first letter.
- No dot (.) at the end.

## Body (Optional)

The body should include the motivation for the change and contrast this with previous behavior. Use the imperative, present tense.

## Footer (Optional)

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to.

**Breaking Change**: A BREAKING CHANGE footer must begin with `BREAKING CHANGE:` followed by a space or two newlines. The rest of the commit message is then the description of the change, the justification, and any migration notes.
