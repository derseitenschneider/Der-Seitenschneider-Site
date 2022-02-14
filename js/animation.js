"use strict";

/////////////////////////////////////////////////////////////////////
// BASIC OBSERVER FUNCTION //
/////////////////////////////////////////////////////////////////////

const initiateObserver = function (callback, options, obsEl) {
  let observer = new IntersectionObserver(callback, options);

  observer.observe(obsEl);
};

/////////////////////////////////////////////////////////////////////
// BASIC SCROLL FADE IN ANIMATION //
/////////////////////////////////////////////////////////////////////

//LIST OF ELEMENTS TO FADE IN ON SCROLL

//Single elements
const elementsToLoad = new Set([
  document.querySelector(".container-portfolio--right"),

  document.querySelector(".container-form"),

  document.querySelector(".heading-cards"),
]);

// Element groups
document
  .querySelectorAll(".heading-secondary")
  .forEach((entry) => elementsToLoad.add(entry));

document
  .querySelectorAll(".container-text-angebot")
  .forEach((entry) => elementsToLoad.add(entry));

document
  .querySelectorAll(".svg-angebot")
  .forEach((entry) => elementsToLoad.add(entry));
document
  .querySelectorAll(".cards")
  .forEach((entry) => elementsToLoad.add(entry));

document
  .querySelectorAll(".text-schneider")
  .forEach((entry) => elementsToLoad.add(entry));

elementsToLoad.forEach((entry) => entry.classList.add("loadin"));

//INTERSECTION OBSERVER FOR BASIC SCROLL FADE IN ANIMATION
const callbackLoading = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded");
    }
  });
};

let optionsLoading = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

elementsToLoad.forEach((entry) =>
  initiateObserver(callbackLoading, optionsLoading, entry)
);

/////////////////////////////////////////////////////////////////////
// ANIMATION SECTION ANGEBOT //
/////////////////////////////////////////////////////////////////////

const svgAngebot = document.querySelectorAll(".svg-angebot");
const svgDesign = document.querySelector(".svg-angebot--design");
const iconRocket = document.querySelector(".icon-angebot--rocket");

// Roll in icon background
const callbackAngebot = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-viewport");
    }
  });
};

let optionsAngebot = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

svgAngebot.forEach((el) =>
  initiateObserver(callbackAngebot, optionsAngebot, el)
);

//Rocket fly on hover

const rocketFly = function () {
  iconRocket.classList.add("rocket-fly");
};

svgDesign.addEventListener("mouseover", rocketFly);

//Rocket land when icon left the viewport
const rocketLand = function () {
  iconRocket.classList.remove("rocket-fly");
};

const callbackRocketLand = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      rocketLand();
    }
  });
};

let optionsRocketLand = { root: null, rootMargin: "0px", threshold: 0 };

initiateObserver(callbackRocketLand, optionsRocketLand, svgDesign);

/////////////////////////////////////////////////////////////////////
// ANIMATION SECTION SCHNEIDER //
/////////////////////////////////////////////////////////////////////

const sectionSchneider = document.querySelector(".section-schneider");
const imgBoxSchneider = document.querySelector(".img-box-schneider");

const callbackSchneider = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sectionSchneider.classList.add("slide-schneider");
    }
  });
};

let optionsSchneider = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};

initiateObserver(callbackSchneider, optionsSchneider, imgBoxSchneider);

/////////////////////////////////////////////////////////////////////
// ANIMATION SECTION CONTACT //
/////////////////////////////////////////////////////////////////////

const sectionContact = document.querySelector(".section-contact");
const containerForm = document.querySelector(".container-form");

const callbackContact = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sectionContact.classList.add("slide-contact");
    }
  });
};

let optionsContact = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,

  checkScreensize() {
    if (window.innerWidth < 976) {
      // this.threshold = 2;
      this.rootMargin = "150px 0px -150px 0px";
    }
  },
};

optionsContact.checkScreensize();

initiateObserver(callbackContact, optionsContact, containerForm);
