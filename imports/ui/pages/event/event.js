import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import  moment  from 'moment';
import  customUpload from '../../../libs/upload.js';
import './event.html';
import '../../components/loading/loading.html';
import '../../components/contact/contact.html';

import { Events } from '../../../api/events/events.js';
import { Notifs } from '../../../api/notifs/notifs.js';

Template.app_event.onCreated(function appEventOnCreated() {
  this.upload = customUpload();
  this.state = new ReactiveDict();
  this.state.setDefault({
    modifying: null,
    creating: null,
  })
  this.autorun(function keepRuning() {
    this.events = Meteor.subscribe('events', Session.get('selectedLanguage'));
  })
});

Template.app_event.helpers({
  'prettyDate'(date) {
    return moment(date).format("DD MMM YYYY");
  },
  'events'() {
    return Events.find({}, {sort: { happens: 1}});
  },
  'pic'() {
    return Template.instance().upload.picture.get();
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
  'eventBeingMod'() {
    return Events.findOne({_id: Template.instance().state.get('modifying')});
  },
  'moddedPic'() {
    let moddedPic = Template.instance().upload.picture.get();
    if (moddedPic && moddedPic.image)
      return moddedPic.image;
    else {
      return Events.findOne({_id: Template.instance().state.get('modifying')}).pic;
    }
  },
  isSelected(lang) {
    let event = Events.findOne({_id: Template.instance().state.get('modifying')});
    if (event)
      return ( event.lang === lang ) ? 'selected' : '';
    return '';
  },
  splitEquip() {
    return this.equip.split(",");
  }
})

Template.app_event.events({
  'click .modify'(event, instance) {
    instance.state.set({
      creating: false,
      modifying: this._id
    });
    instance.upload.picture.set({});
    $(".main").animate({ scrollTop: 0 }, "slow");
  },
  'click .validate'(event, instance) {
    if (instance.state.get('creating')) {
      let newEvent = {
        lang: $('#lang-insert').val(),
        title: $('#title-insert').val(),
        happens: new Date($('#date-insert').val()),
        desc: $('#desc-insert').val(),
        extLink: $('#extLink-insert').val(),
        pic: instance.upload.picture.get().image,
      }
      Meteor.call('events.insert', newEvent, function(err){
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Evenement insérée avec succès"});
      });
    }
    if (instance.state.get('modifying')) {
      let moddedEvent = {
        id: event.currentTarget.id,
        lang: $('#lang-modify').val(),
        title: $('#title-modify').val(),
        desc: $('#desc-modify').val(),
        happens: new Date($('#date-modify').val()),
        extLink: $('#extLink-modify').val(),
        pic: $('img[alt="image-modify"]').attr('src')
      }
      Meteor.call('events.update', moddedEvent, function(err){
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Evenement modifiée avec succès"});
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
    Meteor.call('events.remove', this._id, function(err){
      if (err)
        Notifs.insert({desc: err.reason});
      else
        Notifs.insert({desc: "Evenement supprimée avec succès"});
    });
  },
  'click .show-create'(event, instance) {
    instance.state.set({
      creating: true,
      modifying: false
    });
    instance.upload.picture.set({});
  },
  'change #image'(event, instance) {
    function resizeImage() {
      instance.upload.picture.set({
        image: instance.upload.imageToDataUri(this, 800, 400),
      });
    }
    var file = event.currentTarget.files[0];
    if (instance.upload.validateFileType(file)) {
      var reader = new FileReader();
      reader.addEventListener('progress', function(e) {
        instance.upload.info.set({ loaded: this.loaded, total: this.total })
      }, false)
      reader.addEventListener('load', function(e) {
        var img = new Image;
        img.onload = resizeImage;
        img.src = this.result;
      }, false);
      reader.readAsDataURL(file);
    } else {
      Notifs.insert({desc: "L'image doit être au format png, jpg ou jpeg"});
      instance.upload.picture.set({});
    }
  },
  'click .internal-book'() {
    FlowRouter.go('/reservation');
  }
})
