$(document).ready(function () {
  let amenitees = {};

  $('input[type="checkbox"]').change(function () {
    let id = $(this).data('id');
    let name = $(this).data('name');

    if ($(this).is(':checked')) {
      amenitees[id] = name;
    } else {
      delete amenitees[id];
    }

    let amenities = Object.values(amenitees).join(', ');
    if (amenities.length > 30) {
      amenities = amenities.substring(0, 30) + '...';
    }
    text += "&nbsp;"
    $('.amenities h4').text(amenities);
  });
});


$.ajax({
  url: "http://localhost:5001/api/v1/status/",
  type: "GET",
  success: function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }
});

