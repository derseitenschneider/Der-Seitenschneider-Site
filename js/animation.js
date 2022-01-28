"use strict";

/////////////////////////////////////////////////////////////////////
// VARIABLES //
/////////////////////////////////////////////////////////////////////

const textboxAngebot = document.querySelectorAll(".container-text-angebot");

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
      entry.target.nextElementSibling.classList.add("in-viewport");
    }
  });
};

let optionsAngebot = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};

textboxAngebot.forEach((el) =>
  initiateObserver(callbackAngebot, optionsAngebot, el)
);

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
};

initiateObserver(callbackContact, optionsContact, containerForm);
