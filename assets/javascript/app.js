// Example queryURL for Giphy API
// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
  var queryURL = "https://api.giphy.com/v1/gifs/amimals?api_key=dc6zaTOxFJmzC";
  var GIFtopicButtons = ["Frogs", "Lions", "Tigers", "Walruses"];
  var myContainerDiv = $('<div class="container">');
  var GIFqueryResultsDiv = $('<div id="my-GIFs-view">');
  var myButtonsDiv = $('<div id="#my-buttons-view"></div>');
  var myFormDiv = $('<div id="#my-form-view"></div>');
  var numGIFsToDisplay = 6;

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
    myButtonsDiv.empty();
    myFormDiv.empty();
    // Loops through the array of GIF buttons
    for (var i = 0; i < GIFtopicButtons.length; i++) {
      var a = $("<button id='my-buttons'>");
      a.addClass("topic");
      a.attr("data-name", GIFtopicButtons[i]);
      a.text(GIFtopicButtons[i]);
      myButtonsDiv.append(a);
    }
    var myAddButtonsForm = $('<form id="GIFs-form">');
    myAddButtonsForm.append('<label for="GIF-input">Animal name to add: </label>');
    myAddButtonsForm.append('<input type="text" id="GIF-input"><br>');
    myAddButtonsForm.append('<input id="add-GIF" type="submit" value="Add new animal">');
    myFormDiv.append(myAddButtonsForm);
    // myContainerDiv.append(myButtonsDiv);
    // myContainerDiv.append(myFormDiv);
    myContainerDiv.prepend(myFormDiv);
    myContainerDiv.prepend(myButtonsDiv);
  }
  $(document).on("click", "#add-GIF", function() {
    if ($(this).attr('type')==="submit") {
      GIFtopicButtons.push($('#GIF-input').val());
      renderButtons();
      event.preventDefault();
    }
  });
    
  $(document).on("click", ".my-GIF-images", function() {
    var state = $(this).attr('data-state');
    if (state==="still") {
        var imageSource=$(this).attr('data-animate');
        $(this).attr('src', imageSource);
        $(this).attr('data-state', "animate");
    } else if (state==="animate") {
        var imageSource=$(this).attr('data-still');
        $(this).attr('src', imageSource);
        $(this).attr('data-state', "still");
    }
  });

  function displayTopicGIFs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kL6Yw5p9brn0ZmIG2h61enqo2B3LCS8o&limit="+numGIFsToDisplay;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      GIFqueryResultsDiv.empty();
      myContainerDiv.append(GIFqueryResultsDiv);
      // Load GIFs into the image element on the web page
      for (i=0;i<response.data.length;i++) {
        var imageDiv = $('<img class="my-GIF-images" src="' + response.data[i].images.downsized_still.url + 
          '" data-still="' + response.data[i].images.downsized_still.url + 
          '" data-animate="' + response.data[i].images.downsized.url + '" data-state="still">');
        GIFqueryResultsDiv.append(imageDiv);
      }
    });
  }
  $(document).on("click", ".topic", displayTopicGIFs);



