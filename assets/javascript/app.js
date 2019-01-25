// Example queryURL for Giphy API
// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
var queryURL = "https://api.giphy.com/v1/gifs/amimals?api_key=dc6zaTOxFJmzC";
var GIFtopicButtons = ["Frogs", "Lions", "Tigers", "Walruses"];
var myContainerDiv = $('<div class="container">');
  myContainerDiv.empty();
  $('body').append(myContainerDiv);

  // Create divs for adding buttons to and a form for adding new buttons dynamically
  var myButtonsDiv = $('<div id="#my-buttons-view"></div>');
  var myFormDiv = $('<div id="#my-form-view"></div>');
  // clear divs
  myButtonsDiv.empty();
  myFormDiv.empty();
  // Loops through the array of GIF buttons

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

        // Create divs for adding buttons to and a form for adding new buttons dynamically
        var myButtonsDiv = $('<div id="#my-buttons-view"></div>');
        var myFormDiv = $('<div id="#my-form-view"></div>');
        // clear divs
        myButtonsDiv.empty();
        myFormDiv.empty();
        // Loops through the array of GIF buttons
        for (var i = 0; i < GIFtopicButtons.length; i++) {
          // Then dynamicaly generates buttons for each amimal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button id='my-buttons'>");
          // Adds a class of GIF tpoic to our button
          a.addClass("topic");
          // Added a data-attribute
          a.attr("data-name", GIFtopicButtons[i]);
          // Provided the initial button text
          a.text(GIFtopicButtons[i]);
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
    
      function displayTopicGIFs() {
        var topic = $(this).attr("data-name");
        // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&q=animals";
        // var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=kL6Yw5p9brn0ZmIG2h61enqo2B3LCS8o&limit=5";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kL6Yw5p9brn0ZmIG2h61enqo2B3LCS8o&limit=5";
        // Creates AJAX call for the specific movie button being clicked
        // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          alert("Topic=" + topic + " image=" + response.data[0].images.downsized.url);
          console.log(response);
          var myContainerDiv = $('.container');
          var GIFqueryResultsDiv = $('<div>');
          GIFqueryResultsDiv.empty();
          myContainerDiv.append(GIFqueryResultsDiv);
          // GIFqueryResultsDiv.text("Topic="+topic);
          for (i=0;i<response.data.length;i++) {
            var imageDiv = $('<img id="my-GIF-images" src="' +  response.data[i].images.downsized.url + '">');
            GIFqueryResultsDiv.append(imageDiv);
          }

          // Appends the image
          // Puts the entire Movie above the previous movies.
        });
      }
      $(document).on("click", ".topic", displayTopicGIFs);



