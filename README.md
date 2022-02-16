# doge (alpha)

## [Example](https://github.com/bigs-3/doge/tree/main/example)

This is a hosted version of [example](./example).

## Packages

| Package                                             | Version                                                                                                                   | Size                                                                                                                                         | Link |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| [`@doge/web3-connector`](packages/web3-connector) | [![npm](https://img.shields.io/npm/v/@web3-react/types/beta.svg)](https://www.npmjs.com/package/@web3-react/types/v/beta) | [![minzip](https://img.shields.io/bundlephobia/minzip/@web3-react/types/beta.svg)](https://bundlephobia.com/result?p=@web3-react/types@beta) |      |

## Getting Started

- `yarn`
- `yarn bootstrap`
- `yarn start`

In addition to compiling each package in watch mode, this will also spin up [example](./example) on [localhost:8000](http://localhost:8000/).

## Running Tests

- `yarn test --watch`

## Documentation

This version of doge is still in alpha, so unfortunately documentation is pretty sparse at the moment. The [example](./example), TSDoc comments, and the source itself are the best ways to get an idea of what's going on. More thorough documentation is a priority as development continues!

## Useful Commands

### Add a dependency

- `yarn lerna add <DEPENDENCY> --scope <PACKAGE>`

### Remove a dependency

- Delete the relevant `package.json` entry

Because of a [lerna bug](https://github.com/lerna/lerna/issues/1883), it's not possible to prune `yarn.lock` programmatically, so regenerate it manually:

- `yarn lerna exec "rm -f yarn.lock" --scope <SUBPACKAGE>`
- `yarn clean --scope <SUBPACKAGE>`
- `yarn bootstrap`
