


const preloader = document.querySelector("[data-preload]");

window.addEventListener("load",function(){
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});




const addEventOnElements = function(elements,eventType, callback){
    for(let i =0, len = elements.length; i< len; i++){
        elements[i].addEventListener(eventType,callback);
    }
};




const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click",toggleNavbar);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = function(){
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom){
        header.classList.add("hide");
        backTopBtn.classList.add("active")
    }
    else{
        header.classList.remove("hide");
        backTopBtn.classList.remove("active")
    }
    lastScrollPos = window.scrollY;
};

window.addEventListener("scroll",function(){
    if(window.scrollY>=50){
        header.classList.add("active");
        hideHeader()
    }
    else{
        header.classList.remove("active");
    }
});


/*HERO SLIDER*/

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];


const updateSliderPos = function(){
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function(){
    if(currentSlidePos >=heroSliderItems.length -1){
        currentSlidePos = 0;
    }
    else{
        currentSlidePos++;
    }

    updateSliderPos();
};


heroSliderNextBtn.addEventListener("click",slideNext);

const slidePrev = function(){
    if(currentSlidePos <= 0){
        currentSlidePos = heroSliderItems.length - 1;
    }
    else{
        currentSlidePos--;
    }
    updateSliderPos();
}
heroSliderPrevBtn.addEventListener("click",slidePrev);

/*AUTO SLIDE*/

let autoSlideInterval;

const autoSLide = function(){
    autoSlideInterval = setInterval(function(){
        slideNext();
    },7000)
};

addEventOnElements([heroSliderNextBtn,heroSliderPrevBtn], "mouseover", function (){
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout",autoSLide);

window.addEventListener("load",autoSLide);




/*PARALLAX EFFECT   */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x,y;

window.addEventListener("mousemove",function(event){
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;
    //reverse the number eg. 20 na -20, -5 na 5

    x = x - (x*2);
    y = y - (y*2);

    for(let i = 0, len = parallaxItems.length; i < len;i++){
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`
    }
});





const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");

function openFullImg(picture){
    fullImgBox.style.display = "flex";
    fullImg.src = picture;
}

function closeFullImg(){
    fullImgBox.style.display = "none";
};


const swiper = new Swiper('.swiper', {

    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 30,
    
    breakpoints:{
        768:{
            slidesPerView:2,
            centeredSlides: false,
        },
        1024:{
            slidesPerView:3,
            centeredSlides: false,
        }
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
   
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay:{
        delay:1200,
        disableOnInteraction: false,
        
     }
  });


function aktulizujOteviraciDobu(){
    const statusDiv = document.getElementById("status-otevreno");
    if(!statusDiv) return;

    const ted = new Date();
    const den = ted.getDay(); // 0 = Neděle, 1 = Pondělí,...,6 = Sobota;
    const hodina = ted.getHours();

    //Nastavení: Pondělí (1) až Pátek (5), od 8 do 18 hodin
    const jeVsedniDen = den>=1 && den<5;
    const jeOtevreno = hodina >=8 && hodina<18;

    if(jeOtevreno){
        statusDiv.innerHTML = `<span class="tecka tecka--zelena"></span> Právě máme otevřeno - stavte se!`;
        statusDiv.style.color = "rgb(35,223,35)";
    }
    else{
        statusDiv.innerHTML = `<span class="tecka tecka--cervena"></span> Aktuálně máme zavřeno`;
        statusDiv.style.color = "#ff4a4a";
    }
}
aktulizujOteviraciDobu();



/*FAQ - HLADKÉ OTEVÍRÁNÍ*/

document.querySelectorAll(".faq-question").forEach(button =>{
    button.addEventListener("click",()=>{
        const faqItem = button.parentElement;
        const answer = faqItem.querySelector(".faq-answer");

        //pokud je otevřená zavři ji
        if(faqItem.classList.contains("active")){
            faqItem.classList.remove("active");
            answer.style.maxHeight = null;
        }
        else{
            document.querySelectorAll(".faq-item").forEach(item =>{
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;

            });

            faqItem.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

const sections = document.querySelectorAll(".sekce");

const callback = (entries,observer)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("animation");
            observer.unobserve(entry.target);

        }
    })
};

const observer = new IntersectionObserver(callback);

sections.forEach((sekce)=>{
    observer.observe(sekce)
});