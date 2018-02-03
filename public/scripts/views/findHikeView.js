'use strict';

(function (module){
  let findHikeView = {};

  findHikeView.init = (ctx, next) => {
    $('#hike-results').hide();
    $('#no-results').hide()
    $('#index').hide();
    $('#find-hike').show();

    $('form').on('submit', function(e) {
      e.preventDefault();

      let lengthPref = e.target.length.value;
      let elevPref = e.target.length.value;
      let distPref = e.target.length.value;

      console.log(lengthPref, elevPref, distPref)

      window.hikeData.sortHikes(lengthPref, elevPref, distPref);
    })
  }

  module.findHikeView = findHikeView;

})(window);