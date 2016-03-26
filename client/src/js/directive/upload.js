// myApp.factory("uploadFactory", [function () {
//     return {
//         scope: {
//             fileread: "="
//         },
//         link: function (scope, element, attributes) {
//             element.bind("change", function (changeEvent) {
//                 var reader = new FileReader();
//                 reader.onload = function (loadEvent) {
//                     scope.$apply(function () {
//                         scope.fileread = loadEvent.target.result;
//                         console.log(loadEvent.target.result)
//                     });
//                 }
//                 reader.readAsDataURL(changeEvent.target.files[0]);
//             });
//         }
//     }
// }]);
//
// myApp.directive('fileUpload', function () {
// console.log("fileUpload")
// return {
//     scope: true,        //create a new scope
//     link: function (scope, el, attrs) {
//         el.bind('change', function (event) {
//             var files = event.target.files;
//             //iterate files since 'multiple' may be specified on the element
//             for (var i = 0;i<files.length;i++) {
//                 //emit event upward
//                 scope.$emit("fileSelected", { file: files[i] });
//             }
//         });
//     }
// };
