'use strict';

(function (module){
  let hikeResultsView = {};

  hikeResultsView.init = (ctx, next) => {
    $('#no-results').hide()
    $('#index').hide();
    $('#find-hike').hide();
    $('#hike-results').show();

    $('body').css('background-image', 'url(images/img2.jpg)');

    window.hikeData.renderMainHike();
    window.hikeData.renderHikeList();
  }

  module.hikeResultsView = hikeResultsView;

})(window);