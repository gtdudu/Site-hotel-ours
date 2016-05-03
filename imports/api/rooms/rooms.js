import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) {
  Meteor.publish('rooms', function roomsPublication(lang) {
    check(lang, Match.OneOf(String, null));
    return Rooms.find({ lang: lang }, { lang: 1, title: 1, desc: 1, equip: 1, price: 1, pic: 1, updatedAt: 1});
  });

  if (Rooms.find({}).count() == 0) {
    Rooms.insert({
      lang: 'fr',
      title: "chambre simple",
      desc: "description d'une chambre simple",
      equip: "bain, douche, wifi, télé écran plat",
      price: "345£",
      pic: "/chambre_2.jpg",
      updatedAt: new Date(),
    });
    Rooms.insert({
      lang: 'fr',
      title: "chambre double",
      desc: "description d'une chambre simple",
      equip: "bain, douche, wifi, télé écran plat",
      price: "345£",
      pic: "/chambre_1.jpg",
      updatedAt: new Date(),
    });
  }
}

Meteor.methods({
  'rooms.insert'(obj) {
    check(obj, {
      lang: String,
      title: String,
      desc: String,
      equip: String,
      price: String,
      pic: String
    });

    // Make sure the user is logged in before inserting a room
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.insert({
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      equip: obj.equip,
      price: obj.price,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'rooms.update'(obj) {
    check(obj, {
      id: String,
      lang: String,
      title: String,
      desc: String,
      equip: String,
      price: String,
      pic: String
    });

    // Make sure the user is logged in before inserting a room
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.update(obj.id, {
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      equip: obj.equip,
      price: obj.price,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'rooms.remove'(roomId) {
    check(roomId, String);

    // Make sure the user is logged in before inserting a room
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.remove(roomId);
  },
});
