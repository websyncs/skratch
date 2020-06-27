/*
 * Borrowing code from Sinuous by Wesley Luyten (@luwes).
 * https://github.com/luwes/sinuous/blob/master/packages/sinuous/src/index.js
 */
import htm from 'htm';

import { api } from './api';
import { context } from './hyper';
import { create, remove, add, insert, property } from './dom';
import { o, observable, subscribe, cleanup, root, sample } from './observable';

// what ever you will give to context it will add it to api
api.h = context({
  subscribe,
  cleanup,
  root,
  sample,
  create,
  add,
  insert,
  remove,
  property,
}, false);
api.hs = context(
  {
    subscribe,
    cleanup,
    root,
    sample,
    create,
    add,
    insert,
    remove,
    property,
  },
  true
);

export const h = api.h;
export const hs = api.hs;
export const html = htm.bind(h);
export const svg = htm.bind(hs);

export { api, context, o, observable };

export const define = (name, func) => {
  api.els[name] = func;
};
