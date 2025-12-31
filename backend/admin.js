const API = "http://localhost:5000/api/destinations";
const PARTNER_API = "http://localhost:5000/api/partners";


const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const loginSection = document.getElementById("login-section");
const adminSection = document.getElementById("admin-section");

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin";

loginBtn.addEventListener("click", () => {
  if (
    usernameInput.value === ADMIN_USER &&
    passwordInput.value === ADMIN_PASS
  ) {
    loginSection.style.display = "none";
    adminSection.style.display = "block";
  } else {
    loginError.textContent = "Invalid username or password";
  }
});



const destForm = document.getElementById("destForm");
const destList = document.getElementById("destList");

let editId = null;

destForm.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    city: city.value,
    country: country.value,
    category: category.value,
    image: image.value
  };

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    editId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  destForm.reset();
  loadDestinations();
});

async function loadDestinations() {
  const res = await fetch(API);
  const data = await res.json();

  destList.innerHTML = `
    <div class="pd-cards">
      ${data.map(d => `
        <div class="pd-card">
          <img src="${d.image}" class="pd-img">

          <div class="pd-layout">
            <div>
              <h3 class="pd-city">${d.city}</h3>
              <p class="pd-country">${d.country} (${d.category})</p>
            </div>

            <div class="pd-button">
              <button onclick="editDest('${d._id}')" class="primary-btn">Edit</button>
              <button onclick="deleteDest('${d._id}')" class="secondary-btn" style="background:red;color:white; padding:10px;">Delete</button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

async function deleteDest(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadDestinations();
}

async function editDest(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();

  city.value = data.city;
  country.value = data.country;
  category.value = data.category;
  image.value = data.image;

  editId = id;
}

loadDestinations();


const partnerList = document.getElementById("partnerList");

function addPartner() {
  fetch(PARTNER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: partnerName.value,
      logo: partnerLogo.value
    })
  }).then(loadPartners);
}

function deletePartner(id) {
  fetch(`${PARTNER_API}/${id}`, { method: "DELETE" })
    .then(loadPartners);
}

async function loadPartners() {
  const res = await fetch(PARTNER_API);
  const data = await res.json();

  partnerList.innerHTML = data.map(p => `
    <div style="margin: 20px; border: 1px solid black; border-radius: 20px; background-color: white; padding: 30px; width: 125px;">
      <strong>${p.name}</strong><br>
      <img src="http://localhost:5000/uploads/partners/${p.logo}" width="120"><br><br>
      <button onclick="deletePartner('${p._id}')" class = "primary-btn" style="background-color:red; color;white" >Delete</button>
    </div>
  `).join("");
}

loadPartners();

const WSU_API = "http://localhost:5000/api/why-choose-us";
const wsuList = document.getElementById("wsuList");
const wsuForm = document.getElementById("wsuForm");
const wsuIcon = document.getElementById("wsuIcon");
const wsuTitle = document.getElementById("wsuTitle");
const wsuDesc = document.getElementById("wsuDesc");
const wsuSubmitBtn = document.getElementById("wsuSubmitBtn");

let wsuEditId = null;

wsuForm.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    icon: wsuIcon.value,
    title: wsuTitle.value,
    description: wsuDesc.value
  };

  try {
    if (wsuEditId) {
      await fetch(`${WSU_API}/${wsuEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      wsuSubmitBtn.textContent = "Add Card";
      wsuEditId = null;
    } else {
      await fetch(WSU_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    wsuForm.reset();
    loadWsuCards();
  } catch (err) {
    console.error(err);
  }
});


async function loadWsuCards() {
  try {
    const res = await fetch(WSU_API);
    const data = await res.json();

    wsuList.innerHTML = data.map(c => `
      <div style="margin: 20px; border: 1px solid black; border-radius: 20px; background-color: white; padding: 30px; ">
        <i class="${c.icon}"></i> <strong>${c.title}</strong><br>
        <p>${c.description}</p>
        <button onclick="editWsu('${c._id}')" class="primary-btn">Edit</button>
        <button onclick="deleteWsu('${c._id}')" class="primary-btn" style="background-color:red; color:"white";">Delete</button>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
  }
}

async function deleteWsu(id) {
  await fetch(`${WSU_API}/${id}`, { method: "DELETE" });
  loadWsuCards();
}

async function editWsu(id) {
  const res = await fetch(`${WSU_API}/${id}`);
  const data = await res.json();

  wsuIcon.value = data.icon;
  wsuTitle.value = data.title;
  wsuDesc.value = data.description;

  wsuSubmitBtn.textContent = "Update Card";
  wsuEditId = id;
}

loadWsuCards();

