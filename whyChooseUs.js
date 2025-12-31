const container = document.getElementById("wsu-cards");

fetch("http://localhost:5000/api/why-choose-us")
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "wsu-card";

      div.innerHTML = `
        <i class="${item.icon}"></i>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      `;

      container.appendChild(div);
    });
  });
