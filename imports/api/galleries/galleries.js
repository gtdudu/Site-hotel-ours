import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Galleries = new Mongo.Collection('galleries');

if (Meteor.isServer) {
  Meteor.publish('galleries', function galleriesPublication(lang) {
    check(lang, Match.OneOf(String, null));
    return Galleries.find({ lang: lang }, { lang: 1, title: 1, desc: 1, pic: 1, updatedAt: 1});
  });

  if (Galleries.find({}).count() == 0) {
    Galleries.insert({
      lang: 'fr',
      title: "chambre simple",
      desc: "description d'une chambre simple",
      pic: "/chambre_2.jpg",
      updatedAt: new Date(),
    });
    Galleries.insert({
      lang: 'fr',
      title: "chambre double",
      desc: "description d'une chambre simple",
      pic: "/chambre_1.jpg",
      updatedAt: new Date(),
    });
    Galleries.insert({
      lang: 'fr',
      title: "chambre double",
      desc: "description d'une chambre simple",
      pic: "/chambre_1.jpg",
      updatedAt: new Date(),
    });
  }
}

Meteor.methods({
  'galleries.insert'(obj) {
    check(obj, {
      lang: String,
      title: String,
      desc: String,
      pic: String
    });

    // Make sure the user is logged in before inserting a gallery
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Galleries.insert({
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'galleries.update'(obj) {
    check(obj, {
      id: String,
      lang: String,
      title: String,
      desc: String,
      pic: String
    });

    // Make sure the user is logged in before updating a gallery
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Galleries.update(obj.id, {
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'galleries.remove'(galleryId) {
    check(galleryId, String);

    // Make sure the user is logged in before removing a gallery
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Galleries.remove(galleryId);
  },
});
