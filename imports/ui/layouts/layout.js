import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import responsiveNav from '../../libs/responsive-nav.js';
import { Notifs } from '../../api/notifs/notifs.js';
import  moment  from 'moment';

import './layout.html';

const CONNECTION_ISSUE_TIMEOUT = 5000;

// A store which is local to this file?
const showConnectionIssue = new ReactiveVar(false);


Meteor.startup(() => {
  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(() => {
    // FIXME:
    // Launch screen handle created in lib/router.js
    // dataReadyHold.release();

    // Show the connection error box
    showConnectionIssue.set(true);
  }, CONNECTION_ISSUE_TIMEOUT);

  TAPi18n.setLanguage('fr')
    .done(function () {
      Session.set("selectedLanguage", 'fr');
    })
    .fail(function (error_message) {
      console.log(error_message);
      T9n.setLanguage('fr');
      moment.locale('fr');
    });

});

Template.app_nav.onRendered(function appNavRendered() {
  this.nav = responsiveNav("navigation", {customToggle: ".nav-toggle"});
});

Template.app_nav.helpers({
  activeMenu(name) {
    const active = FlowRouter.getRouteName().substring(4);
    return (name && active && name === active) ? 'active' : '';
  },
  activeLanguage(name) {
    const active = Session.get("selectedLanguage");
    return (name === active) ? 'active' : '';
  },
})

Template.app_content.helpers({
  connected() {
    if (showConnectionIssue.get()) {
      return Meteor.status().connected;
    }
    return true;
  },
});

Template.app_nav.events({
  'click .js-select-lang'(event, instance) {
    const lang = event.target.id;
    TAPi18n.setLanguage(lang)
      .done(function () {
        Session.set("selectedLanguage", lang);
        T9n.setLanguage(lang);
        moment.locale(lang);
      })
      .fail(function (error_message) {
        console.log(error_message);
      });
  },
  'click .login-out'(event) {
    event.preventDefault();
    Meteor.logout();

    FlowRouter.go('/');
  },
  'click .list-menus a': function(event) {
    Template.instance().nav.close();
  },
  'click .main-title'() {
    FlowRouter.go('/');
    Template.instance().nav.close();
  }
});

Template.app_notifs.helpers({
  errors: function() {
    return Notifs.find();
  }
});

Template.app_notif_msg.onRendered(function ErrorMessageOnRendered() {
  var notif = this.data;
    Meteor.setTimeout(function () {
      Notifs.remove(notif._id);
    }, 3000);
});
