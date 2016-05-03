import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  Meteor.publish('events', function eventsPublication(lang) {
    check(lang, Match.OneOf(String, null));
    return Events.find({ lang: lang }, { lang: 1, title: 1, desc: 1, equip: 1, price: 1, pic: 1, updatedAt: 1});
  });

  let nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate()+7);

  if (Events.find({}).count() == 0) {
    Events.insert({
      lang: 'fr',
      title: "Soirée Salsa",
      happens: nextWeek,
      desc: "En compagnie de ... etc ...",
      updatedAt: new Date(),
    });
  }
}

Meteor.methods({
  'events.insert'(obj) {
    check(obj, {
      lang: String,
      title: String,
      desc: String,
      happens: Date,
      pic: String,
      extLink: Match.OneOf(String, null, undefined)
    });

    // Make sure the user is logged in before inserting a event
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.insert({
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      happens: obj.happens,
      pic: obj.pic,
      extLink: obj.extLink || null,
      updatedAt: new Date(),
    });
  },
  'events.update'(obj) {
    check(obj, {
      id: String,
      lang: String,
      title: String,
      happens: Date,
      desc: String,
      pic: String,
      extLink: Match.OneOf(String, null, undefined)
    });

    // Make sure the user is logged in before inserting a event
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.update(obj.id, {
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      happens: obj.happens,
      extLink: obj.extLink || null,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'events.remove'(eventId) {
    check(eventId, String);

    // Make sure the user is logged in before inserting a event
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.remove(eventId);
  },
});
