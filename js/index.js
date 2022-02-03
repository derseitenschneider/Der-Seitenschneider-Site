"use strict";

/////////////////////////////////////////////////////////////////////
// VARIABLES //
/////////////////////////////////////////////////////////////////////

//Main Components

const body = document.querySelector("body");

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

//Carousel Heading
const headingCarousel = document.querySelectorAll(".el-carousel");

const slideImages = document.querySelectorAll(".slide-img");
const slideDescriptions = document.querySelectorAll(".slide-description");
const btnPortfolioLeft = document.querySelector(".btn-arrow--left");
const btnPortfolioRight = document.querySelector(".btn-arrow--right");

//Cookies

const containerCookies = document.querySelector(".container-cookies");
const wrapperCookiesOne = document.querySelector(".wrapper-cookies--one");
const wrapperCookiesTwo = document.querySelector(".wrapper-cookies--two");
//BUTTONS

//Btns scroll-nav
const btnScrollNav = document.querySelector(".btn-scroll-nav");
const containerScrollNav = document.querySelector(".container-scroll-nav");

//Btns portfolio gallery
const btnToLeft = document.querySelector(".btn-arrow--left");
const btnToRight = document.querySelector(".btn-arrow--right");

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

//Open and close scroll-nav

const openCloseScrollNav = function () {
  body.classList.toggle("scrollnav-open");
};

//CAROUSEL HEADING

const hideRotationElement = function (element) {
  element.classList.remove("active");
  element.classList.add("previous");
};

const showRotationElement = function (element) {
  element.classList.add("active");
};

let i = 0;

const rotationLoop = function () {
  setTimeout(function () {
    hideRotationElement(headingCarousel[i]);
    i++;
    showRotationElement(headingCarousel[i]);
    if (i < headingCarousel.length - 1) rotationLoop();
  }, 2000);
};

rotationLoop();

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
  btnPortfolioLeft.removeAttribute("tabindex");

  //Make Btn-Right inactive when last Slide
  if (slideIndex >= slideImages.length) {
    btnPortfolioRight.classList.add("btn-inactive");
    btnPortfolioRight.setAttribute("tabindex", -1);
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

//Sticky Nav

const addStickyHeader = function () {
  body.classList.add("sticky");
};

const removeStickyHeader = function () {
  body.classList.remove("sticky");
};

let optionsStickyHeader = {
  root: null,
  rootMargin: "-80px",
  threshold: 0,
};

const callbackStickyHeader = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      containerScrollNav.removeAttribute("tabindex");
      btnScrollNav.removeAttribute("tabindex");
      addStickyHeader();
    }

    if (entry.isIntersecting) {
      containerScrollNav.setAttribute("tabindex", -1);
      btnScrollNav.setAttribute("tabindex", -1);
      body.classList.remove("scrollnav-open");
      setTimeout(removeStickyHeader, 650);
    }
  });
};

let observerStickyHeader = new IntersectionObserver(
  callbackStickyHeader,
  optionsStickyHeader
);

observerStickyHeader.observe(sectionHeroEL);

//Show Cookiebanner

const showCookieBanner = function () {
  containerCookies.classList.add("show-cookies");
};

if (!localStorage.getItem("cookieBannerDisplayed")) {
  setTimeout(showCookieBanner, 5000);
}

//Cookies accepted
const acceptCookies = function () {
  localStorage.setItem("cookieBannerDisplayed", true);
  containerCookies.classList.remove("show-cookies");
};

/////////////////////////////////////////////////////////////////////
// HANDLER //
/////////////////////////////////////////////////////////////////////

//Btn scroll nav

btnScrollNav.addEventListener("click", openCloseScrollNav);
