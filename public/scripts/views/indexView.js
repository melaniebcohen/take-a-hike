'use strict';

(function (module) {
  let indexView = {};

  indexView.init = (ctx, next) => {
    $('#find-hike').hide();
    $('#hike-results').hide();
    $('#no-results').hide()
    $('#index').show();

    $('body').css('background-image', 'url(images/img14.jpg)');

    next();
  }

  $('header #burger').on('click', function(e) {
    e.preventDefault();
    $('header #mobile').toggleClass('show-ul');
  })

  $('#index a').on('click', function() {
    console.log('Get location function');
    window.hikeData.getLocation();
  })


  module.indexView = indexView;

})(window);