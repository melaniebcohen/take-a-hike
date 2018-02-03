'use strict';

(function (module){
  let hikeResultsView = {};

  hikeResultsView.init = (ctx, next) => {
    $('#no-results').hide()
    $('#index').hide();
    $('#find-hike').hide();
    $('#hike-results').show();

    next();
  }

  module.hikeResultsView = hikeResultsView;

})(window);