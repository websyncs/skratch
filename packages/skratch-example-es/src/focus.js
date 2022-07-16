import { html, o } from 'skratch';

export const Reference = () => {
  let inputRef;
  function handleSubmit(e) {
    // e.preventDefault();
    inputRef.focus();
    inputRef.setAttribute('id', 'changedid');
    console.log('ref', inputRef.id);
  }

  return html`
    <div>
      <h3>Reference Test</h3>
      <input ref=${(el) => inputRef = el} id="new-todo"/>
      <button onclick=${handleSubmit}>Focus</button>
    </div>
  `;
};