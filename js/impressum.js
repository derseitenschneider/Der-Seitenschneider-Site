"use strict";

const body = document.querySelector("body");
const headingImpressumEL = document.querySelector(".heading-impressum");

const addStickyHeader = function () {
  body.classList.add("sticky");
};

const removeStickyHeader = function () {
  body.classList.remove("sticky");
};

let optionsImpressum = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

let observerHeadingImpressum = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      addStickyHeader();
    }

    if (entry.isIntersecting) {
      removeStickyHeader();
    }
  });
}, optionsImpressum);

observerHeadingImpressum.observe(headingImpressumEL);
