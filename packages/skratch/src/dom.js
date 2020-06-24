import { api } from './api';

export function create(arg, isSvg) {
  return arg
    ? isSvg
      ? document.createElementNS('http://www.w3.org/2000/svg', arg)
      : document.createElement(arg)
    : document.createDocumentFragment();
}
export function add(parent, child, ref) {
  child = castNode(child);
  const fragOrNode = frag(child) || child;
  parent.insertBefore(child, ref && ref.parentNode && ref);
  return fragOrNode;
}
export function insert(el, value, endMark, current, startNode) {
  // This is needed if the el is a DocumentFragment initially.
  el = (endMark && endMark.parentNode) || el;

  // Save startNode of current. In clear() endMark.previousSibling
  // is not always accurate if content gets pulled before clearing.
  startNode = startNode || (current instanceof Node && current);

  if (value === current);
  else if (
    (!current || typeof current === 'string') &&
    (typeof value === 'string' || (typeof value === 'number' && (value += '')))
  ) {
    // Block optimized for string insertion.
    if (current == null || !el.firstChild) {
      if (endMark) {
        add(el, value, endMark);
      } else {
        // textContent is a lot faster than append -> createTextNode.
        el.textContent = value;
      }
    } else {
      if (endMark) {
        (endMark.previousSibling || el.lastChild).data = value;
      } else {
        el.firstChild.data = value;
      }
    }
    current = value;
  } else if (typeof value === 'function') {
    api.subscribe(function insertContent() {
      current = api.insert(
        el,
        value.call({ el, endMark }),
        endMark,
        current,
        startNode
      );
    });
  } else {
    // Block for nodes, fragments, Arrays, non-stringables and node -> stringable.
    if (endMark) {
      // `current` can't be `0`, it's coerced to a string in insert.
      if (current) {
        if (!startNode) {
          // Support fragments
          startNode =
            (current._startMark && current._startMark.nextSibling) ||
            endMark.previousSibling;
        }
        remove(el, startNode, endMark);
      }
    } else {
      el.textContent = '';
    }
    current = null;

    if (value && value !== true) {
      current = add(el, value, endMark);
    }
  }

  return current;
}
export function property(el, value, name, isAttr, isCss) {
  if (value == null) return;
  if (!name || (name === 'attrs' && (isAttr = true))) {
    for (name in value) {
      api.property(el, value[name], name, isAttr, isCss);
    }
  } else if (name[0] === 'o' && name[1] === 'n' && !value.$o) {
    // Functions added as event handlers are not executed
    // on render unless they have an observable indicator.
    handleEvent(el, name, value);
  } else if (typeof value === 'function') {
    api.subscribe(function setProperty() {
      api.property(el, value.call({ el, name }), name, isAttr, isCss);
    });
  } else if (isCss) {
    el.style.setProperty(name, value);
  } else if (
    isAttr ||
    name.slice(0, 5) === 'data-' ||
    name.slice(0, 5) === 'aria-'
  ) {
    el.setAttribute(name, value);
  } else if (name === 'style') {
    if (typeof value === 'string') {
      el.style.cssText = value;
    } else {
      api.property(el, value, null, isAttr, true);
    }
  } else {
    if (name === 'class') name += 'Name';
    el[name] = value;
  }
}
export function remove(parent, startNode, endMark) {
  while (startNode && startNode !== endMark) {
    const n = startNode.nextSibling;
    // Is needed in case the child was pulled out the parent before clearing.
    if (parent === startNode.parentNode) {
      parent.removeChild(startNode);
    }
    startNode = n;
  }
}
function castNode(value) {
  if (typeof value === 'string') {
    return document.createTextNode(value);
  }
  if (!(value instanceof Node)) {
    // if value is an array of elements then
    // it should run by h function an empty array to create a document fragment
    return api.h(EMPTY_ARR, value);
  }
  return value;
}
function frag(value) {
  const { childNodes } = value;
  if (!childNodes || value.nodeType !== 11) return;

  if (childNodes.length < 2) {
    return childNodes[0];
  }

  // For a fragment of 2 elements or more add a startMark. This is required
  // for multiple nested conditional computeds that return fragments.
  const _startMark = add(value, '', childNodes[0]);

  return {
    _startMark,
  };
}
function handleEvent(el, name, value) {
  name = name.slice(2).toLowerCase();

  if (value) {
    el.addEventListener(name, eventProxy);
  } else {
    el.removeEventListener(name, eventProxy);
  }

  (el._listeners || (el._listeners = {}))[name] = value;
}
function eventProxy(e) {
  // eslint-disable-next-line
  return this._listeners[e.type](e);
}
