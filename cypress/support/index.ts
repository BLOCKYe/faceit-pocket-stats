export {};
declare global {
  namespace Cypress {
    interface Chainable {
      getById(selector: string, ...args: any): Chainable<JQuery<HTMLElement>>;
    }
  }
}
