var queries = ["BMW", "Kia", "Lexus", "Honda", "Tesla", "Ferrari"];

$(document).ready(function () {

    $("button").on("click", function displayCarInfo() {

        var car = $(this).attr("data-car");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=ke46yN1pXZHc3sQU577y1Y4KoyJBtIZy&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var carImage = $("<img>");

                    carImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(carImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
    });

});

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < queries.length; i++) {

        var a = $("<button>");

        a.addClass("car-btn");

        a.attr("data-car", queries[i]);

        a.text(queries[i]);

        const button2 = $("<button>").addClass('car-btn')
                                     .attr('data-car', queries[i])
                                     .text(queries[i]);
        $("#buttons-view").append(a);
        
    }
}

$("#add-car").on("click", function(event) {
    event.preventDefault();

    var car = $("#car-input").val().trim();

    queries.push(car);

    renderButtons();
});

$(document).on("click", ".car-btn", displayCarInfo);

renderButtons();

