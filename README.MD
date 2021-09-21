# D&D
## Prerequisites
- Yarn (tested with 1.22.10)
- Node 16
- Docker (tested with 3.6.0)

## Setting up for development

1. Clone the repo.
2. Run `yarn install`. 
3. Run `yarn --cwd=client install`. 
4. Run `yarn --cwd=manage install`.
5. Run `docker compose up`.

Alternatively, you could run the app without docker composer. To do so, you can use `yarn start` from within the client and server directory. 

## Quality control
Before committing, all required quality control checks are executed by [Husky](https://github.com/typicode/husky).

The required checks that are executed are:
```shell
yarn --cwd=client lint
yarn --cwd=client test
yarn --cwd=server lint
yarn --cwd=server test
yarn --cwd=server test:e2e
```

To skip the checks, append the `--no-verify` to the `git commit` command.
