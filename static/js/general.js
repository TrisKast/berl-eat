// If we would want to import something do it here.
// The thing to import has to be an 'export' flag

import { thingToExport } from './test.js';


var app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: function() {
    return{

      // Define defaults when loading the page
      district: 'Complete Berlin',
      mealTime: 'Good Food',
      extra: 'A nice Time',
      cuisine: 'Tasty',
      restaurantSuggestion: '',
      restaurantSuggestionMVLink: '',
      restaurantSuggestionHomepage: '',
      restaurantSuggestionFacebook: '',
      restaurantSuggestionTripadvisor: '',
      restaurantSuggestionMap: '',
      restaurantSuggestionReview: '',
      showMoreInfo: false,
      moreInfoAvailable: false,
      showContactForm: false,
      restaurantLinks_colTag: '',
      restaurantLinks_colNr: 0,

      district_list : [],
      cuisine_list : [],
      special_list : [],

      // These lists will most likely not change
      mealTime_list : [
        'Breakfast',
        'Brunch',
        'Lunch',
        'Snack',
        'Coffee',
        'Dinner',
        'Bar'
      ],
    }
  },
  mounted(){
    this.compute_district_list();
    this.compute_cuisine_list();
    this.compute_special_list();
  },
  methods: {

      // Compute the values that need to be shown in the dropdown
      compute_cuisine_list: function(){
        var self = this

        var url = 'https://berl-eat.herokuapp.com/api/restaurant_list/'
        // var url = 'http://127.0.0.1:8000/api/restaurant_list/'
        fetch(url)

        .then((resp) => resp.json())
        .then(function(data){
          var actual_cuisineTopTier_list = data.map((restaurant) => {
            return restaurant.cuisineTopTier
          })
          var actual_cuisine_list = data.map((restaurant) => {
            return restaurant.cuisine
          })

          actual_cuisine_list = [].concat.apply([], actual_cuisine_list);
          actual_cuisineTopTier_list = [].concat.apply([], actual_cuisineTopTier_list);

          self.cuisine_list = new Set([...actual_cuisineTopTier_list, ...actual_cuisine_list]);
        })
      },

      compute_district_list: function(){
        var self = this

        var url = 'https://berl-eat.herokuapp.com/api/restaurant_list/'
        // var url = 'http://127.0.0.1:8000/api/restaurant_list/'
        fetch(url)

        .then((resp) => resp.json())
        .then(function(data){
          const actual_district_list = data.map((restaurant) => {
            return restaurant.district
          })
          const actual_kiez_list = data.map((restaurant) => {
            return restaurant.kiez
          })
          const actual_kiez_list_filtered = actual_kiez_list.filter((kiez) => {
            return kiez != ''
          });

          self.district_list = new Set([...actual_district_list, ...actual_kiez_list_filtered]);
        })
      },

      compute_special_list: function(){
        var self = this

        //var url = 'https://berl-eat.herokuapp.com/api/restaurant_list/'
        var url = 'http://127.0.0.1:8000/api/restaurant_list/'
        fetch(url)

        .then((resp) => resp.json())
        .then(function(data){
          let actual_special_list = data.map((restaurant) => {
            return restaurant.specials
          })
          actual_special_list = [].concat.apply([], actual_special_list);
          self.special_list = new Set(actual_special_list);
        })
      },

      // For mobile: Render the restaurants website only if the specific button is pressed
      toggleRestaurantWebsite: function(){
        $('#toggleRestaurantWebsite_button')[0].style.display = 'none';
        $('#restaurantWebsite')[0].style.display = 'block';
        $('#restaurantWebsite')[0].style.height = '100vh';
      },

      // Main function
      searchRestaurant: function(){

        // Since the button can be repressed without loading the page new, the defaults have to be established again
        this.restaurantSuggestion = ''
        this.showMoreInfo = false
        this.restaurantSuggestionMVLink = ''
        this.restaurantSuggestionHomepage = ''
        this.restaurantSuggestionTripadvisor = ''
        this.restaurantSuggestionFacebbok = ''
        this.restaurantSuggestionMap = ''
        this.restaurantSuggestionReview = ''
        this.moreInfoAvailable = false
        this.showContactForm = false

        // Inside the fetch call this will be overwritten
        var self = this;

        const url = 'https://berl-eat.herokuapp.com/api/restaurant_list/'
        // const url = 'http://127.0.0.1:8000/api/restaurant_list/'

        fetch(url)

        .then((resp) => resp.json())
        .then(function(data){


          if(self.district != 'Complete Berlin'){
            console.log('Check for district')
            data = data.filter(entry => (entry.district == self.district ||
                                         entry.kiez == self.district));
          }

          if(self.cuisine != 'Tasty'){
            console.log('Check for cuisine')
            data = data.filter(entry => (entry.cuisineTopTier == self.cuisine ||
                                         entry.cuisine == self.cuisine));
          }

          if(self.mealTime != 'Good Food'){
            console.log('Check for mealTime')
            data = data.filter(entry => (entry.mealTime1 == self.mealTime ||
                                         entry.mealTime2 == self.mealTime ||
                                         entry.mealTime3 == self.mealTime ||
                                         entry.mealTime4 == self.mealTime ||
                                         entry.mealTime5 == self.mealTime ||
                                         entry.mealTime6 == self.mealTime ||
                                         entry.mealTime7 == self.mealTime ));
          }

          if(self.extra != 'A nice Time'){
            console.log('Check for extras')
            data = data.filter(entry => (entry.special1 == self.extra ||
                                         entry.special2 == self.extra ||
                                         entry.special3 == self.extra ));
          }

          var shuffled = data.slice(0), i = data.length, temp, index;
          while (i--) {
              index = Math.floor((i + 1) * Math.random());
              temp = shuffled[index];
              shuffled[index] = shuffled[i];
              shuffled[i] = temp;
          }
          data = shuffled.slice(0, 1)[0];
          console.log(data)

          if (data){
            self.restaurantSuggestion = data
            self.restaurantSuggestionMVLink = data.mVLink
            self.restaurantSuggestionHomepage = data.homepage
            self.restaurantSuggestionTripadvisor = data.tripadvisor
            self.restaurantSuggestionFacebook = data.facebook
            self.restaurantSuggestionReview = data.review
            self.moreInfoAvailable = true
            var mapsSourceTag = data.googleMapsLink.split(" ")[1];
            self.restaurantSuggestionMap = mapsSourceTag.substring(5, mapsSourceTag.length - 1);
          } else {
            self.restaurantSuggestion = {name: "Unfortunately we haven\'t any nice place for your selection yet. Feel free to drop us a suggestion !"}
            self.showContactForm = true;
          }

          var infoLinks = [self.restaurantSuggestionMVLink, self.restaurantSuggestionHomepage, self.restaurantSuggestionTripadvisor, self.restaurantSuggestionFacebook];

          for (var i = 0; i < infoLinks.length; i++) {
            if(infoLinks[i] != null){
              self.restaurantLinks_colNr += 1
            }
          }

          self.restaurantLinks_colTag = 'col-lg-'+String(12/self.restaurantLinks_colNr)

          $('#suggestionSection').visibility='visible'

          var vheight = $(window).height();
          $('html, body').animate({
            scrollTop: (Math.floor($(window).scrollTop() / vheight)+1) * vheight
          }, 500);

        })
      },

      toggle_showMoreInfo: function(){
        this.showMoreInfo = true;
        this.showContactForm = true;

        var vheight = $(window).height();
        $('html, body').animate({
          scrollTop: (Math.floor($(window).scrollTop() / vheight)+1) * vheight
        }, 500);
      },

  }
});
