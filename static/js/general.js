import {api_url,
        actual_cuisine_list,
        mapsSourceTag,
        actual_district_list,
        actual_kiez_list,
        actual_kiez_list_filtered,
        actual_special_list,
        actual_cuisineTopTier_list,
        shuffled} from './general.d.ts'

var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#app',
    data: function () {
        return {
            // Define defaults when loading the page
            district: 'Complete Berlin',
            mealTime: 'Good Food',
            extra: 'A nice Time',
            cuisine: 'Tasty',
            restaurantLinks: false,
            restaurantSuggestion: '',
            restaurantLinks_colTag: '',
            restaurantLinks_colNr: 0,
            review: '',
            showContactForm: false,
            district_list: [],
            cuisine_list: [],
            special_list: [],
            // This lists will most likely not change
            mealTime_list: [
                'Breakfast',
                'Brunch',
                'Lunch',
                'Snack',
                'Coffee Break',
                'Dinner',
                'Bar'
            ],
        };
    },
    mounted() {
        this.compute_district_list();
        this.compute_cuisine_list();
        this.compute_special_list();

        this.style.overflow = "hidden";
    },
    methods: {
        // Compute the values that need to be shown in the specific dropdown
        compute_cuisine_list: function () {
            const self = this;
            let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
            // const url = 'http://127.0.0.1:8000/api/restaurant_list/'
            fetch(api_url)
                .then((resp) => resp.json())
                .then(function (data) {
                actual_cuisineTopTier_list = data.map((restaurant) => {
                    return restaurant.cuisineTopTier;
                });
                actual_cuisine_list = data.map((restaurant) => {
                    return restaurant.cuisine;
                });
                actual_cuisine_list = [].concat.apply([], actual_cuisine_list);
                actual_cuisineTopTier_list = [].concat.apply([], actual_cuisineTopTier_list);
                self.cuisine_list = new Set([...actual_cuisineTopTier_list, ...actual_cuisine_list]);
            });
        },
        compute_district_list: function () {
            const self = this;
            let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
            // const url = 'http://127.0.0.1:8000/api/restaurant_list/'
            fetch(api_url)
                .then((resp) => resp.json())
                .then(function (data) {
                const actual_district_list = data.map((restaurant) => {
                    return restaurant.district;
                });
                const actual_kiez_list = data.map((restaurant) => {
                    return restaurant.kiez;
                });
                const actual_kiez_list_filtered = actual_kiez_list.filter((kiez) => {
                    return kiez != '';
                });
                self.district_list = new Set([...actual_district_list, ...actual_kiez_list_filtered]);
            });
        },
        compute_special_list: function () {
            const self = this;
            let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
            // const url = 'http://127.0.0.1:8000/api/restaurant_list/'
            fetch(api_url)
                .then((resp) => resp.json())
                .then(function (data) {
                let actual_special_list = data.map((restaurant) => {
                    return restaurant.specials;
                });
                actual_special_list = [].concat.apply([], actual_special_list);
                self.special_list = new Set(actual_special_list);
            });
        },
        // Main function
        searchRestaurant: function () {
            // Since the button can be repressed without loading the page new, the defaults have to be established again
            this.restaurantSuggestion = '';
            this.restaurantLinks = false;
            // Inside the fetch call 'this' will be overwritten
            var self = this;
            let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
            //const url = 'http://127.0.0.1:8000/api/restaurant_list/'
            fetch(api_url)
                .then((resp) => resp.json())
                .then(function (data) {
                if (self.district != 'Complete Berlin') {
                    console.log('Check for district and kiez');
                    data = data.filter(entry => (entry.district == self.district ||
                        entry.kiez == self.district));
                }
                if (self.cuisine != 'Tasty') {
                    console.log('Check for cuisine');
                    data = data.filter(entry => (entry.cuisineTopTier.includes(self.cuisine) ||
                        entry.cuisine.includes(self.cuisine)));
                }
                if (self.mealTime != 'Good Food') {
                    console.log('Check for mealTime');
                    data = data.filter(entry => entry.mealtimes.includes(self.mealTime));
                }
                if (self.extra != 'A nice Time') {
                    console.log('Check for extras');
                    data = data.filter(entry => entry.specials.includes(self.extra));
                }
                // Pick one random entry from the returned restaurants
                let shuffled = data.slice(0), i = data.length, temp, index;
                while (i--) {
                    index = Math.floor((i + 1) * Math.random());
                    temp = shuffled[index];
                    shuffled[index] = shuffled[i];
                    shuffled[i] = temp;
                }
                data = shuffled.slice(0, 1)[0];
                // If there was a match
                if (data) {
                    self.restaurantSuggestion = data;
                    self.review = data['review'];
                    // Little parsing for the gogoleMaps link
                    let mapsSourceTag = self.restaurantSuggestion['googleMapsLink'].split(" ")[1];
                    self.restaurantSuggestion['googleMapsLink'] = mapsSourceTag.substring(5, mapsSourceTag.length - 1);
                    // Check if there is any link to an extenal website
                    if (data.mVLink || data.homepage || data.tripadvisorLink || data.facebookLink || data.instagramLink) {
                        self.restaurantLinks = true;
                    }
                }
                else {
                    self.restaurantSuggestion = { name: "Unfortunately we haven\'t any nice place for your selection yet. Feel free to drop us a suggestion !" };
                }
                const infoLinks = [self.restaurantSuggestion['mVLink'],
                    self.restaurantSuggestion['homepage'],
                    self.restaurantSuggestion['tripadvisorLink'],
                    self.restaurantSuggestion['facebookLink'],
                    self.restaurantSuggestion['instagramLink']];
                // Compute the col size in the link display row, depending on the number of external links
                for (let i = 0; i < infoLinks.length; i++) {
                    if (infoLinks[i] != null) {
                        self.restaurantLinks_colNr += 1;
                    }
                }
                self.restaurantLinks_colTag = 'col-sm-' + String(12 / self.restaurantLinks_colNr);
                // Display the contact form in any case
                self.showContactForm = true;
                // If it is there scroll to it, if not scroll to where it would have been
                // Return promise to enable second 'then' clause, to enforce the scrolling to wait until the rest is computed
                return Promise.all([true, true]);
            })
                .then(function (data) {
                const elmnt = $("#suggestionSection")[0].scrollIntoView();
            });
        },
    },
});
