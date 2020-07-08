var app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: function() {
    return{
      district: 'Complete Berlin',
      mealTime: 'Good Food',
      extra: 'A nice Time',
      cuisine: 'Tasty',
      restaurantSuggestion: '',
      showMoreInfo: '',
      restaurantSuggestionMVLink: '',
      restaurantSuggestionHomepage: '',
      restaurantSuggestionMap: '',
      restaurantSuggestionReview: '',

      district_list : [
          'Charlottenburg',
          'Friedrichshain',
          'Hellersdorf',
          'Hohenschoenhausen',
          'Kreuzberg',
          'Koepenick',
          'Lichtenberg',
          'Marzahn',
          'Mitte',
          'Moabit',
          'Neukoelln',
          'Pankow',
          'Prenzlauer Berg',
          'Reinickendorf',
          'Schoeneberg',
          'Spandau',
          'Steglitz',
          'Tempelhof',
          'Tiergarten',
          'Treptow',
          'Wedding',
          'Weißensee',
          'Wilmersdorf',
          'Zehlendorf',

          'Nollendorfkiez'
      ],

      cuisine_list : [
            'European',
            'Asian',
            'South-American',
            'North-American',
            'African',
            'Oceania',

            'German',
            'Vietnamese',
            'Chinese',
            'Thai',
            'Mexican',
            'Italien',
            'French',
            'Hawaiien',
            'Russian',
            'Polish',
            'Greek',
            'French',
            'Spanish',
            'Taiwanese',
            'Chilenian',
            'Columbian',
            'American',
            'Turkish',
            'Syrian',
            'Austrian',
            'Japanese',
      ],

      mealTime_list : [
        'Breakfast',
        'Brunch',
        'Lunch',
        'Snack',
        'Coffee',
        'Dinner',
        'Bar'
      ],

      special_list : [
        'Outdoor Seating',
        'Vegetarian Options',
        'Vegan Options'
      ]
    }
  },
  methods: {
      getRandomSubarray: function(arr, size){
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, size);
      },
      searchRestaurant: function(){

        var self = this;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var url = 'http://127.0.0.1:8000/api/restaurant_list/'
        //var url = 'https://berl-eat.herokuapp.com/api/restaurant_list/'
        fetch(url)


        //fetch(proxyurl + url)
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
            self.restaurantSuggestionMap = data.googleMapsLink
            self.restaurantSuggestionReview = data.review
          } else {
            self.restaurantSuggestion = {name: "Unfortunately we haven\'t any nice place for your selection yet. Feel free to drop us a suggestion !"}
            self.restaurantSuggestionMVLink = ''
            self.restaurantSuggestionHomepage = ''
            self.restaurantSuggestionMap = ''
            self.restaurantSuggestionReview = ''
          }

          $('#suggestionSection').visibility='visible'
          //$('html,body').animate({scrollTop: $("#suggestionSection").offset().top},'slow');



        })
      },
      toggle_showMoreInfo: function(){
        this.showMoreInfo = true;
      }

  }
});
