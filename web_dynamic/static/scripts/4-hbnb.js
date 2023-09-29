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
    amenities += "&nbsp;"
    $('.amenities h4').html(amenities);
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
    },
    error: function () {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: "http://localhost:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function (data) {
      data.forEach(function (place) {
        const article = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>
        `;
        $(".places").append(article);
      });
    },
  });
  $("#filter_button").click(function () {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search',
      method: 'POST',
      data: JSON.stringify({ amenities: Object.keys(amenitees) }),
      contentType: 'application/json',
      success: (data) => {
        $(".places").empty();
        data.forEach(function (place) {
          const article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
          `;
          $(".places").append(article);
        });
      },
    });
  });
});
