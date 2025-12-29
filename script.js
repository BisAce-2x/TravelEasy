const API = "http://localhost:5000/api/destinations";
const pdCardsContainer = document.querySelector(".pd-cards");
const menuItems = document.querySelectorAll("#destination-nav li");

let allDestinations = []; // to store the fetched data first

// fetching data
async function loadDestinations() {
  try {
    const res = await fetch(API);
    allDestinations = await res.json();
    displayTopPicks(allDestinations); 
  } catch (err) {
    console.error("Failed to load destinations", err);
  }
}

// Display 4 top picks
function displayTopPicks(destinations) {
  const topPicks = destinations.slice(0, 4);
  pdCardsContainer.innerHTML = topPicks.map(d => `
    <div class="pd-card" data-category="${d.category}">
      <img src="${d.image}" alt="${d.city}" class="pd-img">
      <div class="pd-layout">
        <div>
          <h3 class="pd-city">${d.city}</h3>
          <p class="pd-country">${d.country}</p>
        </div>
        <div class="pd-button">
          <button class="primary-btn">See More</button>
        </div>
      </div>
    </div>
  `).join("");
}

// filtering
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const filter = item.getAttribute('data-filter');
    let filtered = allDestinations;

    if (filter !== 'all') {
      filtered = allDestinations.filter(d => d.category.toLowerCase() === filter.toLowerCase());
    }

    displayTopPicks(filtered);
  });
});

loadDestinations();
