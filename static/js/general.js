//import {api_url,
//        actual_cuisine_list,
//        mapsSourceTag,
//        actual_district_list,
//        actual_kiez_list,
//        actual_kiez_list_filtered,
//        actual_special_list,
//        actual_cuisineTopTier_list,
//        shuffled} from './general.d.ts'




// Define defaults when loading the page
let district = 'Complete Berlin'
let mealTime = 'Good Food'
let extra = 'A nice Time'
let cuisine = 'Tasty'
let restaurantSuggestion = ''
let restaurantLinks_colTag = ''
let restaurantLinks_colNr = 0
let review = ''
let showContactForm = false
let district_list = []
let cuisine_list = []
let special_list = []
// This lists will most likely not change
let mealTime_list = [
    'Breakfast',
    'Brunch',
    'Lunch',
    'Snack',
    'Coffee Break',
    'Dinner',
    'Bar'
]

const cuisineSelect = document.getElementById("cuisine-select");
const districtSelect = document.getElementById("district-select");
const specialSelect = document.getElementById("extra-select");
const mealTimeSelect = document.getElementById("mealTime-select");
const suggSectionSplitter = document.getElementById('sugg-section-splitter')
const suggestionSection = document.getElementById('suggestionSection')
const searchRestaurantButton = document.getElementById("SearchRestaurantButton");
const suggestionName = document.getElementById('suggestionName')
const suggestionDistrict = document.getElementById('suggestionDistrict')
const suggestionReview = document.querySelector('#restaurantSuggestionReview')
const reviewText = document.querySelector('#suggestionReview')
const restaurantLinks = document.querySelector('#restaurantLinks')
const footer = document.getElementById("footer");
const mapSection = document.querySelector('#mapSection')
const linkLogoContainers = document.querySelectorAll('.link-logo-container')
const suggReviewSplitter = document.querySelector('#sugg-review-splitter')
const mapiframe = document.querySelector('#mapSection div iframe')
const contactSection = document.querySelector('#contactSection')
const landingSection = document.querySelector('#landingSection')

footer.style.display = 'none'
suggSectionSplitter.style.display = 'none'
suggestionSection.style.display = "none"
suggestionReview.style.display = 'none'
restaurantLinks.style.display = 'none'
mapSection.style.display = 'none'
suggReviewSplitter.style.display = 'none'
contactSection.style.display = 'none'
footer.style.display = 'block'
linkLogoContainers.forEach(function(container){
    container.style.display = "none"
})

mealTime_list.forEach(function(mealTime){
    let opt = document.createElement("option");
    opt.value = mealTime;
    opt.textContent = mealTime;
    mealTimeSelect.appendChild(opt);
})

searchRestaurantButton.addEventListener('click', searchRestaurant)


async function compute_cuisine_list() {
    const api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
    // const url = 'http://127.0.0.1:8000/api/restaurant_list/'
    const cuisine_list = Array.from(await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
        let actual_cuisineTopTier_list = data.map((restaurant) => {
            return restaurant.cuisineTopTier;
        });
        let actual_cuisine_list = data.map((restaurant) => {
            return restaurant.cuisine;
        });

        actual_cuisine_list = [].concat.apply([], actual_cuisine_list);
        actual_cuisineTopTier_list = [].concat.apply([], actual_cuisineTopTier_list);
        const cuisine_list = new Set([...actual_cuisineTopTier_list, ...actual_cuisine_list]);

        return cuisine_list;
    }))
    cuisine_list.forEach(function(cuisine){
        let opt = document.createElement("option");
        opt.value = cuisine;
        opt.textContent = cuisine;
        cuisineSelect.appendChild(opt);
    })
}

async function compute_district_list() {
    const api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
    // const url = 'http://127.0.0.1:8000/api/restaurant_list/'
    const district_list = Array.from(await fetch(url)
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
        const district_list = new Set([...actual_district_list, ...actual_kiez_list_filtered]);
        return district_list
    }))



    district_list.forEach(function(district){
        let opt = document.createElement("option");
        opt.value = district;
        opt.textContent = district;
        districtSelect.appendChild(opt);
    })


}

