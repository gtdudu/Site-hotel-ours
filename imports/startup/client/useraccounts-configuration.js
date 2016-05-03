import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  showForgotPasswordLink: true,
  forbidClientAccountCreation : true,
  defaultTemplate: 'Auth_page',
  defaultLayout: 'app_content',
  defaultContentRegion: 'wrapper',
  defaultLayoutRegions: {},
  homeRoutePath: '/dashboard',

});
