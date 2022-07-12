import { html, o } from 'skratch';

const TodoList = ({ items }) => {
  function handleClick(i) {
    var spliced = items();
    spliced.splice(i, 1);
    items(spliced);
  }
  return html`
    <ul>
      ${() => items().map((item, i) =>
          html`
            <li id=${item.id}>
              ${item.text} 
              <button onclick=${() => handleClick(i)}>remove</button>
            </li>
          `)}
    </ul>
  `;
};

export const TodoApp = () => {
  let items = o([{
    text: 'initial text',
    id: Date.now()
  }]);

  let text = o('');

  const view = html`
    <div>
      <h3>TODO</h3>
      <${TodoList} items=${items} />
      <form onsubmit=${handleSubmit}>
        <label htmlFor="new-todo">
          What needs to be done?
        </label>
        <input id="new-todo" onchange=${handleChange} value=${text} />
        <button>
          Add #${() => items().length + 1}
        </button>
      </form>
    </div>
  `;

  function handleSubmit(e) {
    e.preventDefault();
    if (!text().length) {
      return;
    }
    const newItem = {
      text: text(),
      id: Date.now()
    };
    items(items().concat(newItem));
    text("");
  }

  function handleChange(e) {
    text(e.target.value);
  }

  return view;
};