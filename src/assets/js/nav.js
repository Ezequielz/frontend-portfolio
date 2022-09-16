window.addEventListener('scroll',function(){
    const img = document.getElementById("brand-img")
    const txt = document.getElementById("brand-txt")
    const nav = document.getElementById("navbar")
  

    img.classList.toggle("off", window.scrollY>550)
    txt.classList.toggle("on", window.scrollY>550)
    nav.classList.toggle("small", window.scrollY>550)

   
})