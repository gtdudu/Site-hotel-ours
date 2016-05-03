import './home.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../../components/contact/contact.html';


Template.app_home.events({
  'click .internal-book'() {
    FlowRouter.go('/reservation');
  }
});
