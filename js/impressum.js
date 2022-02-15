"use strict";

///////////////////////////////////////////////////////////
// STICKY SCROLL NAV //
///////////////////////////////////////////////////////////

// VARIABLES //

const body = document.querySelector("body");
const headingImpressumEL = document.querySelector(".heading-impressum");
const btnScrollNav = document.querySelector(".btn-scroll-nav");
const containerScrollNav = document.querySelector(".container-scroll-nav");

// FUNCTIONS //

const addStickyHeader = function () {
  body.classList.add("sticky");
};

const removeStickyHeader = function () {
  body.classList.remove("sticky");
};

const openCloseScrollNav = function () {
  body.classList.toggle("scrollnav-open");
};

// INTERSECTION OBSERVER SCROLL NAV BTN //

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

observerStickyHeader.observe(headingImpressumEL);

// EVENT LISTENER TO OPEN/CLOSE SCROLL NAV //

btnScrollNav.addEventListener("click", openCloseScrollNav);

///////////////////////////////////////////////////////////
// CURRENTYEAR FOR FOOTER //
///////////////////////////////////////////////////////////

const currentYear = new Date().getFullYear();
const currentYearEl = document.querySelector(".current-year");

currentYearEl.textContent = currentYear;
