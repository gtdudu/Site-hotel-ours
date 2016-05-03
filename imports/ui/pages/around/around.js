import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import  customUpload from '../../../libs/upload.js';
import { Notifs } from '../../../api/notifs/notifs.js';


import './around.html';
import '../../components/loading/loading.html';
import '../../components/contact/contact.html';

import { Arounds } from '../../../api/arounds/arounds.js';

Template.app_around.onCreated(function appRoomOnCreated() {
  this.upload = customUpload();
  this.state = new ReactiveDict();
  this.state.setDefault({
    modifying: null,
    creating: null,
  })
  this.autorun(function keepRuning() {
    this.arounds = Meteor.subscribe('arounds', Session.get('selectedLanguage'));
  })
});

Template.app_around.helpers({
  'arounds'() {
    return Arounds.find({}, {sort: { updatedAt: 1}});
  },
  'aroundClass'(str, index) {
    if (index % 2 == 0)
      return str + '-impair';
    else
      return str + '-pair';
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
  'aroundBeingMod'() {
    return Arounds.findOne({_id: Template.instance().state.get('modifying')});
  },
  'moddedPic'() {
    let moddedPic = Template.instance().upload.picture.get();
    if (moddedPic && moddedPic.image)
      return moddedPic.image;
    else {
      return Arounds.findOne({_id: Template.instance().state.get('modifying')}).pic;
    }
  },
  isSelected(lang) {
    let around = Arounds.findOne({_id: Template.instance().state.get('modifying')});
    if (around)
      return ( around.lang === lang ) ? 'selected' : '';
    return '';
  },
  splitEquip() {
    return this.equip.split(",");
  }
})

Template.app_around.events({
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
      let newAround = {
        lang: $('#lang-insert').val(),
        title: $('#title-insert').val(),
        extLink: $('#extLink-insert').val(),
        desc: $('#desc-insert').val(),
        pic: instance.upload.picture.get().image,
      }
      Meteor.call('arounds.insert', newAround, function(err) {
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Activité insérée avec succès"});
      });
    }
    if (instance.state.get('modifying')) {
      let moddedAround = {
        id: this._id,
        lang: $('#lang-modify').val(),
        title: $('#title-modify').val(),
        extLink: $('#extLink-modify').val(),
        desc: $('#desc-modify').val(),
        pic: $('img[alt="image-modify"]').attr('src')
      }
      console.log(moddedAround);
      Meteor.call('arounds.update', moddedAround, function(err) {
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Activité modifiée avec succès"});
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
    Meteor.call('arounds.remove', this._id, function(err) {
      if (err)
        Notifs.insert({desc: err.reason});
      else
        Notifs.insert({desc: "Activité supprimée succès"});
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
  }
})
