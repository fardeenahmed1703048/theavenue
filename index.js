const foodsDiv = document.getElementById('foods-div');
const galleryDiv = document.getElementById('gallery-div');

async function galleryImages() {

    // let response = await fetch('https://salty-caverns-30855.herokuapp.com/allGalleryImages');
    // let user = await response.json();
    // console.log(user);
    galleryDiv.innerHTML = "";
   await fetch("https://salty-caverns-30855.herokuapp.com/allGalleryImages")
        .then(res => res.json())
        .then(data => {

            data.forEach(imageItem => {
                const div = document.createElement("div");
                div.innerHTML = `
               <img style="border-radius:10px" src="data:image/png;base64,${imageItem.img}"/>
               `

                galleryDiv.appendChild(div);
            })
        })
}

galleryImages();

async function loadAllFoodItems() {
    foodsDiv.innerHTML = "";
    await fetch("https://salty-caverns-30855.herokuapp.com/allFoodItems")
        .then(res => res.json())
        .then(data => {
            data.forEach(foodItem => {

                const div = document.createElement('div');
                div.style.width = '330px';
                div.style.height = '474px';
                div.style.top = '747px';
                div.style.left = '900px';
                div.style.padding = '15px 35px 0px 15px';
                div.style.boxShadow = '0px 0px 40px silver';
                div.style.borderRadius = '10px';
                div.innerHTML = `
                   <img style="width:350px; border-radius:10px" src="data:image/png;base64,${foodItem.image.img}" />
                     <h2 class="food-Name">${foodItem.name}</h2>
                     <p class="food-Details">Price:${foodItem.price}/= </p>
                     <p>${foodItem.description}</p>
            
            `
                foodsDiv.appendChild(div);
            })
        })
}

loadAllFoodItems();