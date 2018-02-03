'use strict';

(function (module){
  let findHikeView = {};

  findHikeView.init = (ctx, next) => {
    $('#hike-results').hide();
    $('#no-results').hide()
    $('#index').hide();
    $('#find-hike').show();

    next();
  }

  module.findHikeView = findHikeView;

})(window);