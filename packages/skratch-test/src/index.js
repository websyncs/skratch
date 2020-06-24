import { o, html } from 'skratch';
import './component';

const count = o(1);
const App = () => html`
  <main>
    <h1 id="hello">Hello</h1>
    <Test name="${count}">
      <div class="myclass">this is a child ${count}</div>
    </Test>
  </main>
`;

setInterval(() => {
  count(count() + 1);
}, 1000);

document.body.appendChild(App());
