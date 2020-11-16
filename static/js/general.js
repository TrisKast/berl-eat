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
const searchRestaurantButton = document.getElementById("SearchRestaurantButton");
searchRestaurantButton.addEventListener('click', searchRestaurant)

const footer = document.getElementById("footer");
footer.style.display = 'none'


mealTime_list.forEach(function(mealTime){
    let opt = document.createElement("option");
    opt.value = mealTime;
    opt.textContent = mealTime;
    mealTimeSelect.appendChild(opt);
})

const suggestionSection = document.getElementById('suggestionSection')
suggestionSection.style.display = "none"

const suggestionName = document.getElementById('suggestionName')
const suggestionDistrict = document.getElementById('suggestionDistrict')

//const secondNavbar = document.getElementById('second-navbar')
//secondNavbar.style.display = 'none'

const suggestionReview = document.querySelector('#restaurantSuggestionReview')
suggestionReview.style.display = 'none'

const reviewText = document.querySelector('#suggestionReview')

const restaurantLinks = document.querySelector('#restaurantLinks')
restaurantLinks.style.display = 'none'

const linkLogoContainers = document.querySelectorAll('.link-logo-container')
linkLogoContainers.forEach(function(container){
    container.style.display = "none"
})

const mapSection = document.querySelector('#mapSection')
mapSection.style.display = 'none'

const mapiframe = document.querySelector('#mapSection div iframe')

const contactSection = document.querySelector('#contactSection')
contactSection.style.display = 'none'

const landingSection = document.querySelector('#landingSection')

footer.style.display = 'block'

async function compute_cuisine_list() {
    let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
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
    let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
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
    let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
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
    restaurantLinks.style.display = "none"
    linkLogoContainers.forEach(function(container){
        container.style.display = "none"
    })
    suggestionReview.style.display = 'none'
    contactSection.style.display = 'none'
    // Inside the fetch call 'this' will be overwritten

    let api_url = 'https://berl-eat.herokuapp.com/api/restaurant_list/';
    //const url = 'http://127.0.0.1:8000/api/restaurant_list/'
    const result = await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            console.log(districtSelect.value)
            console.log(cuisineSelect.value)
        if (districtSelect.value != 'Complete Berlin') {
            console.log('Check for district and kiez');
            data = data.filter(entry => (entry.district == districtSelect.value ||
                entry.kiez == districtSelect.value));
        }
        if (cuisineSelect.value != 'Tasty') {
            console.log('Check for cuisine');
            data = data.filter(entry => (entry.cuisineTopTier.includes(cuisineSelect.value) ||
                entry.cuisine.includes(cuisineSelect.value)));
        }
        
        if (mealTimeSelect.value != 'Good Food') {
            console.log('Check for mealTime');
            data = data.filter(entry => entry.mealtimes.includes(mealTimeSelect.value));
        }
        if (specialSelect.value != 'A nice Time') {
            console.log('Check for extras');
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
        console.log(data)
        if (data) {
            suggestionSection.style.display = "flex"
            suggestionName.innerHTML = data.name
            suggestionDistrict.innerHTML = data.district


            // Little parsing for the gogoleMaps link
            let mapsSourceTag = data.googleMapsLink.split(" ")[1];
            mapsSourceTag = mapsSourceTag.substring(5, mapsSourceTag.length - 1);
            console.log(mapsSourceTag)
            mapSection.style.display = 'block'
            mapiframe.src = mapsSourceTag
            // Check if there is any link to an extenal website
            if (data.mVLink || data.homepage || data.tripadvisorLink || data.facebookLink || data.instagramLink) {
                restaurantLinks.style.display = "block"
            }
            if (data.mVLink){
                const mvLinkDiv = document.querySelector('#mvLinkDiv')
                mvLinkDiv.style.display = 'block'
                document.querySelector('#mvLinkDiv a').href = data.mVLink
            }
            if (data.homepage){
                const homepageLinkDiv = document.querySelector('#homepageLinkDiv')
                homepageLinkDiv.style.display = 'block'
                document.querySelector('#homepageLinkDiv a').href = data.homepage
            }
            if (data.facebookLink){
                const fbLinkDiv = document.querySelector('#fbLinkDiv')
                fbLinkDiv.style.display = 'block'
                document.querySelector('#fbLinkDiv a').href = data.facebookLink
            }
            if (data.instagramLink){
                const igLinkDiv = document.querySelector('#igLinkDiv')
                igLinkDiv.style.display = 'block'
                document.querySelector('#igLinkDiv a').href = data.instagramLink
            }
            if (data.tripadvisorLink){
                const taLinkDiv = document.querySelector('#taLinkDiv')
                taLinkDiv.style.display = 'block'
                document.querySelector('#taLinkDiv a').href = data.taLink
            }
        }
        else {
            suggestionName.innerHTML = "Unfortunately we haven\'t any nice place for your selection yet. Feel free to drop us a suggestion !";
        }
        const infoLinks = [data.mVLink,
            data.homepage,
            data.tripadvisorLink,
            data.facebookLink,
            data.instagramLink];
        // Compute the col size in the link display row, depending on the number of external links
        for (let i = 0; i < infoLinks.length; i++) {
            if (infoLinks[i] != null) {
                restaurantLinks_colNr += 1;
            }
        }
        restaurantLinks_colTag = 'col-sm-' + String(12 / restaurantLinks_colNr);
        linkLogoContainers.forEach(function(container){
            container.classList.add('restaurantLinks_colTag')
        })

        if(data.review){
            console.log(data.review)
            reviewText.innerHTML = data.review
            suggestionReview.style.display = 'flex'
        }
        // Display the contact form in any case
        contactSection.style.display = 'block'

        suggestionSection.scrollIntoView({block: "start", behavior: "smooth"});


    })

}

compute_cuisine_list()
compute_district_list()
compute_special_list()