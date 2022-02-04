"use strict";

const body = document.querySelector("body");
const headingImpressumEL = document.querySelector(".heading-impressum");
const containerScrollNav = document.querySelector(".container-scroll-nav");
const btnScrollNav = document.querySelector(".btn-scroll-nav");

//Sticky Nav

const openCloseScrollNav = function () {
  body.classList.toggle("scrollnav-open");
};

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

observerStickyHeader.observe(headingImpressumEL);

btnScrollNav.addEventListener("click", openCloseScrollNav);
