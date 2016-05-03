import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Notifs } from '../../../api/notifs/notifs.js';

import './dashboard.html';

Template.app_dashboard.events({
  'click .validate'(event, instance) {
    let pwdOld = $('#pwd-old').val();
    let pwdNew = $('#pwd-new').val();
    let pwdNewBis = $('#pwd-new-bis').val();
    if (pwdOld && pwdNew && pwdNewBis) {
      if (pwdNew === pwdNewBis) {
        Accounts.changePassword(pwdOld, pwdNew, function(err){
          if (err) {
            Notifs.insert({desc: err.reason})
          }
          else {
            $('#pwd-old').val("");
            $('#pwd-new').val("");
            $('#pwd-new-bis').val("");
            Notifs.insert({desc: 'Votre mot de passe a bien été modifié'})
          }
        });
      } else {
        Notifs.insert({desc: 'Vos nouveaux mot de passe ne semblent pas concorder'})
      }
    } else {
      Notifs.insert({desc: 'Tout les champs sont obligatoires'})
    }
  }
})
