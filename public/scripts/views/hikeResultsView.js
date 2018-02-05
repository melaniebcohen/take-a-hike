'use strict';

(function (module){
  let hikeResultsView = {};

  hikeResultsView.init = (ctx, next) => {
    $('#no-results').hide()
    $('#index').hide();
    $('#find-hike').hide();
    $('#hike-results').show();

    window.hikeData.renderMainHike();
    window.hikeData.renderHikeList();
  }

  module.hikeResultsView = hikeResultsView;

})(window);