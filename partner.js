const partnerContainer = document.getElementById("partner-logos");

fetch("http://localhost:5000/api/partners")
  .then(res => res.json())
  .then(data => {
    partnerContainer.innerHTML = "";

    data.forEach(partner => {
      const div = document.createElement("div");
      div.className = "partner-logo";

      div.innerHTML = `
        <img 
          src="http://localhost:5000/uploads/partners/${partner.logo}" 
          alt="${partner.name}"
        >
      `;

      partnerContainer.appendChild(div);
    });
  })
  .catch(err => console.error(err));
