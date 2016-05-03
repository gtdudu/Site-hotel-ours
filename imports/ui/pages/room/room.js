import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import  customUpload from '../../../libs/upload.js';
import './room.html';
import '../../components/loading/loading.html';
import '../../components/contact/contact.html';

import { Rooms } from '../../../api/rooms/rooms.js';
import { Notifs } from '../../../api/notifs/notifs.js';

Template.app_room.onCreated(function appRoomOnCreated() {
  this.upload = customUpload();
  this.state = new ReactiveDict();
  this.state.setDefault({
    modifying: null,
    creating: null,
  })
  this.autorun(function keepRuning() {
    this.rooms = Meteor.subscribe('rooms', Session.get('selectedLanguage'));
  })
});

Template.app_room.helpers({
  'rooms'() {
    return Rooms.find({}, {sort: { updatedAt: 1}});
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
  'roomBeingMod'() {
    return Rooms.findOne({_id: Template.instance().state.get('modifying')});
  },
  'moddedPic'() {
    let moddedPic = Template.instance().upload.picture.get();
    if (moddedPic && moddedPic.image)
      return moddedPic.image;
    else {
      return Rooms.findOne({_id: Template.instance().state.get('modifying')}).pic;
    }
  },
  isSelected(lang) {
    let room = Rooms.findOne({_id: Template.instance().state.get('modifying')});
    if (room)
      return ( room.lang === lang ) ? 'selected' : '';
    return '';
  },
  splitEquip() {
    return this.equip.split(",");
  }
})

Template.app_room.events({
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
      let newRoom = {
        lang: $('#lang-insert').val(),
        title: $('#title-insert').val(),
        desc: $('#desc-insert').val(),
        equip: $('#equip-insert').val(),
        price: $('#price-insert').val(),
        pic: instance.upload.picture.get().image,
      }
      Meteor.call('rooms.insert', newRoom, function(err){
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Chambre insérée avec succès"});
      });
    }
    if (instance.state.get('modifying')) {
      let moddedRoom = {
        id: event.currentTarget.id,
        lang: $('#lang-modify').val(),
        title: $('#title-modify').val(),
        desc: $('#desc-modify').val(),
        equip: $('#equip-modify').val(),
        price: $('#price-modify').val(),
        pic: $('img[alt="image-modify"]').attr('src')
      }
      Meteor.call('rooms.update', moddedRoom, function(err){
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Chambre modifiée avec succès"});
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
    Meteor.call('rooms.remove', this._id, function(err){
      if (err)
        Notifs.insert({desc: err.reason});
      else
        Notifs.insert({desc: "Chambre supprimée avec succès"});
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
