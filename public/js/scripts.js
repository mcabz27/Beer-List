$(document).ready(function(){
  console.log('it loaded!');
  var myApi = '8788a9d8ef81f87cc310c954b394aaa0';


  $.ajax({
    'url': 'http://api.brewerydb.com/v2/beer/WHQisc?key=' + myApi + '&format=json',
    'method': 'GET',
      success: function(response){
        console.log(response);
        var name = response.data.name;
        var alcohol = response.data.abv;
        var descrip = response.data.description;
        var food = response.data.foodPairings;
        console.log(alcohol);
        appendSearch(name, descrip, alcohol, food);
      }
    });

  var appendSearch = function(name, description, abv, food){
    $('#allBeer').html('You searched ' + name);
    $('#abv').html('The alcohol by volume is ' + abv + '%');
    $('#description').html('Description: ' + description);
    $('#foods').html('Food pairings: ' + food);
  };


  // var clickSearches = function(){
  //   $.('button').click(function(event){
  //     event.preventDefault();
  //     var beerName = $('#beerSearch').val();
  //   })
  // };









  $(".button-collapse").sideNav();

  $('.carousel.carousel-slider').carousel({full_width: true});

// $('.carousel').carousel();
})
