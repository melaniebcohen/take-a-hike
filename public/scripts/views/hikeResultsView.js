'use strict';

(function (module){
  let hikeResultsView = {};

  hikeResultsView.init = (ctx, next) => {
    $('#no-results').hide()
    $('#index').hide();
    $('#find-hike').hide();
    $('#hike-results').show();

    $('body').css('background-image', 'url(images/img13.jpg)');

    window.hikeData.renderHikes();
  }

  module.hikeResultsView = hikeResultsView;

})(window);