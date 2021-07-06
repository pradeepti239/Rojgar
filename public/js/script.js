$(document).ready(function () {
    $(window).scroll(function () {

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });
    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });
    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student.", "Learning."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });


    // togglemenu/navbar
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // $('.seeMore').click(function () {
    //     $('.aboutusRemaining').addClass("showRemaining")
    // })

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});
//preloader
var preloader = document.getElementById('loading');

function mypreloader() {
    preloader.style.display = 'none';
}
if ($(".swiper-container").hasClass("team-member-slider")) {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        allowTouchMove: true,
        loop: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        effect: "coverflow",
        grabCursor: true,
        autoplay: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        coverflow: {
            rotate: 0,
            stretch: 100,
            depth: 200,
            modifier: 1,
            slideShadows: false
        },
        breakpoints: {
            // when window width is <= 768px
            767: {
                slidesPerView: 1,
                centeredSlides: false,
                effect: "slide",
            }
        }
    });
    }
//for search bar
// getting all required elements
const searchWrapper = document.querySelector(".wrapper-search");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".searchbtn");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value.toLocaleLowerCase(); //user enetered data
    let emptyArray = [];
    if (userData) {
        searchbtn.onclick = () => {
            webLink = `http://localhost:3000/serviceinfo#${userData}`;
            // webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    } else {
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element) {
    let selectData = element.textContent;
    selectData = selectData.toLocaleLowerCase();
    inputBox.value = selectData;
    icon.onclick = () => {
        webLink = `http://localhost:3000/serviceinfo#${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
let suggestions = [
    "Painter",
    "Mason",
    "Domestic Helper",
    "Plumber",
    "Gardener",
    "Laundary Service",
];
