import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Restaurants = new Mongo.Collection('restaurants');

if (Meteor.isServer) {
  Meteor.publish('restaurants', function restaurantsPublication(lang) {
    check(lang, Match.OneOf(String, null));
    return Restaurants.find({ lang: lang }, { lang: 1, title: 1, desc: 1, menu: 1, pic: 1, updatedAt: 1});
  });

  if (Restaurants.find({}).count() == 0) {
    Restaurants.insert({
      lang: 'fr',
      title: "brasserie",
      desc: "La brasserie de l'hôtel de l'ours vous ouvre ses portes, etc..",
      menu: "Carte-2015.pdf",
      pic: "/brasserie.jpg",
      breakfast: "7h00 - 10h00",
      lunch: "11h30 - 15h00",
      dinner: "",
      updatedAt: new Date()
    });
    Restaurants.insert({
      lang: 'fr',
      title: "restaurant",
      desc: "Le restaurant de l'hôtel de l'ours vous acceuille, etc....",
      menu: "Carte-2015.pdf",
      pic: "/restaurant.jpg",
      breakfast: "7h00 - 10h00",
      lunch: "11h30 - 15h00",
      dinner: "19h00 - 23h00",
      updatedAt: new Date()
    });
    Restaurants.insert({
      lang: 'en',
      title: "brasserie",
      desc: "English description",
      menu: "Carte-2015.pdf",
      pic: "/brasserie.jpg",
      breakfast: "7h00 - 10h00",
      lunch: "11h30 - 15h00",
      dinner: "",
      updatedAt: new Date()
    });
    Restaurants.insert({
      lang: 'en',
      title: "restaurant",
      desc: "English description 2....",
      menu: "Carte-2015.pdf",
      pic: "/restaurant.jpg",
      breakfast: "7h00 - 10h00",
      lunch: "11h30 - 15h00",
      dinner: "19h00 - 23h00",
      updatedAt: new Date()
    });

  }
}

Meteor.methods({
  'restaurants.insert'(obj) {
    check(obj, {
      // lang: String,
      title: String,
      desc: String,
      // menu: String,
      pic: String,
      breakfast: Match.OneOf(String, null),
      lunch: Match.OneOf(String, null),
      dinner: Match.OneOf(String, null)
    });

    // Make sure the user is logged in before inserting a restaurant
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Restaurants.insert({
      // lang: obj.lang,
      title: obj.title,
      desc: obj.desc,
      // menu: obj.menu,
      pic: obj.pic,
      breakfast: obj.breakfast,
      lunch: obj.lunch,
      dinner: obj.dinner,
      updatedAt: new Date()
    });
  },
  'restaurants.update'(obj) {
    check(obj, {
      id: String,
      // lang: String,
      title: String,
      desc: String,
      // menu: String,
      pic: String,
      breakfast: Match.OneOf(String, null),
      lunch: Match.OneOf(String, null),
      dinner: Match.OneOf(String, null)
    });

    let item = Restaurants.findOne({_id: obj.id});


    // Make sure the user is logged in before inserting a restaurant
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Restaurants.update(obj.id, {
      lang: item.lang,
      title: obj.title,
      desc: obj.desc,
      // menu: obj.menu,
      pic: obj.pic,
      breakfast: obj.breakfast,
      lunch: obj.lunch,
      dinner: obj.dinner,
      updatedAt: new Date(),
    });
  },
  'restaurants.remove'(restaurantId) {
    check(restaurantId, String);

    // Make sure the user is logged in before inserting a restaurant
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Restaurants.remove(restaurantId);
  },
});
