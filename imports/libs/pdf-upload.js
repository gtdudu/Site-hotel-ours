(function() {

  'use strict';

  var pdfUpload = function () {
    return {
      pdf: new ReactiveVar(null),
      info: new ReactiveVar(null),
      validateFileType: function(file) {
        console.log(file.type);
        if (file.type.match(/image.*/)) {
          var allowedTypes = ['pdf'];
          var fileType = file.name.split('.');
          fileType = fileType[fileType.length - 1];
          if(allowedTypes.indexOf(fileType) != -1)
          return true;
        }
        return false;
      },
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = pdfUpload;
  } else {
    window.pdfUpload = pdfUpload;
  }

})();
