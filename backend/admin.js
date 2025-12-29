const API = "http://localhost:5000/api/destinations";

const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const loginSection = document.getElementById("login-section");
const adminSection = document.getElementById("admin-section");

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin@123";

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if(username === ADMIN_USER && password === ADMIN_PASS) {
    loginSection.style.display = "none";
    adminSection.style.display = "block";
  } else {
    loginError.textContent = "Invalid username or password";
  }
});



const destForm = document.getElementById("destForm");
const destList = document.getElementById("destList");
const submitBtn = document.getElementById("submitBtn");

let editId = null; //to keep track of data that is being edited

destForm.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    city: city.value,
    country: country.value,
    category: category.value,
    image: image.value
  };

  try {
    if (editId) {
      // Edit existing destination
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      submitBtn.textContent = "Add Destination";
      editId = null;
    } else {
      // Adding new destination
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    destForm.reset();
    loadDestinations();
  } catch (err) {
    console.error("Error saving destination:", err);
  }
});

// Loading destinations from backend
async function loadDestinations() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    destList.innerHTML = `
  <div class="pd-cards">
    ${data.map(d => `
      <div class="pd-card">
        <img src="${d.image}" alt="${d.city}" class="pd-img">

        <div class="pd-layout">
          <div>
            <h3 class="pd-city">${d.city}</h3>
            <p class="pd-country">${d.country} (${d.category})</p>
          </div>

          <div class="pd-button">
            <button onclick="editDest('${d._id}')" class="primary-btn" style="width:50px; padding:5px;">Edit</button>
            <button onclick="deleteDest('${d._id}')" class="secondary-btn" style="width:50px; padding:5px; background-color:red; color:white;">Delete</button>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
`;
  } catch (err) {
    console.error("Error loading destinations:", err);
  }
}

// Deleting a destination
async function deleteDest(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadDestinations();
  } catch (err) {
    console.error("Failed to delete:", err);
  }
}

// Editing a destination
async function editDest(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();

    city.value = data.city;
    country.value = data.country;
    category.value = data.category;
    image.value = data.image;

    submitBtn.textContent = "Update Destination";
    editId = id;
  } catch (err) {
    console.error("Failed to fetch for edit:", err);
  }
}

loadDestinations();
