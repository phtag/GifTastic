// Example queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    var GIFbuttons = ["Frogs", "Lions", "Tigers", "Walruses"];

    renderButtons();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
     // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        var myContainerDiv = $('<div class="container">');
        myContainerDiv.empty();
        $('body').append(myContainerDiv);

        var myButtonsDiv = $('<div id="#my-buttons-view"></div>');
        var myFormDiv = $('<div id="#my-form-view"></div>');
         myButtonsDiv.empty();
        myFormDiv.empty();
        // Loops through the array of movies
        for (var i = 0; i < GIFbuttons.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button id='my-buttons'>");
          // Adds a class of animal to our button
          a.addClass("animal");
          // Added a data-attribute
          a.attr("data-name", GIFbuttons[i]);
          // Provided the initial button text
          a.text(GIFbuttons[i]);
          // Added the button to the buttons-view div
          myButtonsDiv.append(a);
        }
        var myAddButtonsForm = $('<form id="GIFs-form">');
        myAddButtonsForm.append('<label for="GIF-input">Animal name to add: </label>');
        myAddButtonsForm.append('<input type="text" id="GIF-input"><br>');
        myAddButtonsForm.append('<input id="add-GIF" type="submit" value="Add new animal">');
        myFormDiv.append(myAddButtonsForm);
        myContainerDiv.append(myButtonsDiv);
        myContainerDiv.append(myFormDiv);
      }



