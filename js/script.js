"use strict";

/////////////////////////////////////////////////////////////////////
// VARIABLES //
/////////////////////////////////////////////////////////////////////

//Main Components

const headerEL = document.querySelector(".header");

const sectionRightEl = document.querySelector(".section-right");

const sectionHeroEL = document.querySelector(".section-hero");
const sectionAngebotEL = document.querySelector(".section-angebot");
const sectionPortfolioEL = document.querySelector(".section-portfolio");
const sectionSchneiderEL = document.querySelector(".section-schneider");
const sectionKontaktEL = document.querySelector(".section-kontakt");

//Navigation Links
const navLinkAngebot = document.querySelector(".nav-link--angebot");
const navLinkPortfolio = document.querySelector(".nav-link--portfolio");
const navLinkSchneider = document.querySelector(".nav-link--schneider");
const navLinkKontakt = document.querySelector(".nav-link--kontakt");

//Portfolio Gallery
const btnToLeft = document.querySelector(".btn-arrow--left");
const btnToRight = document.querySelector(".btn-arrow--right");

const slideImages = document.querySelectorAll(".slide-img");
const slideDescriptions = document.querySelectorAll(".slide-description");
const btnPortfolioLeft = document.querySelector(".btn-arrow--left");
const btnPortfolioRight = document.querySelector(".btn-arrow--right");

//ARRAYS

//Array Nav Links

const navLinksArr = [
  navLinkAngebot,
  navLinkPortfolio,
  navLinkSchneider,
  navLinkKontakt,
];

/////////////////////////////////////////////////////////////////////
// FUNCTIONS //
/////////////////////////////////////////////////////////////////////

//Intersection Observer

const scrollIntoView = function (element, target, addClass) {
  // const target = targetLink;
  const options = {
    root: null,
    threshold: [0.75],
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinksArr.forEach((entry) => entry.classList.remove(addClass));
        if (!element.classList.contains("section-hero"))
          target.classList.add(addClass);
      }
    });
  }, options);
  observer.observe(element);
};

// scrollIntoView(sectionHeroEL);

scrollIntoView(sectionHeroEL, null, "nav-current");
scrollIntoView(sectionAngebotEL, navLinkAngebot, "nav-current");
scrollIntoView(sectionPortfolioEL, navLinkPortfolio, "nav-current");
scrollIntoView(sectionSchneiderEL, navLinkSchneider, "nav-current");
scrollIntoView(sectionKontaktEL, navLinkKontakt, "nav-current");

//Portfolio Slide

let slideIndex = 1;

const slideDescriptionUpdate = function () {
  slideDescriptions.forEach((element) => element.classList.remove("active"));
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

  //Make Btn-Right inactive when last Slide
  if (slideIndex >= slideImages.length) {
    btnPortfolioRight.classList.add("btn-inactive");
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

  //Make Btn-Left inactive when first slide
  if (slideIndex == 1) {
    btnPortfolioLeft.classList.add("btn-inactive");
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
/////////////////////////////////////////////////////////////////////
// HANDLER //
/////////////////////////////////////////////////////////////////////

// btnToRight.addEventListener("click", function () {
//   currentPortfolio.forEach((el) => el.classList.add("move-left"));
// });
