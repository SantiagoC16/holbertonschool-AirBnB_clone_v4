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
        $('.amenities h4').html(amenities);
    });

    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/status/",
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

    // Add click event for the filter button
    $('#filter_button').click(function () {
        let amenityIds = Object.keys(amenitees);

        // Send a POST request to load places with selected amenities from the API
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ amenities: amenityIds }), // Send the selected amenities
            success: function (data) {
                $(".places").empty(); // Clear existing places
                data.forEach(function (place) {
                    var article = document.createElement("article");
                    article.innerHTML = `
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">${place.description}</div>
            `;
                    $(".places").append(article);
                });
            },
            error: function () {
                console.error("Error loading places");
            }
        });
    });
});
