
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById('ramen-detail');
const detailImage = document.querySelector('.detail-image');
const nameElement = document.querySelector('.name');
const restaurantElement = document.querySelector('.restaurant');
const ratingDisplay = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');
const newRamenForm = document.getElementById('new-ramen');


document.addEventListener('DOMContentLoaded', () => {
  fetchRamens(); 
  setupFormSubmit(); 
})

function fetchRamens() {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => {
      renderRamenThumbnails(ramens);
      if (ramens.length > 0) showRamenDetails(ramens[0]); //
    })
    .catch(err => console.error("Fetch error:", err));
}

function renderRamenThumbnails(ramens) {
  ramenMenu.innerHTML = ''; 
  ramens.forEach(ramen => {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.dataset.id = ramen.id; 
    img.addEventListener('click', () => showRamenDetails(ramen));
    ramenMenu.appendChild(img);
  });
}

function showRamenDetails(ramen) {
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

function setupFormSubmit() {
  newRamenForm.addEventListener('submit', e => {
    e.preventDefault();
    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target.elements['new-comment'].value,       id: Math.floor(Math.random() * 1000)
      
    };
    addNewRamen(newRamen);
    e.target.reset();
  });
}

function addNewRamen(ramen) {
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.dataset.id = ramen.id;
  img.addEventListener('click', () => showRamenDetails(ramen));
  ramenMenu.appendChild(img);

  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ramen)
  }).catch(err => console.error("POST error:", err));
}