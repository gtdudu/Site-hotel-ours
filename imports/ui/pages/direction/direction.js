import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../../components/loading/loading.html';
import '../../components/contact/contact.html';
import './direction.html';
import { Directions } from '../../../api/directions/directions.js';
import { Notifs } from '../../../api/notifs/notifs.js';

Template.app_direction.onCreated(function appDirectionOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    modifying: null,
    creating: null,
  })
  this.autorun(function keepRuning() {
    this.directions = Meteor.subscribe('directions', Session.get('selectedLanguage'));
  })
});

Template.app_direction.helpers({
  'directions'() {
    return Directions.find({}, {sort: { updatedAt: 1}});
  },
  'isModifying'() {
    return Meteor.user() && Template.instance().state.get('modifying');
  },
  'isCreating'() {
    return Meteor.user() && Template.instance().state.get('creating');
  },
  'notModifying'() {
    return Meteor.user() && !Template.instance().state.get('modifying');
  },
  'directionBeingMod'() {
    return Directions.findOne({_id: Template.instance().state.get('modifying')});
  },
  isSelected(lang) {
    let direction = Directions.findOne({_id: Template.instance().state.get('modifying')});
    if (direction)
      return ( direction.lang === lang ) ? 'selected' : '';
    return '';
  }
})

Template.app_direction.events({
  'click .modify'(event, instance) {
    instance.state.set({
      creating: false,
      modifying: this._id
    });
    $(".main").animate({ scrollTop: 0 }, "slow");
  },
  'click .validate'(event, instance) {
    if (instance.state.get('creating')) {
      let newDirection = {
        lang: $('#lang-insert').val(),
        title: $('#title-insert').val(),
        desc: $('#desc-insert').val(),
        extLink: $('#extLink-insert').val(),
      }
      Meteor.call('directions.insert', newDirection, function(err) {
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Indication insérée avec succès"});
      });
    }
    if (instance.state.get('modifying')) {
      let moddedDirection = {
        id: event.currentTarget.id,
        lang: $('#lang-modify').val(),
        title: $('#title-modify').val(),
        desc: $('#desc-modify').val(),
        extLink: $('#extLink-modify').val(),
      }
      Meteor.call('directions.update', moddedDirection, function(err) {
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Indication modifiée avec succès"});
      });
    }
    instance.state.set({
      modifying: false,
      creating: false
    });
  },
  'click .cancel'(event, instance) {
    instance.state.set({
      modifying: false,
      creating: false
    });
  },
  'click .delete'(event, instance) {
    Meteor.call('directions.remove', this._id, function(err){
      if (err)
        Notifs.insert({desc: err.reason});
      else
        Notifs.insert({desc: "Indication supprimée avec succès"});
    });
  },
  'click .show-create'(event, instance) {
    instance.state.set({
      creating: true,
      modifying: false
    });
  }
})
