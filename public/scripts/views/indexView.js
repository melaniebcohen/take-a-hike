'use strict';

(function (module) {
  let indexView = {};

  indexView.init = (ctx, next) => {
    $('#find-hike').hide();
    $('#hike-results').hide();
    $('#no-results').hide()
    $('#index').show();

    next();
  }

  module.indexView = indexView;

})(window);