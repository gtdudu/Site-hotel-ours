import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Deals = new Mongo.Collection('deals');

if (Meteor.isServer) {
  Meteor.publish('deals', function dealsPublication(lang) {
    check(lang, Match.OneOf(String, null));
    return Deals.find({ lang: lang }, { lang: 1, title: 1, desc: 1, until: 1, pic: 1, updatedAt: 1});
  });

  if (Deals.find({}).count() == 0) {
    Deals.insert({
      lang: 'fr',
      title: "Réduction de 20% sur tout nos prix !",
      until: "Jusqu'au 21 septembre !",
      desc: "L'hotel de l'ours casse les prix",
      pic: "/chambre_2.jpg",
      updatedAt: new Date(),
    });
    Deals.insert({
      lang: 'fr',
      title: "20% off all our prices !",
      until: "Until september 21th !",
      desc: "Breaking down all our prices, check it out",
      pic: "/chambre_2.jpg",
      updatedAt: new Date(),
    });
  }
}

Meteor.methods({
  'deals.insert'(obj) {
    check(obj, {
      lang: String,
      title: String,
      until: String,
      desc: String,
      pic: String
    });

    // Make sure the user is logged in before inserting a deal
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Deals.insert({
      lang: obj.lang,
      title: obj.title,
      until: obj.until,
      desc: obj.desc,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'deals.update'(obj) {
    check(obj, {
      id: String,
      lang: String,
      title: String,
      until: String,
      desc: String,
      pic: String
    });

    // Make sure the user is logged in before inserting a deal
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Deals.update(obj.id, {
      lang: obj.lang,
      title: obj.title,
      until: obj.until,
      desc: obj.desc,
      pic: obj.pic,
      updatedAt: new Date(),
    });
  },
  'deals.remove'(dealId) {
    check(dealId, String);

    // Make sure the user is logged in before inserting a deal
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Deals.remove(dealId);
  },
});
