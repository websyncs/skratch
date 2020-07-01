/**
 * Not using class as this need to be single tone
 */
export interface Ioc {
  els: {
    [key: string]: Function;
  };
  [key: string]: any;
}
export const api: Ioc = { els: {} }