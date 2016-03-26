(function () {

  function NotificationsProvider() {

    var options = {
      ttl: 5000
    };

    this.setOptions = function (newOptions) {
      angular.extend(options, newOptions);
      return this;
    };

    this.ttl = function (ttl) {
      if (angular.isDefined(ttl)) {
        options.ttl = ttl;
        return this;
      }
      return options.ttl;
    };

    this.$get = function () {

      function Notifications() {

        this.options = options;
        this.element = null;

      }

      return new Notifications();

    };

  }

  // Export
  angular
    .module('ngclient')
    .provider('Notifications', NotificationsProvider);

})();

(function(){
'use strict';

   angular
      .module('ngclient')
      .directive('gtNotifications', NotificationsDirective);

      NotificationsDirective.$inject = ['Notifications'];

      function NotificationsDirective(Notifications) {

         return {

            restrict: 'AE',
            link: function (scope, iElem, iAttrs) {
               Notifications.element = iElem;
            }
         };
      }

})();

(function () {
'use strict';

   angular
      .module('ngclient')
      .directive('gtNotification', NotificationDirective);

   NotificationDirective.$inject = ['Notifications', '$animate', '$timeout'];

   function NotificationDirective(Notifications, $animate, $timeout) {

      var defaults = {
         ttl: Notifications.options.ttl || 5000
      };

      return {

         restrict: 'AE',
         scope: true,
         controller: NotificationController,
         controllerAs: '$Notification',
         link: function (scope, iElem, iAttrs, ctrl) {

            // Assemble options
            var options = angular.extend({}, defaults, scope.$eval(iAttrs.NotificationOptions));

            if (iAttrs.ttl) {
               options.ttl = scope.$eval(iAttrs.ttl);
            }

            // Move the element to the right location in the DOM
            $animate.move(iElem, Notifications.element);

            // Run onOpen handler if there is one
            if (iAttrs.onOpen) {
               scope.$eval(iAttrs.onOpen);
            }

            // Schedule automatic removal
            ctrl.timer = $timeout(function () {
               $animate.leave(iElem);

               // Run onClose handler if there is one
               if(iAttrs.onClose){
                  scope.$eval(iAttrs.onClose);
               }
            }, options.ttl);

         }
      };

   }

   NotificationController.$inject = ['$element', '$animate', '$attrs', '$scope'];

   function NotificationController($element, $animate, $attrs, $scope) {

      /**
      * Placeholder for timer promise
      */
      this.timer = null;

      /**
      * Helper method to close notification manually
      */
      this.remove = function () {

         // Remove the element
         $animate.leave($element);

         // Cancel scheduled automatic removal if there is one
         if (this.timer && this.timer.cancel) {
            this.timer.cancel();

            // Run onClose handler if there is one
            if($attrs.onClose){
               $scope.$eval($attrs.onClose);
            }
         }
      };

   }

})();
