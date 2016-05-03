import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import  customUpload from '../../../libs/upload.js';
import { Restaurants } from '../../../api/restaurants/restaurants.js';
import { Notifs } from '../../../api/notifs/notifs.js';

import '../../components/loading/loading.html';
import '../../components/contact/contact.html';

import './restaurant.html';

Template.app_restaurant.onCreated(function appRestaurantOnCreated() {
  this.upload = customUpload();
  this.state = new ReactiveDict();
  this.state.setDefault({
    modifying: null,
  })
  this.autorun(function keepRuning(){
    this.restaurants = Meteor.subscribe('restaurants', Session.get('selectedLanguage'));
  })
})

Template.app_restaurant.helpers({
  'restaurants'() {
    return Restaurants.find({}, {sort: { updatedAt: 1 }});
  },
  'pic'() {
    return Template.instance().upload.picture.get();
  },
  'isModifying'() {
    return Meteor.user() && Template.instance().state.get('modifying');
  },
  'restaurantBeingMod'() {
    return Restaurants.findOne({_id: Template.instance().state.get('modifying')});
  },
  'moddedPic'() {
    let moddedPic = Template.instance().upload.picture.get();
    if (moddedPic && moddedPic.image)
      return moddedPic.image;
    else {
      return Restaurants.findOne({_id: Template.instance().state.get('modifying')}).pic;
    }
  },
  isSelected(lang) {
    let restaurant = Restaurants.findOne({_id: Template.instance().state.get('modifying')});
    if (restaurant)
      return ( restaurant.lang === lang ) ? 'selected' : '';
    return '';
  },

})

Template.app_restaurant.events({
  'click .accordion'(event, instance ) {
    event.target.nextElementSibling.classList.toggle("show");
  },
  'click .modify'(event, instance) {
    instance.state.set({
      modifying: this._id
    });
    instance.upload.picture.set({});
    $(".main").animate({ scrollTop: 0 }, "slow");
  },
  'click .validate'(event, instance) {
    if (instance.state.get('modifying')) {
      let moddedRestaurant = {
        id: event.currentTarget.id,
        // lang: $('#lang-modify').val(),
        title: $('#title-modify').val(),
        desc: $('#desc-modify').val(),
        breakfast: $('#breakfast-modify').val(),
        lunch: $('#lunch-modify').val(),
        dinner: $('#dinner-modify').val(),
        pic: $('img[alt="image-modify"]').attr('src')
      }
      Meteor.call('restaurants.update', moddedRestaurant, function(err) {
        if (err)
          Notifs.insert({desc: err.reason});
        else
          Notifs.insert({desc: "Information modifiée avec succès"});
      });
    }
    instance.state.set({
      modifying: false,
    });
  },
  'click .cancel'(event, instance) {
    instance.state.set({
      modifying: false,
    });
  },
  // 'click .delete'(event, instance) {
  //   Meteor.call('restaurants.remove', this._id);
  // },
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
