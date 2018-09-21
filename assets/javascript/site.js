
var characters = ["Ariel", "Stitch", "Maleficent"];

function renderButtons() {
  $("#buttons").empty();

  for (var i = 0; i < characters.length; i++) {
    var newButton = $("<button class='btn btn-lg btn-info m-3'>").text(characters[i]);
    newButton.attr("character-name", characters[i]);
    $("#buttons").append(newButton);
  }
}

$("#add-character").on("click", function () {
  event.preventDefault();

  var newCharacter = ($("#character-input").val());
  console.log(newCharacter);

  if (!newCharacter.trim()) return;
  if (characters.includes(newCharacter)) return;

  characters.push(newCharacter);

  renderButtons();

  $("#character-input").val("");
});

function showGIFS() {
  $(".gifview").empty();

  var character = $(this).attr("character-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=94seWm1lW1J7gltQpmkPEtUo8Txlcwxl&limit=10"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 0; i < 10; i++) {
      var characterDiv = $("<div class='col-6 characterGif'>");
      var rating = $("<p class='mt-1 text-white'>").text("Rating: " + response.data[i].rating);
      console.log(response.data[i].rating);
      var gif = $("<img>");

      gif.attr("src", response.data[i].images.fixed_height_still.url);
      gif.attr("switch", response.data[i].images.fixed_height.url);

      characterDiv.append(gif, rating);

      $(".gifview").append(characterDiv);
    }
  });
}

$(document).on("click", "img", function(){
  var now = $(this).attr("src");
  var after = $(this).attr("switch");

  $(this).attr("src", after);
  $(this).attr("switch", now);
});

renderButtons();
$(document).on("click", "button", showGIFS);

