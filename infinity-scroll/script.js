const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let photosArray = [];

//helper function to set attribute on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//create elements for links and photos, add to DOM
function displayPhotos(){
    //run function for each object in photoArray
    photosArray.forEach((photo)=>{
        //create <a> for link in uplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',

        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });

        //event listener, check when each is finished loading
        img.addEventListener('load',imageloaded);
        //put <img> inside <a>,then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);

    } );

}


//unplash Api
const count = 20;
const apiKey ='Qd6Fg5MDpzFhLCuZW_Eo2fh0MlJCjm9TB4ukH4uWgQg';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check all image were loaded
function imageloaded(){
    console.log('image loaded');
}

//get photos from uplash api
async function getPhotos(){

    try {
       const response = await fetch(apiUrl);
       photosArray = await response.json();
    //    console.log(photosArray);
    displayPhotos();
    }
     catch (error) {
        console.log(error);
    }

}



// check to see if scrolling near bottom  of page , Load  more photos
window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000)
    getPhotos();
    console.log('load more');
});

//on load
getPhotos();