async function compute_special_list() {
    const api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
    // const url = 'http://127.0.0.1:8000/api/restaurant_list/'
    const special_list = Array.from(await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
        let actual_special_list = data.map((restaurant) => {
            return restaurant.specials;
        });
        actual_special_list = [].concat.apply([], actual_special_list);
        const special_list = new Set(actual_special_list);
        return special_list
    }))

    special_list.forEach(function(special){
        let opt = document.createElement("option");
        opt.value = special;
        opt.textContent = special;
        specialSelect.appendChild(opt);
    })
}

async function searchRestaurant() {
    // Since the button can be repressed without loading the page new, the defaults have to be established again
    restaurantSuggestion = '';
    suggestionSection.style.display = "none"
    suggSectionSplitter.style.display = 'none'
    restaurantLinks.style.display = "none"
    linkLogoContainers.forEach(function(container){
        container.style.display = "none"
    })
    suggReviewSplitter.style.display = 'none'
    suggestionReview.style.display = 'none'
    contactSection.style.display = 'none'
    mapSection.style.display = 'none'
    contactSection.style.display = 'block'




    const api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
    // const url = 'http://127.0.0.1:8000/api/restaurant_list/'


    const result = await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {

        const infoLinks = [];

        if (districtSelect.value != 'Complete Berlin') {
            data = data.filter(entry => (entry.district == districtSelect.value ||
                entry.kiez == districtSelect.value));
        }
        if (cuisineSelect.value != 'Tasty') {
            data = data.filter(entry => (entry.cuisineTopTier.includes(cuisineSelect.value) ||
                entry.cuisine.includes(cuisineSelect.value)));
        }
        if (mealTimeSelect.value != 'Good Food') {
            data = data.filter(entry => entry.mealtimes.includes(mealTimeSelect.value));
        }
        if (specialSelect.value != 'A nice Time') {
            data = data.filter(entry => entry.specials.includes(specialSelect.value));
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
            suggestionSection.style.display = "flex"
            suggSectionSplitter.display = 'block'
            suggestionName.innerHTML = data.name
            suggestionDistrict.innerHTML = data.district


            // Little parsing for the gogoleMaps link
            let mapsSourceTag = data.googleMapsLink.split(" ")[1];
            mapsSourceTag = mapsSourceTag.substring(5, mapsSourceTag.length - 1);
            mapSection.style.display = 'block'
            mapiframe.src = mapsSourceTag

            for (var prop of [data.mVLink,data.homepage,data.tripadvisorLink,data.facebookLink,data.instagramLink]) {
                if(prop){
                    infoLinks.push(prop)
                }
            }


            // Check if there is any link to an extenal website
            if (infoLinks.length > 0) {
                restaurantLinks.style.display = "block"
            }



            for (var prop of ['mvLink', 'homepageLink', 'facebookLink', 'instagramLink', 'tripadvisorLink']){
                if(data[prop]){
                    document.querySelector(`#${prop}Div`).style.display = 'block'
                    document.querySelector('#'+prop+'Div a').href = data[prop]
                }
            }
        }
        else {
            suggestionName.innerHTML = "Unfortunately we haven\'t any nice place for your selection yet. Feel free to drop us a suggestion !";
        }

        // Compute the col size in the link display row, depending on the number of external links
        infoLinks.forEach(function(infolink){
            if (infoLinks[i] != null) {
                restaurantLinks_colNr += 1;
            }
        })
        restaurantLinks_colTag = 'col-sm-' + String(12 / restaurantLinks_colNr);
        linkLogoContainers.forEach(function(container){
            container.classList.add('restaurantLinks_colTag')
        })

        if(data.review){
            reviewText.innerHTML = data.review
            suggestionReview.style.display = 'flex'
            suggReviewSplitter.style.display = 'block'
        }

        // Display the contact form in any case
        contactSection.style.display = 'block'

        // Scroll to the name of the suggestion
        suggestionSection.scrollIntoView({block: "start", behavior: "smooth"});
    })
}

compute_cuisine_list()
compute_district_list()
compute_special_list()