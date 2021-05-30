$(function() {
    console.log("Loading animals");

    function loadAnimals() {
        $.getJSON("/api/animals/", function(animals) {
            console.log(animals);
            var message = "There is no animals";
            if( animals.length > 0 ) {
                message = animals[0].name + " the " + animals[0].size + " meters " + animals[0].gender + " " + animals[0].species;
            }
            $(".lead").text(message); 
        });
    };
    loadAnimals();
    setInterval( loadAnimals, 5000);
});