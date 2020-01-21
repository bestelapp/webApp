import { RegisterPage } from './register.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('register', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it('should redirect when registered',
    () => {
      page.navigateTo();
      page.getUsernameInput().sendKeys('username');
      page.getPasswordInput().sendKeys('password');
      page.getRegisterButton().click();
      expect(browser.wait(protractor.ExpectedConditions.urlContains('login'), 5000)
          .catch(() => false)
      ).toBeTruthy(`Url match could not succced`);
    }
  );

  it('should return error when registering',
    () => {
      page.navigateTo();
      page.getUsernameInput().sendKeys('username');
      page.getPasswordInput().sendKeys('password');
      page.getRegisterButton().click();
      expect(page.getError().getText()).toBe('could not register');
    }
  );
});
