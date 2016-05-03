import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Meteor } from 'meteor/meteor';

// Import to load these templates
import '../../ui/components/not_found/not-found.js';
import '../../ui/layouts/layout.js';
import '../../ui/pages/room/room.js';
import '../../ui/pages/restaurant/restaurant.js';
import '../../ui/pages/restaurant/restaurant_menu.js';
import '../../ui/pages/deal/deal.js';
import '../../ui/pages/rental/rental.js';
import '../../ui/pages/around/around.js';
import '../../ui/pages/gallery/gallery.js';
import '../../ui/pages/event/event.js';
import '../../ui/pages/direction/direction.js';
import '../../ui/pages/dashboard/dashboard.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/book/book.js';
import '../../ui/accounts/accounts-templates.js';

FlowRouter.route('/', {
  name: 'App.home',

  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_home' });
  },
});

FlowRouter.route('/chambres', {
  name: 'App.chambres',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_room' });
  },
});

FlowRouter.route('/restaurant/menu', {
  name: 'App.restaurant.menu',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_restaurant_menu' });
  },
});

FlowRouter.route('/restaurant', {
  name: 'App.restaurant',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_restaurant' });
  },
});

FlowRouter.route('/offres', {
  name: 'App.offres',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_deal' });
  },
});


FlowRouter.route('/reservation', {
  name: 'App.reservation',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_book' });
  },
});
// Probably not really usefull for now
// FlowRouter.route('/privatisation', {
//   name: 'App.privatisation',
//   action() {
//     BlazeLayout.render('app_content', { wrapper: 'app_rental' });
//   },
// });
//
FlowRouter.route('/tourisme', {
  name: 'App.tourisme',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_around' });
  },
});

FlowRouter.route('/galerie', {
  name: 'App.galerie',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_gallery' });
  },
});

FlowRouter.route('/evenements', {
  name: 'App.evenements',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_event' });
  },
});


FlowRouter.route('/venir', {
  name: 'App.venir',
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_direction' });
  },
});

FlowRouter.route('/dashboard', {
  name: 'App.dashboard',
  triggersEnter: [(context, redirect) => {
    if (!Meteor.userId())
      redirect('/login');
  }],
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_dashboard' });
  },
});


// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('app_content', { wrapper: 'app_notFound' });
  },
};

AccountsTemplates.configureRoute('signIn', {
  name: 'login',
  path: '/login',
});
//
// AccountsTemplates.configureRoute('signUp', {
//   name: 'join',
//   path: '/join',
// });

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});
