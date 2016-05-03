import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Arounds = new Mongo.Collection('arounds');

if (Meteor.isServer) {
  Meteor.publish('arounds', function aroundsPublication(lang) {
    check(lang, Match.OneOf(String, null));
    return Arounds.find({ lang: lang }, { lang: 1, title: 1, desc: 1, extLink: 1, pic: 1, updatedAt: 1});
  });

  if (Arounds.find({}).count() == 0) {
    Arounds.insert({
      lang: 'fr',
      title: "Réduction de 20% sur tout nos prix !",
      extLink: "http://www.google.fr",
      desc: "L'hotel de l'ours casse les prix",
      pic: "/chambre_2.jpg",
      updatedAt: new Date(),
    });
    Arounds.insert({
      lang: 'fr',
      title: "20% off all our prices !",
      extLink: "http://www.google.fr",
      desc: "Breaking down all our prices, check it out",
      pic: "/chambre_2.jpg",
      updatedAt: new Date(),
    });
  }
}

Meteor.methods({
  'arounds.insert'(obj) {
    check(obj, {
      lang: String,
      title: String,
      extLink: String,
      desc: String,
      pic: String
    });

    // Make sure the user is logged in before inserting a around
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Arounds.insert({
      lang: obj.lang,
      title: obj.title,
      extLink: obj.extLink,
      desc: obj.desc,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'arounds.update'(obj) {
    check(obj, {
      id: String,
      lang: String,
      title: String,
      extLink: String,
      desc: String,
      pic: String
    });

    // Make sure the user is logged in before inserting a around
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Arounds.update(obj.id, {
      lang: obj.lang,
      title: obj.title,
      extLink: obj.extLink,
      desc: obj.desc,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'arounds.remove'(aroundId) {
    check(aroundId, String);

    // Make sure the user is logged in before inserting a around
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Arounds.remove(aroundId);
  },
});
