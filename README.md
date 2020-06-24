# #️⃣ Skratch [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/websyncs/skratch/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/skratch.svg?style=flat)](https://www.npmjs.com/package/skratch) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://websyncs.com/docs/how-to-contribute.html#your-first-pull-request)

A very light weight reactive ui framework build from scratch. Inspired by [Sinuous](https://github.com/luwes/sinuous)

## Installation

```js
npm i skratch
```

## Examples

There is nothing needed to create an app with few lines of code. It feels more like native but work like react.

```js
import { o, html } from 'skratch';
const count = o(1);
const App = () => html`
  <div>
    <div class="myclass">The count is ${count}</div>
  </div>
`;
setInterval(() => {
  count(count() + 1);
}, 1000);
document.body.append(App());
```

### Custom Component

Create a custom component with a function like react functional component and define it with a name to use inside another as a custom html tag.

```js
import { html, define } from 'skratch';
export const Comp = (props, children) => {
  return html`<div style="background:#555">
    ${() =>
      props.count() % 2 == 0
        ? html`<h1>Even</h1>`
        : html`<h1>Odd</h1>`}
    ${children}
  </div>`;
};
define('Comp', Comp);
```
Then use it like if you are using in jsx 

```js
const count = o(1);

const App = () => html`
  <main>
    <h1>Hello from App Component</h1>
    <Test count="${count}">
      <div class="myclass">This is a child element</div>
    </Test>
  </main>
`;

setInterval(() => {
  count(count() + 1);
}, 1000);

document.body.appendChild(App());
```

It can also be called as function.

```js
const App = () => html`
  <main>
    <h1>Hello from App Component</h1>
    <${Comp} count="${count}" />
  </main>
`;
```

### License

React is [MIT licensed](./LICENSE).