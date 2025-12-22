const menuItems = document.querySelectorAll("#destination-nav li")
const cards = document.querySelectorAll('.pd-card')

menuItems.forEach((item)=>{
    item.addEventListener('click',()=>{
        menuItems.forEach(i => i.classList.remove("active"))
        item.classList.add("active");
        const filter = item.getAttribute('data-filter')
        cards.forEach((card)=>{
            if (filter==='all'|| card.getAttribute('data-category')=== filter){
                card.style.display = "block"
            }
            else{
                card.style.display = "none"
            }
        })
    })
})