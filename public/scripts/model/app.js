'use strict';

(function (module){
  let hikeData = {};
  let allHikes = JSON.parse(hikes);

  let codeFellowsLat = 47.618248;
  let codeFellowsLng = -122.351871;
  let currentLocationLat;
  let currentLocationLng;

  let lengthPrefArr = [];
  let elevGainPrefArr = [];
  let sortedHikesArr = [];

  //from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
  hikeData.getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        currentLocationLat = position.coords.latitude;
        currentLocationLng = position.coords.longitude;
        console.log('Lat/lng loaded:',currentLocationLat,currentLocationLng);
      });
    } else {
      console.log('No user lat/lng - use CodeFellows lat/lng');
    }
  }

  // distance calculation from http://www.geodatasource.com/developers/javascript
  // Passed to function:
  //  lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
  //  lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
  //  unit = the unit you desire for results
  // Note: this calculates the point to point distance, NOT the driving distance
  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }

  /* SORTING FUNCTIONS */
  hikeData.sortHikes = (length, elevation, distance) => {
    hikeData.lengthPreference(length);
    hikeData.elevPreference(elevation);
    hikeData.distPreference(distance);

    // Sort array of hikes by rating (highest at index 0)
    // code from https://davidwalsh.name/array-sort
    sortedHikesArr.sort(function(obj1, obj2) {
      return obj2.rating - obj1.rating;
    });
    console.log(sortedHikesArr);
  }

  hikeData.lengthPreference = value => {
    console.log('Length preference:',value)
    if (value === 1) {
      for(var i = 0; i < allHikes.length; i++) {
        var hikeLength = parseInt(allHikes[i].length);
        if (hikeLength < 5.0) {
          lengthPrefArr.push(allHikes[i]);
        }
      }
    }
    if (value === 2) {
      for(var j = 0; j < allHikes.length; j++) {
        hikeLength = parseInt(allHikes[j].length);
        if (hikeLength >= 5.0 && hikeLength < 10.0) {
          lengthPrefArr.push(allHikes[j]);
        }
      }
    }
    if (value === 3) {
      for(var k = 0; k < allHikes.length; k++) {
        hikeLength = parseInt(allHikes[k].length);
        if (hikeLength >= 10.0 && hikeLength < 15.0) {
          lengthPrefArr.push(allHikes[k]);
        }
      }
    }
    if (value === 4) {
      for(var l = 0; l < allHikes.length; l++) {
        hikeLength = parseInt(allHikes[l].length);
        if (hikeLength >= 15.0 && hikeLength < 20.0) {
          lengthPrefArr.push(allHikes[l]);
        }
      }
    }
    if (value === 5) {
      for(var m = 0; m < allHikes.length; m++) {
        hikeLength = parseInt(allHikes[m].length);
        if (hikeLength >= 20.0) {
          lengthPrefArr.push(allHikes[m]);
        }
      }
    }
  }

  hikeData.elevPreference = value => {
    console.log('Elevation gain preference:',value)
    if (value === 1) {
      for(var i = 0; i < lengthPrefArr.length; i++) {
        var elevGain = parseInt(lengthPrefArr[i].elevGain);
        if (elevGain < 1000.0) {
          elevGainPrefArr.push(lengthPrefArr[i]);
        }
      }
    }
    if (value === 2) {
      for(var j = 0; j < lengthPrefArr.length; j++) {
        elevGain = parseInt(lengthPrefArr[j].elevGain);
        if (elevGain >= 1000.0 && elevGain < 2000.0){
          elevGainPrefArr.push(lengthPrefArr[j]);
        }
      }
    }
    if (value === 3) {
      for(var l = 0; l < lengthPrefArr.length; l++) {
        elevGain = parseInt(lengthPrefArr[l].elevGain);
        if(elevGain >= 2000.0 && elevGain < 3000.0){
          elevGainPrefArr.push(lengthPrefArr[l]);
        }
      }
    }
    if (value === 4) {
      for(var m = 0; m < lengthPrefArr.length; m++) {
        elevGain = parseInt(lengthPrefArr[m].elevGain);
        if(elevGain >= 3000.0 && elevGain < 4000.0) {
          elevGainPrefArr.push(lengthPrefArr[m]);
        }
      }
    }
    if (value === 5) {
      for(var n = 0; n < lengthPrefArr.length; n++) {
        elevGain = parseInt(lengthPrefArr[n].elevGain);
        if (elevGain >= 4000.0) {
          elevGainPrefArr.push(lengthPrefArr[n]);
        }
      }
    }
  }

  hikeData.distPreference = value => {
    console.log('Distance preference:',value)
    if (currentLocationLat) {
      for(var h = 0; h < elevGainPrefArr.length; h++) {
        var hikeLat = parseFloat(elevGainPrefArr[h].lat);
        var hikeLng = parseFloat(elevGainPrefArr[h].lng);
        var hikeDistance = distance(currentLocationLat, currentLocationLng, hikeLat, hikeLng, 'M');
        elevGainPrefArr[h].distance = hikeDistance;
      }
    } else {
      for(var i = 0; i < elevGainPrefArr.length; i++) {
        hikeLat = parseFloat(elevGainPrefArr[i].lat);
        hikeLng = parseFloat(elevGainPrefArr[i].lng);
        hikeDistance = distance(codeFellowsLat, codeFellowsLng, hikeLat, hikeLng, 'M');
        elevGainPrefArr[i].distance = hikeDistance;
      }
    }

    if (value === 1) {
      for(var j = 0; j < elevGainPrefArr.length; j++) {
        if (elevGainPrefArr[j].distance < 25.0) {
          sortedHikesArr.push(elevGainPrefArr[j]);
        }
      }
    }
    if (value === 2) {
      for(var k = 0; k < elevGainPrefArr.length; k++) {
        if (elevGainPrefArr[k].distance >= 25.0 && elevGainPrefArr[k].distance < 50.0) {
          sortedHikesArr.push(elevGainPrefArr[k]);
        }
      }
    }
    if (value === 3) {
      for(var l = 0; l < elevGainPrefArr.length; l++) {
        if (elevGainPrefArr[l].distance >= 50.0 && elevGainPrefArr[l].distance < 100.0) {
          sortedHikesArr.push(elevGainPrefArr[l]);
        }
      }
    }
    if (value === 4) {
      for(var m = 0; m < elevGainPrefArr.length; m++) {
        if (elevGainPrefArr[m].distance >= 100.0 && elevGainPrefArr[m].distance < 150.0) {
          sortedHikesArr.push(elevGainPrefArr[m]);
        }
      }
    }
    if (value === 5) {
      for(var n = 0; n < elevGainPrefArr.length; n++) {
        if (elevGainPrefArr[n].distance >= 150) {
          sortedHikesArr.push(elevGainPrefArr[n]);
        }
      }
    }
  }

  /* RENDER RESULTS */
  hikeData.renderHikes = () => {
    if (sortedHikesArr.length === 0) {
      hikeData.renderNoHikes();
      $('#container-1, #container-2').hide();
    } else {
      $('#container-3').hide();
      hikeData.renderMainHike();
      hikeData.renderHikeList();
    }
  }

  hikeData.renderMainHike = () => {
    let hikeName = sortedHikesArr[0].name;
    let hikeRating = sortedHikesArr[0].rating;
    let hikeLength = sortedHikesArr[0].length;
    let hikeElev = sortedHikesArr[0].elevGain;
    let hikeURL = 'http://www.wta.org/go-hiking/hikes/' + sortedHikesArr[0].id;

    $('#main-hike-ul').append(`<li>Hike Name: ${hikeName}</li>`)
    $('#main-hike-ul').append(`<li>Rating: ${hikeRating}</li>`)
    $('#main-hike-ul').append(`<li>Length: ${hikeLength}</li>`)
    $('#main-hike-ul').append(`<li>Elevation Gain: ${hikeElev}</li>`)
    $('#main-hike-ul').append(`<li>Read more on the WTA Website: <span><a href="${hikeURL}" target="_blank">${hikeURL}</a></span></li>`)
  }

  hikeData.renderHikeList = () => {
    for(var i = 1; i < 6; i++) {
      let hikeURL = 'http://www.wta.org/go-hiking/hikes/' + sortedHikesArr[i].id;

      let liEl = `<li><span><a href="${hikeURL}" target="_blank">${sortedHikesArr[i].name}</a></span>, ${sortedHikesArr[i].rating} rating, ${sortedHikesArr[i].length} miles, ${sortedHikesArr[i].elevGain} ft. elevation gain</li>`
      $('#list-hike-ul').append(liEl);
    }
  }

  hikeData.renderNoHikes = () => {
    console.log('success');
  }

  module.hikeData = hikeData;

})(window)