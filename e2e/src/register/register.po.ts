import { browser, by, element } from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get('/register') as Promise<any>;
  }

  getRegisterButton() {
    return element(by.cssContainingText('button', 'Register'));
  }

  getUsernameInput() {
    return element(by.id('username'));
  }

  getPasswordInput() {
    return element(by.id('password'));
  }

  getError() {
    return element(by.id('error'));
  }
}
