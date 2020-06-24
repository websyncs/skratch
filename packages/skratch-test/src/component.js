import { html, define } from 'skratch';

export const Comp = (props, children) => {
  return html`<div style="background:#555">
    ${() =>
      props.name() % 2 == 0
        ? html`<h1 id="hello">Even</h1>`
        : html`<h1 id="hello">Odd</h1>`}
    ${children}
  </div>`;
};
define('Test', Comp);