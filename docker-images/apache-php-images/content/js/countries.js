$(function() {
    console.log("Loading countries");

    function loadCountries() {
        $.getJSON("/api/countries", function(students) {
            console.log(countries);
            var message = "Nobody is here";
            if (countries.length > 0){
                message = countries[0].name + " " + countries[0].coordinates + " " + countries[0].altitude;
            }
            $("skills").text(message);
        });
    };

    loadCountries();
    setInterval(loadCountries, 3000);
});