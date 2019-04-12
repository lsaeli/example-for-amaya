var API_KEY = "333aabbc33b9f32fc978893c93045b8c";
var cel = false;
// celsius will not display as default
var wd;





// text input id. when it changes, read the val.
// formulate colors

// if temperature is greater than 10 and less than/equal to 29 degrees, make the yellow
// if the above statement isn't true, then check if the temperature is greater than 19 and less than/equal to 29 degrees,
// if the temp is greater than 29 degrees, make the color red

// body's css changes to one of the above background colors
$("#tempChange").change(function(event) {
    var temp = $("#tempChange").val();
    var color = 'blue'
    if (temp > 10 && temp <= 19) {
        color = 'yellow'
    } else if (temp > 19 && temp <= 29) {
        color = 'green'
    } else if (temp > 29) {
        color = 'red'
    }
    $('body').css('background', color)
});




// display temperature, creates functions for fahrenheit and celcius conversion
// if reading celcius, document returns with fahrenheit val rounded to the nearest degree
// document returns with calculated fahrenheit temp with °F written after temp val
function displayTemp(fTemp, c) {
    if (c) return Math.round((fTemp - 32) * (5 / 9)) + " °C";
    return Math.round(fTemp) + " °F";
};


// render weather data
// makes vars
// calls div (or span) ids. html writes currentLocation, currentTemp, etc. within them
// humidity is written as a percentage, but before that adds wind speed

// http://api.jquery.com/prepend/. adds wind speed before humidity

// icon variable sourced from openweathermap. this allows the javascript to pull every icon's URL and adds a png extension
// current temperature gets the weather icon added before it
function render(wd) {
    var currentLocation = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp, cel);
    var high = wd.main.temp_max;
    var low = wd.main.temp_min;
    var icon = wd.weather[0].icon;
    var humidity = wd.main.humidity;
    var wind = wd.wind.speed;
    var currentCountry = wd.country;

    $('#currentLocation').html(currentLocation);
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#humidity').html(" / humidity: " + humidity + "%").prepend("speed of wind: " + wind + "km/h");


    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#currentTemp').prepend('<img src="' + iconSrc + '">');

};


$(function() {
    var loc;
    // location

    // takes location from ipinfo.io, splits string. console writes locoation
    // wd = weather data, i think

    // function renders api data and celsius
    // button with id of toggle gets an event listener. Onclick, celsius temp does not equal celsius.
    // rendered is weather data, and celsius

    // the code was written weird at the end, but it basically says that when the button is pressed, the temp should
    // display in celsius. click again to change to fahrenheit
    $.getJSON('http://ipinfo.io', function(d) {
        loc = d.loc.split(",");
        console.log(loc);
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY,
            function(apiData) {
                wd = apiData;

                render(apiData, cel);

                $('#toggle').click(function() {
                    cel = !cel;
                    render(wd, cel);

                });
            });

    });

});