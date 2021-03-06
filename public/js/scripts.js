$(document).ready(function(){
  console.log('it loaded!');
  var myApi = '8788a9d8ef81f87cc310c954b394aaa0';
  $('#website').hide();


var brewery = function(search){
    $.ajax({
    'url': 'https://api.brewerydb.com/v2/search?q=' + search + '&key=' + myApi + '&format=json',
    'method': 'GET',
      success: function(response){
        // for(var i = 0; i < response.data.length; i++){
        console.log(response);
        console.log(response.data[0].name);
        console.log(response.data[0].description);
        console.log(response.data[0].images.medium);
        console.log(response.data[0].website);
        console.log(response.data[0].isOrganic);
        $('#website').show();
        name = response.data[0].name;
        description = response.data[0].description;
        pic = response.data[0].images.medium;
        web = response.data[0].website;
        organic = response.data[0].isOrganic;
        appendSearch(name, description, pic, web, organic)
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


  var appendSearch = function(name, description, pic, web, organic){
    $('#allBeer').html('You searched ' + name);
    $('#description').html(description);
    $('#theimage').attr('src', pic);
    $('#web').attr('href', web);
    $('#organic').html('Is it organic(y/n)? ' + organic)
  };

$('input#input_text, textarea#textarea1').characterCounter();

  $('input.autocomplete').autocomplete({
    data: {
      "goosinator": null,
      "guinness": null,
      "blue moon": null,
      "shock top": null,
      "heineken": null,
      "coors light": null,
      "tecate": null,
      "pacifico": null,
      "presidente": null,
      "corona": null,
      "miller genuine draft": null,
      "budweiser": null,
    }
  });
})
