import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (Meteor.users.find({}).count() == 0) {
    Accounts.createUser({
      username: 'tommy',
      email: 'tommydurand@gmail.com',
      password: 'mastermind',
    });

    Accounts.createUser({
      username: 'sabrina',
      email: 'hotel-ours@gmail.com',
      password: 'ours77120',
    });
  }

});
