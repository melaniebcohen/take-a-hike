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

  $('#index a').on('click', function(){
    console.log('Get location function');
    window.hikeData.getLocation();
  })


  module.indexView = indexView;

})(window);