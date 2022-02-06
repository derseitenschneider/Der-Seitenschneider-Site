"use strict";

/////////////////////////////////////////////////////////////////////
// VARIABLES //
/////////////////////////////////////////////////////////////////////

const svgAngebot = document.querySelectorAll(".svg-angebot");

const svgDesign = document.querySelector(".svg-angebot--design");
const svgSupport = document.querySelector(".svg-angebot--support");
const svgInhalt = document.querySelector(".svg-angebot--inhalt");
const iconRocket = document.querySelector(".icon-angebot--rocket");

const sectionSchneider = document.querySelector(".section-schneider");
const textboxSchneider = document.querySelector(".textbox-schneider");

const sectionContact = document.querySelector(".section-contact");
const containerForm = document.querySelector(".container-form");

/////////////////////////////////////////////////////////////////////
// Functions //
/////////////////////////////////////////////////////////////////////

//Basic Observer Function
const initiateObserver = function (callback, options, obsEl) {
  let observer = new IntersectionObserver(callback, options);

  observer.observe(obsEl);
};

///////////////////////////////////////////////////////////////
//Load Fade
const elementsToLoad = new Set([
  document.querySelector(".container-portfolio--right"),
  document.querySelector(".container-header--portfolio"),
  document.querySelector(".heading-angebot"),
  document.querySelector(".container-text--design"),
  document.querySelector(".container-text--support"),
  document.querySelector(".container-text--inhalt"),
  document.querySelector(".heading-schneider"),
  document.querySelector(".heading-cards"),
  document.querySelector(".container-cards"),
  document.querySelector(".heading-contact"),
]);

elementsToLoad.forEach((entry) => entry.classList.add("loadin"));

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

///////////////////////////////////////////////////////////////
//Animation Angebot

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

//Rocket fly

const rocketFly = function () {
  iconRocket.classList.add("rocket-fly");

  // setTimeout(function () {
  //   iconRocket.classList.remove("rocket-fly");
  // }, 5000);
};

//Rocket land
const rocketLand = function () {
  iconRocket.classList.remove("rocket-fly");
};
//On hover
svgDesign.addEventListener("mouseover", rocketFly);

//On scroll fly

// const callbackRocketFly = function (entries) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       setTimeout(rocketFly, 5000);
//     }
//   });
// };

// let optionsRocketFly = {
//   root: null,
//   rootMargin: " 0px",
//   threshold: 1,
// };

// initiateObserver(callbackRocketFly, optionsRocketFly, svgDesign);

// On sroll land

const callbackRocketLand = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      rocketLand();
    }
  });
};

let optionsRocketLand = { root: null, rootMargin: "0px", threshold: 0 };

initiateObserver(callbackRocketLand, optionsRocketLand, svgDesign);

///////////////////////////////////////////////////////////////
//Animation Schneider

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
  threshold: 0.5,
};

initiateObserver(callbackSchneider, optionsSchneider, textboxSchneider);

///////////////////////////////////////////////////////////////
//Animation Contact

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
      this.rootMargin = "350px 0px -350px 0px";
    }
  },
};

optionsContact.checkScreensize();

initiateObserver(callbackContact, optionsContact, containerForm);
