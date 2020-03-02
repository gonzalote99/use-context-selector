# use-context-selector

[![Build Status](https://travis-ci.com/dai-shi/use-context-selector.svg?branch=master)](https://travis-ci.com/dai-shi/use-context-selector)
[![npm version](https://badge.fury.io/js/use-context-selector.svg)](https://badge.fury.io/js/use-context-selector)
[![bundle size](https://badgen.net/bundlephobia/minzip/use-context-selector)](https://bundlephobia.com/result?p=use-context-selector)

React useContext with selector support in userland

## Introduction

React Context and useContext is often used to avoid prop drilling,
however it's known that there's a performance issue.
When a context value is changed, all components that useContext
will re-render.

To solve this issue,
[useContextSelector](https://github.com/reactjs/rfcs/pull/119)
is proposed and later proposed
[Speculative Mode](https://github.com/reactjs/rfcs/pull/150)
with context selector support.
This library provides the API in userland.

v1 uses `calculateChangedBits=()=>0` technique to stop propagation,
while v2 uses `useMutableSource`.

## Install

```bash
npm install use-context-selector
```

## Usage

```javascript
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { createContext, useContextSelector } from 'use-context-selector';

const context = createContext(null);

const Counter1 = () => {
  const count1 = useContextSelector(context, v => v[0].count1);
  const setState = useContextSelector(context, v => v[1]);
  const increment = () => setState(s => ({
    ...s,
    count1: s.count1 + 1,
  }));
  return (
    <div>
      <span>Count1: {count1}</span>
      <button type="button" onClick={increment}>+1</button>
      {Math.random()}
    </div>
  );
};

const Counter2 = () => {
  const count2 = useContextSelector(context, v => v[0].count2);
  const setState = useContextSelector(context, v => v[1]);
  const increment = () => setState(s => ({
    ...s,
    count2: s.count2 + 1,
  }));
  return (
    <div>
      <span>Count2: {count2}</span>
      <button type="button" onClick={increment}>+1</button>
      {Math.random()}
    </div>
  );
};

const StateProvider = ({ children }) => {
  const [state, setState] = useState({ count1: 0, count2: 0 });
  return (
    <context.Provider value={[state, setState]}>
      {children}
    </context.Provider>
  );
};

const App = () => (
  <StateProvider>
    <Counter1 />
    <Counter2 />
  </StateProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### createContext

This creates a special context for selector-enabled `useContext`.

It doesn't pass its value but a ref of the value.
Unlike the original context provider, this context provider
expects the context value to be immutable and stable.

#### Parameters

-   `defaultValue` **Value** 

#### Examples

```javascript
import { createContext } from 'use-context-selector';

const PersonContext = createContext({ firstName: '', familyName: '' });
```

### useContext

This hook returns context value with optional selector.

It will only accept context created by `createContext`.
It will trigger re-render if only the selected value is referentially changed.
The selector must be stable.
Either define selector outside render or wrap with `useCallback`.

The selector should return referentially equal result for same input for better performance.

#### Parameters

-   `context` **Context&lt;Value>** 
-   `selector` **function (value: Value): Selected**  (optional, default `identity as(value:Value)=>Selected`)

#### Examples

```javascript
import { useContext } from 'use-context-selector';

const firstName = useContext(PersonContext, state => state.firstName);
```

## Limitations

-   In order to stop propagation, `children` of a context provider has to be either created outside of the provider or memoized with `React.memo`.
-   Provider trigger re-renders only if the context value is referentially changed.
-   Neither context consumers or class components are supported.
-   TODO check this later: The [stale props](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children) issue can't be solved in userland. (workaround with try-catch)
-   Tearing is only avoided within the Provider tree. A value outside the Provider will tear. (`02_tearing_spec` fails)

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:01_minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/use-context-selector/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/use-context-selector/tree/master/examples/02_typescript)

## Related projects

-   [react-tracked](https://github.com/dai-shi/react-tracked)
-   [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux)
