const imageData = document.getElementById("food-image");
const foodName = document.getElementById("food-name");
const foodPrice = document.getElementById("food-price");
const foodDescription = document.getElementById("food-description");
const addFoodFrom = document.getElementById("add-food-form");

const existingFoodItems = document.getElementById("existing-food-items");
const existingImages = document.getElementById("existing-images");

const manageFood = document.getElementById("manageFood");
const manageGallery = document.getElementById("manageGallery");

const manageFoodDiv= document.getElementById("admin-option-food");
const manageGalleryDiv= document.getElementById("admin-option-gallery");
const manageAdminDiv= document.getElementById("add-admin-div");

const addBtn = document.getElementById("add-food-items-btn");
const addGalleryBtn = document.getElementById("addGalleryBtn");
const galleryForm = document.getElementById("galleryForm");



function loadAllFoodItems() {
    document.getElementById("loading1").style.display = "none";
    fetch('http://localhost:8080/allFoodItems')
        .then(res => res.json())
        .then(data => {
            document.getElementById("loading").style.display = "none";
            data.forEach(el => {
                const li = document.createElement('li');
                li.style.border = ' 3px solid red';
                li.style.borderRadius = ' 10px';
                li.style.padding = ' 10px';
                li.style.marginTop = ' 10px';
                li.innerHTML = `
                <img style="height:30px; width:30px; margin-top:10px" src="data:image/png;base64,${el.image.img}" />-------name: ${el.name}------price: ${el.price}-----desc: ${el.description}
                  <button  onclick = 'deleteFoodItem(event,"${el._id}")'> Delete </button>
                  <button  onclick = 'loadUpdateItem("${el._id}")'> Update </button> 
                                                                                                          `
                existingFoodItems.appendChild(li);

            });
        })
}

loadAllFoodItems();


function deleteFoodItem(event, id) {
    console.log(event.target.parentNode);
    fetch(`http://localhost:8080/delete/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => {
            event.target.parentNode.style.display = "none";
        })
}

function loadUpdateItem(id) {
    document.getElementById("loading1").style.display = "block";
    fetch(`http://localhost:8080/item/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("loading1").style.display = "none";
            const div = document.getElementById("update");
            div.innerHTML = `
            <h2>Updating food item: ${data.name}  </h2>
            <input id="foodImage"  type="file" />
            <input id="foodName"  type="text" value="${data.name}"/>
            <input id="foodPrice"  type="text" value="${data.price}"/>
            <input id="foodDescription"  type="text" value="${data.description}"/>
            <button type="submit"  onclick="updateFoodItem('${data._id}')">Submit</button>   
            `
        });
}


function updateFoodItem(id) {
    const inputImageData = document.getElementById('foodImage').files[0];
    const inputFoodName = document.getElementById('foodName').value;
    const inputFoodPrice = document.getElementById('foodPrice').value;
    const inputFoodDescription = document.getElementById('foodDescription').value;
    console.log(inputImageData, inputFoodPrice, inputFoodDescription, inputFoodName)

    const imgData = new FormData();
    imgData.append("file", inputImageData);
    imgData.append("name", inputFoodName);
    imgData.append("price", inputFoodPrice);
    imgData.append("description", inputFoodDescription);

    fetch(`http://localhost:8080/update/${id}`, {
        method: 'PATCH',
        body: imgData
    })
        .then(res => res.json())
        .then(res => {
           res && alert('updated successfully');

            loadAllFoodItems();
        })
}


addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const inputImageData = imageData.files[0];
    const inputFoodPrice = foodPrice.value;
    const inputFoodDescription = foodDescription.value;
    const inputFoodName = foodName.value

    const imgData = new FormData();
    imgData.append("file", inputImageData);
    imgData.append("name", inputFoodName);
    imgData.append("price", inputFoodPrice);
    imgData.append("description", inputFoodDescription);

    fetch("http://localhost:8080/addFoodItem", {
        method: 'POST',
        body: imgData
    })
        .then(res => res.json())
        .then((res) => {

            console.log(res)
            alert("Food item added successfully!")
            addFoodFrom.reset();
        })
        .catch((error) => {
            console.log(error);
        });
    console.log(inputImageData, inputFoodPrice, inputFoodDescription);

})

manageFood.addEventListener("click", (event) => {
    console.log(event)
    manageGalleryDiv.style.display = "none";
    manageAdminDiv.style.display = "none";
    manageFoodDiv.style.display = "block";
})

manageGallery.addEventListener("click", (event) => {
    existingImages.innerHTML=""
    manageFoodDiv.style.display = "none";
    manageAdminDiv.style.display = "none";
    manageGalleryDiv.style.display = "block";
    
    document.getElementById("loading2").style.display = "block";

    fetch("http://localhost:8080/allGalleryImages")
    .then(res => res.json())
    .then(data => {
        document.getElementById("loading2").style.display = "none";
        data.forEach(el => {
            const p = document.createElement('p');
            p.style.border = ' 3px solid red';
            p.style.borderRadius = ' 10px';
            p.style.padding = ' 10px';
            p.style.marginTop = ' 10px';
            p.innerHTML = `
            <img style="height:100px; width:100px; margin-top:10px border-radius:10px" src="data:image/png;base64,${el.img}" />
              <button  onclick = 'deleteGalleryImage(event,"${el._id}")'> Delete </button>
                                                                                                      `
            existingImages.appendChild(p);

        });


    })
    .catch(error => {
        alert(
            error.message
        )
    })

})

function deleteGalleryImage(event,id){
    fetch(`http://localhost:8080/deleteImage/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => {
            event.target.parentNode.style.display = "none";
        })
}

addGalleryBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const imageFile = document.getElementById("galleryImage").files[0];
    const imgData = new FormData();
    imgData.append("file", imageFile);

    fetch("http://localhost:8080/addGalleryImage", {
        method: 'POST',
        body: imgData
    })
        .then(res => res.json())
        .then((res) => {

            console.log(res)
            alert("Food item added successfully!")
            galleryForm.reset();
        })
        .catch((error) => {
            console.log(error);
        });
})



const addAdminBtn = document.getElementById('addAdminBtn');
const manageAdmin = document.getElementById('manageAdmin');
const addAdminForm = document.getElementById('admin-add-form');

manageAdmin.addEventListener('click', () =>{
    manageFoodDiv.style.display = "none";
    manageGalleryDiv.style.display = "none";
    manageAdminDiv.style.display = "block";
})

addAdminBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const regEmail = document.getElementById('regiEmail').value;
    const regPassword = document.getElementById('regiPassword').value;

    fetch("http://localhost:8080/addAdmin",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: regEmail, password: regPassword})
    })
    .then(res => res.json())
    .then(data => {
        addAdminForm.reset();
        data && alert("Admin added successfully")
    })
    .catch(error => {
        alert(error.message)
    })

} )