/*
 * This is for typescript to recognize that we can
 * use something like window.config.appName in our
 * code
 * https://github.com/microsoft/TypeScript/issues/33128
 * */

export {};
declare global {
  interface Window {
    [key: string]: { [key: string]: string };
  }
}
