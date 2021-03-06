# useResource

[![Release](https://github.com/justinekizhak/use-resource-hook/actions/workflows/publish.yml/badge.svg)](https://github.com/justinekizhak/use-resource-hook/actions/workflows/publish.yml)

The easiest way to do API calls.

## Getting started

### Installation

```bash
npm i @justinekizhak/use-resource-hook
```

Refer some of the examples below on how to use it.

# Examples

## Basic example using Container component

Here we are using just the `data` state and the `Container` component.
The container component will handle the loading and the error state for us.

```jsx live
import { useResource } from "@justinekizhak/use-resource-hook";

function App() {
  const { data, Container } = useResource(
    {
      url: "https://jsonplaceholder.typicode.com/posts/1"
    },
    "fetchPost"
  );

  return (
    <div>
      <Container>{JSON.stringify(data)}</Container>
    </div>
  );
}
```

## Basic example using explicit loading and error states

Here we are using the `isLoading` and `errorData` state and handling them explicitly in our component.

```jsx live
import { useResource } from "@justinekizhak/use-resource-hook";

function App() {
  const { data, isLoading, errorData } = useResource(
    {
      url: "https://jsonplaceholder.typicode.com/posts/1"
    },
    "fetchPost"
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorData) {
    return <div>Error: {error && error.message}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
```

## Basic example using Container component along with custom loading and error component

This time we will use the Container and style the loading and the error state by ourselves.

```jsx live
import { useResource } from "@justinekizhak/use-resource-hook";

function App() {
  const { data, Container, refetch } = useResource(
    {
      url: "https://jsonplaceholder.typicode.com/posts/1"
    },
    "fetchPost"
  );

  const loadingComponent = () => <div>Our custom loader. Loading...</div>;

  const errorComponent = (errorMessage, errorData) => (
    <div>Our custom error component. Error: {errorMessage}</div>
  );

  const handleClick = () => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleClick}>Refetch</button>
      <Container
        loadingComponent={loadingComponent}
        errorComponent={errorComponent}
      >
        {JSON.stringify(data)}
      </Container>
    </div>
  );
}
```

## Development

### Docs

Tutorial docs are generated using Docusaurus and the API docs are generated using typedoc.

To write API docs, refer: https://typedoc.org/guides/doccomments/

To develop docs run:

This will run both the typedoc and docusaurus at the same time

```bash
npm run docs:dev # yarn docs:dev
```

To build docs run:

```bash
npm run docs:build # yarn docs:build
```

| Scripts                       | Description                                                      |
| ----------------------------- | ---------------------------------------------------------------- |
| start                         | Start the development server.                                    |
| build                         | Build the library for deploying to NPM registry.                 |
| test                          | Run all test cases.                                              |
| eject                         | Eject the CRA.                                                   |
| release                       | Create a release and auto publish to NPM.                        |
| pretest                       | Run before the tests.                                            |
| posttest                      | Run after the test.                                              |
| docusaurus:docusaurus         |                                                                  |
| docusaurus:start              | Start the docusaurus docs server.                                |
| docusaurus:build              | Build the docusaurus docs.                                       |
| docusaurus:swizzle            |                                                                  |
| docusaurus:deploy             |                                                                  |
| docusaurus:clear              |                                                                  |
| docusaurus:serve              |                                                                  |
| docusaurus:write-translations |                                                                  |
| docusaurus:write-heading-ids  |                                                                  |
| typedoc:start                 | Start the typedoc dev server.                                    |
| typedoc:build                 | Build the typedoc docs for production.                           |
| docs:tailwind                 | Base script for CSS for the documentation site.                  |
| docs:watch-css                | Run the tailwind server in dev mode.                             |
| docs:build-css                | Build the tailwind css.                                          |
| docs:dev                      | Main entry script to start the documentation server in dev mode. |
| docs:build                    | Main entry script to build the full documentation site.          |

# Links

[NPM Package](https://www.npmjs.com/package/@justinekizhak/use-resource-hook)

[Doc site](https://use-resource-hook.vercel.app/)
