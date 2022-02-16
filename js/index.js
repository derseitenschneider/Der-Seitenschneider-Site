"use strict";

/////////////////////////////////////////////////////////////////////
// PRELOAD //
/////////////////////////////////////////////////////////////////////

//Remove preload transition class

window.addEventListener("load", function () {
  document.querySelector("body").classList.remove("preload");
});

///////////////////////////////////////////////////////////
// CAROUSEL HEADING
///////////////////////////////////////////////////////////

const headingCarousel = document.querySelectorAll(".el-carousel");

const hideRotationElement = function (element) {
  element.classList.remove("active");
  element.classList.add("previous");
};

const showRotationElement = function (element) {
  element.classList.add("active");
};

let i = 0;

//Rotationloop (no for-loop since setTimeout doesn't work with that)

const rotationLoop = function () {
  setTimeout(function () {
    //Hide current rotation element
    hideRotationElement(headingCarousel[i]);
    i++;

    //Show next rotation element
    showRotationElement(headingCarousel[i]);

    //Continue loop when current rotation element is not the last one
    if (i < headingCarousel.length - 1) rotationLoop();
  }, 2000);
};

rotationLoop();

///////////////////////////////////////////////////////////
// PORTFOLIO SLIDE //
///////////////////////////////////////////////////////////

// VARABLES //

const slideImages = document.querySelectorAll(".slide-img");
const slideDescriptions = document.querySelectorAll(".slide-description");
const btnPortfolioLeft = document.querySelector(".btn-arrow--left");
const btnPortfolioRight = document.querySelector(".btn-arrow--right");

let slideIndex = 1;

// FUNCTIONS //

const slideDescriptionUpdate = function () {
  //Hide all slide description
  slideDescriptions.forEach((element) => element.classList.remove("active"));

  //Show current new slide description
  slideDescriptions[slideIndex - 1].classList.add("active");
};

const slideToRight = function () {
  //Slide Images
  let currentSlide = slideImages[slideIndex - 1];
  currentSlide.classList.add("active");
  currentSlide.classList.remove("to-right");
  slideImages[slideIndex - 2].classList.add("to-left");

  //Make Btn-Left active
  btnPortfolioLeft.classList.remove("btn-inactive");
  btnPortfolioLeft.removeAttribute("tabindex");
  btnPortfolioLeft.removeAttribute("aria-hidden");

  //Make Btn-Right inactive when last Slide
  if (slideIndex >= slideImages.length) {
    btnPortfolioRight.classList.add("btn-inactive");
    btnPortfolioRight.setAttribute("tabindex", -1);
    btnPortfolioRight.setAttribute("aria-hidden", true);
  }

  slideDescriptionUpdate();
};

const slideToLeft = function () {
  let currentSlide = slideImages[slideIndex - 1];

  currentSlide.classList.add("active");
  currentSlide.classList.remove("to-left");
  slideImages[slideIndex].classList.add("to-right");

  //Make Btn-Right active
  btnPortfolioRight.classList.remove("btn-inactive");
  btnPortfolioRight.removeAttribute("tabindex");

  //Make Btn-Left inactive when first slide
  if (slideIndex == 1) {
    btnPortfolioLeft.classList.add("btn-inactive");
    btnPortfolioLeft.setAttribute("tabindex", -1);
  }
  slideDescriptionUpdate();
};

const updateSlideIndex = function (number) {
  //When sliding left
  if (number < 0) {
    if (slideIndex > 1) {
      slideIndex = number + slideIndex;
      slideToLeft();
    }
  }
  //When sliding right
  if (number > 0) {
    if (slideIndex < slideImages.length) {
      {
        slideIndex += number;
        slideToRight();
      }
    }
  }
};

///////////////////////////////////////////////////////////
// STICKY SCROLL NAV //
///////////////////////////////////////////////////////////

// VARIABLES //

const body = document.querySelector("body");
const sectionHeroEL = document.querySelector(".section-hero");
const allSections = document.querySelectorAll(".section-main");
const btnScrollNav = document.querySelector(".btn-scroll-nav");
const containerScrollNav = document.querySelector(".container-scroll-nav");

// FUNCTIONS //

