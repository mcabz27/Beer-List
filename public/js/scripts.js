$(document).ready(function(){
  console.log('it loaded!');
  var myApi = '**';


var brewery = function(search){
    $.ajax({
    'url': 'http://api.brewerydb.com/v2/search?q=' + search + '&key=' + myApi + '&format=json',
    'method': 'GET',
      success: function(response){
        // for(var i = 0; i < response.data.length; i++){
        console.log(response);
        console.log(response.data[0].name);
        console.log(response.data[0].description);
        console.log(response.data[0].images.medium);
        name = response.data[0].name;
        description = response.data[0].description;
        pic = response.data[0].images.medium;
        appendSearch(name, description, pic)
        }
      })
    };

  var searchButton = function(){
    $('#submit_button').click(function(event){
      event.preventDefault();
      var beerName = $('#beer_entered').val();
      console.log(beerName);
      brewery(beerName);
    })//when button clicked-gets value from input box. runs ajax function
  };
  searchButton();


  var appendSearch = function(name, description, pic){
    $('#allBeer').html('You searched ' + name);
    $('#description').html(description);
    $('#theimage').attr('src', pic);
  };


  $('input.autocomplete').autocomplete({
    data: {
      "goosinator": null,
      "guinness": null,
      // "/beer/random": null,
    }
  });
})
