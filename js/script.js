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

const currentPortfolio = document.querySelectorAll(".current");

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

/////////////////////////////////////////////////////////////////////
// HANDLER //
/////////////////////////////////////////////////////////////////////

btnToRight.addEventListener("click", function () {
  currentPortfolio.forEach((el) => el.classList.add("move-left"));
});
