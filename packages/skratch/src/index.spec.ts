import { html } from './index'

describe('html', () => {
  it('template liternal function should return a Node', () => {
    const value = 20;
    const node = <Node>html`<div id="test-html" >The value is ${value}</div>`;
    // document.body.appendChild(node);
    expect(
      node
    ).toBeInstanceOf(Node)
    expect(
      node.textContent
    ).toEqual("The value is 20")
    expect(
      node['id']
    ).toEqual("test-html")
  })

  it('the node should also genarate child nodes', () => {
    const value = 33;
    const node = <Node>html`<main>
      <div>Its child one</div>
      <div>
        <h1>header tag with value ${value}</div>
        <div>Sub child</div>
        <div>Sub child 2</div>
      </div>
    </main>`;
    expect(
      node.childNodes
    ).toHaveLength(2)
    expect(
      node.childNodes[1].childNodes
    ).toHaveLength(3)
    expect(
      node.childNodes[1].childNodes[0].textContent
    ).toEqual('header tag with value 33')
  })
})