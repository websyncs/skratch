import { api } from './api';

export const context = (options, isSvg) => {
  for (let i in options) api[i] = options[i];

  const h = (...args) => {
    let el;

    function buildEl(arg) {
      if (arg == null) { return; }
      else if (typeof arg === 'string') {
        if (api.els[arg]) {
          buildEl(api.els[arg]);
        } else if (el) {
          api.add(el, arg);
        } else {
          el = api.create(arg);
        }
      } else if (Array.isArray(arg)) {
        if (!el) el = api.create();
        arg.forEach(buildEl);
      } else if (arg instanceof Node) {
        if (el) {
          api.add(el, arg);
        } else {
          el = arg;
        }
      } else if (typeof arg === 'object') {
        api.property(el, arg, null, isSvg);
      } else if (typeof arg === 'function') {
        if (el) {
          const endMark = api.add(el, '');
          api.insert(el, arg, endMark);
        } else {
          // Custom Components
          el = arg.apply(null, args.splice(1));
        }
      } else {
        api.add(el, '' + arg);
      }
    }
    args.map(buildEl);
    return el;
  };
  return h;
};