const addStickyScrollNavBtn = function () {
  body.classList.add("sticky");
};

const removeStickyScrollNavBtn = function () {
  body.classList.remove("sticky");
};

const openCloseScrollNav = function () {
  body.classList.toggle("scrollnav-open");
};

// INTERSECTION OBSERVER  HERO SCROLL NAV BTN //

let optionsStickyNavHero = {
  root: null,
  rootMargin: "-80px",
  threshold: 0,
};

const callbackStickyNavHero = function (entries) {
  entries.forEach((entry) => {
    //Show btn nav when hero is no more in the viewport
    if (!entry.isIntersecting) {
      containerScrollNav.removeAttribute("tabindex");
      btnScrollNav.removeAttribute("tabindex");
      addStickyScrollNavBtn();
    }
    //Hide btn nav when hero is in the viewport
    if (entry.isIntersecting) {
      containerScrollNav.setAttribute("tabindex", -1);
      btnScrollNav.setAttribute("tabindex", -1);
      body.classList.remove("scrollnav-open");
      setTimeout(removeStickyScrollNavBtn, 650);
    }
  });
};

let observerStickyNavHero = new IntersectionObserver(
  callbackStickyNavHero,
  optionsStickyNavHero
);

observerStickyNavHero.observe(sectionHeroEL);

// INTERSECTION OBSERVER SECTIONS SCROLL NAV BTN //
let optionsStickyNavSections = {
  root: null,
  rootMargin: "0",
  threshold: 0,
};

const callbackStickyNavSections = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      containerScrollNav.removeAttribute("tabindex");
      btnScrollNav.removeAttribute("tabindex");
      addStickyScrollNavBtn();
    }
  });
};

let observerStickyNavSections = new IntersectionObserver(
  callbackStickyNavSections,
  optionsStickyNavSections
);

allSections.forEach((entry) => {
  //Exclude section portfolio
  if (!entry.classList.contains("section-portfolio"))
    observerStickyNavSections.observe(entry);
});

// EVENT LISTENER TO OPEN/CLOSE SCROLL NAV //

btnScrollNav.addEventListener("click", openCloseScrollNav);

let optionsStickyHeaderHero = {
  root: null,
  rootMargin: "-80px",
  threshold: 0,
};

///////////////////////////////////////////////////////////
// FORM SUBMIT //
///////////////////////////////////////////////////////////

const formEl = document.querySelector(".form");
const formAnswerEl = document.querySelector(".form-answer");

formEl.onsubmit = function () {
  //After submit show answer message and hide form
  formEl.classList.add("hide");
  formAnswerEl.classList.remove("hide");
};

///////////////////////////////////////////////////////////
// COOKIEBANNER //
///////////////////////////////////////////////////////////

const containerCookies = document.querySelector(".container-cookies");
const linkCookies = document.querySelector(".link-cookies");
const btnCookies = document.querySelector(".btn--cookies");

const showCookieBanner = function () {
  containerCookies.classList.add("show-cookies");
};

const removeElementsfromTabinex = function () {
  linkCookies.setAttribute("tabindex", -1);
  linkCookies.setAttribute("aria-hidden", true);
  btnCookies.setAttribute("tabindex", -1);
  btnCookies.setAttribute("aria-hidden", true);
};

//Show cookie banner, if not already accepted previously
if (!localStorage.getItem("cookieBannerDisplayed")) {
  setTimeout(showCookieBanner, 5000);
} else {
  //Remove cookie elements from tabindex
  removeElementsfromTabinex();
}

//When accepted -> Hide cookie banner and store accept in local storage
const acceptCookies = function () {
  localStorage.setItem("cookieBannerDisplayed", true);
  containerCookies.classList.remove("show-cookies");
  //Remove cookie elements from tabindex
  removeElementsfromTabinex();
};

///////////////////////////////////////////////////////////
// SMOOTH SCROLLING
///////////////////////////////////////////////////////////

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      const sectionEl = document.querySelector(href);

      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

///////////////////////////////////////////////////////////
// CURRENTYEAR FOR FOOTER //
///////////////////////////////////////////////////////////

const currentYear = new Date().getFullYear();
const currentYearEl = document.querySelector(".current-year");

currentYearEl.textContent = currentYear;
