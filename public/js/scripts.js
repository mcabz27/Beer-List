$(document).ready(function(){
  console.log('it loaded!');
  var myApi = '8788a9d8ef81f87cc310c954b394aaa0';


var brewery = function(search){
    $.ajax({
    'url': 'http://api.brewerydb.com/v2/search?q=' + search + '&key=' + myApi + '&format=json',
    'method': 'GET',
      success: function(response){
        // for(var i = 0; i < response.data.length; i++){
        console.log(response);
        console.log(response.data[0].name);
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


  // var appendSearch = function(name, description, abv, food){
  //   $('#allBeer').html('You searched ' + name);
  //   $('#abv').html('The alcohol by volume is ' + abv + '%');
  //   $('#description').html('Description: ' + description);
  //   $('#foods').html('Food pairings: ' + food);
  // };


  $('input.autocomplete').autocomplete({
    data: {
      "goosinator": null,
      "guinness": null,
      // "/beer/random": null,
    }
  });
})
