(function(){
'use strict';

   angular
      .module('ngclient')
      .directive('embedSrc', PdfDirective);

      function PdfDirective() {

         return {
           restrict: 'A',
           link: function(scope, element, attrs) {
             scope.$watch(
               function() {
                 console.log(attrs.embedSrc);
                 return attrs.embedSrc;
               },
               function() {
                 var clone = element
                            .clone()
                            .attr('data', attrs.embedSrc);
              element.replaceWith(clone);
               }
             );
           }
         };

      }

})();
