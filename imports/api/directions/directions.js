import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Directions = new Mongo.Collection('directions');

if (Meteor.isServer) {
  Meteor.publish('directions', function directionsPublication(lang) {
    check(lang, Match.OneOf(String, null));
    return Directions.find({ lang: lang }, { lang: 1, title: 1, desc: 1, equip: 1, price: 1, pic: 1, updatedAt: 1});
  });

  if (Directions.find({}).count() == 0) {
    Directions.insert({
      lang: 'fr',
      title: "En voiture",
      desc: "Via l'autoroute A4",
      updatedAt: new Date(),
    });
    Directions.insert({
      lang: 'fr',
      title: "En métro",
      desc: "Prendre le Transilien vers coulommiers à la gare de l'Est Paris (train toutes les heures)",
      extLink: "http://www.gares-sncf.com/fr/gare/frpst/paris-est",
      updatedAt: new Date(),
    });
    Directions.insert({
      lang: 'fr',
      title: "En RER",
      desc: "Prendre le RER A , arrêt chessy Marne la vallée ( Disney land paris) ,puis prendre le bus 17 (Chessy -Ferté gaucher) arrêt: gare de Coulommiers (Temps de trajet, environs 45min)",
      extLink: "http://www.transdev-idf.com/horaire-ligne-17-seine_&_marne_express_17_097",
      updatedAt: new Date(),
    });
  }
}

Meteor.methods({
  'directions.insert'(obj) {
    check(obj, {
      lang: String,
      title: String,
      desc: String,
      extLink: Match.OneOf(String, null, undefined)
    });

    // Make sure the user is logged in before inserting a direction
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Directions.insert({
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      extLink: obj.extLink || null,
      updatedAt: new Date(),
    });
  },
  'directions.update'(obj) {
    check(obj, {
      id: String,
      lang: String,
      title: String,
      desc: String,
      extLink: Match.OneOf(String, null, undefined)
    });

    // Make sure the user is logged in before inserting a direction
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Directions.update(obj.id, {
      lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      extLink: obj.extLink || null,
      updatedAt: new Date(),
    });
  },
  'directions.remove'(directionId) {
    check(directionId, String);

    // Make sure the user is logged in before inserting a direction
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Directions.remove(directionId);
  },
});
