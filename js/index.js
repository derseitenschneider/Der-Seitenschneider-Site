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
  element.setAttribute("aria-hidden", true);
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
  rootMargin: "50px",
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

///////////////////////////////////////////////////////////
// CHECK FLEXGAP IN SAFARI //
///////////////////////////////////////////////////////////

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

checkFlexGap();

///////////////////////////////////////////////////////////
// SMOOTH SCROLL POLYFILL //
///////////////////////////////////////////////////////////

!(function () {
  "use strict";
  function o() {
    var o = window,
      t = document;
    if (
      !(
        "scrollBehavior" in t.documentElement.style &&
        !0 !== o.__forceSmoothScrollPolyfill__
      )
    ) {
      var l,
        e = o.HTMLElement || o.Element,
        r = 468,
        i = {
          scroll: o.scroll || o.scrollTo,
          scrollBy: o.scrollBy,
          elementScroll: e.prototype.scroll || n,
          scrollIntoView: e.prototype.scrollIntoView,
        },
        s =
          o.performance && o.performance.now
            ? o.performance.now.bind(o.performance)
            : Date.now,
        c =
          ((l = o.navigator.userAgent),
          new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l) ? 1 : 0);
      (o.scroll = o.scrollTo =
        function () {
          void 0 !== arguments[0] &&
            (!0 !== f(arguments[0])
              ? h.call(
                  o,
                  t.body,
                  void 0 !== arguments[0].left
                    ? ~~arguments[0].left
                    : o.scrollX || o.pageXOffset,
                  void 0 !== arguments[0].top
                    ? ~~arguments[0].top
                    : o.scrollY || o.pageYOffset
                )
              : i.scroll.call(
                  o,
                  void 0 !== arguments[0].left
                    ? arguments[0].left
                    : "object" != typeof arguments[0]
                    ? arguments[0]
                    : o.scrollX || o.pageXOffset,
                  void 0 !== arguments[0].top
                    ? arguments[0].top
                    : void 0 !== arguments[1]
                    ? arguments[1]
                    : o.scrollY || o.pageYOffset
                ));
        }),
        (o.scrollBy = function () {
          void 0 !== arguments[0] &&
            (f(arguments[0])
              ? i.scrollBy.call(
                  o,
                  void 0 !== arguments[0].left
                    ? arguments[0].left
                    : "object" != typeof arguments[0]
                    ? arguments[0]
                    : 0,
                  void 0 !== arguments[0].top
                    ? arguments[0].top
                    : void 0 !== arguments[1]
                    ? arguments[1]
                    : 0
                )
              : h.call(
                  o,
                  t.body,
                  ~~arguments[0].left + (o.scrollX || o.pageXOffset),
                  ~~arguments[0].top + (o.scrollY || o.pageYOffset)
                ));
        }),
        (e.prototype.scroll = e.prototype.scrollTo =
          function () {
            if (void 0 !== arguments[0])
              if (!0 !== f(arguments[0])) {
                var o = arguments[0].left,
                  t = arguments[0].top;
                h.call(
                  this,
                  this,
                  void 0 === o ? this.scrollLeft : ~~o,
                  void 0 === t ? this.scrollTop : ~~t
                );
              } else {
                if ("number" == typeof arguments[0] && void 0 === arguments[1])
                  throw new SyntaxError("Value could not be converted");
                i.elementScroll.call(
                  this,
                  void 0 !== arguments[0].left
                    ? ~~arguments[0].left
                    : "object" != typeof arguments[0]
                    ? ~~arguments[0]
                    : this.scrollLeft,
                  void 0 !== arguments[0].top
                    ? ~~arguments[0].top
                    : void 0 !== arguments[1]
                    ? ~~arguments[1]
                    : this.scrollTop
                );
              }
          }),
        (e.prototype.scrollBy = function () {
          void 0 !== arguments[0] &&
            (!0 !== f(arguments[0])
              ? this.scroll({
                  left: ~~arguments[0].left + this.scrollLeft,
                  top: ~~arguments[0].top + this.scrollTop,
                  behavior: arguments[0].behavior,
                })
              : i.elementScroll.call(
                  this,
                  void 0 !== arguments[0].left
                    ? ~~arguments[0].left + this.scrollLeft
                    : ~~arguments[0] + this.scrollLeft,
                  void 0 !== arguments[0].top
                    ? ~~arguments[0].top + this.scrollTop
                    : ~~arguments[1] + this.scrollTop
                ));
        }),
        (e.prototype.scrollIntoView = function () {
          if (!0 !== f(arguments[0])) {
            var l = (function (o) {
                for (
                  ;
                  o !== t.body &&
                  !1 ===
                    ((e = p((l = o), "Y") && a(l, "Y")),
                    (r = p(l, "X") && a(l, "X")),
                    e || r);

                )
                  o = o.parentNode || o.host;
                var l, e, r;
                return o;
              })(this),
              e = l.getBoundingClientRect(),
              r = this.getBoundingClientRect();
            l !== t.body
              ? (h.call(
                  this,
                  l,
                  l.scrollLeft + r.left - e.left,
                  l.scrollTop + r.top - e.top
                ),
                "fixed" !== o.getComputedStyle(l).position &&
                  o.scrollBy({ left: e.left, top: e.top, behavior: "smooth" }))
              : o.scrollBy({ left: r.left, top: r.top, behavior: "smooth" });
          } else
            i.scrollIntoView.call(
              this,
              void 0 === arguments[0] || arguments[0]
            );
        });
    }
    function n(o, t) {
      (this.scrollLeft = o), (this.scrollTop = t);
    }
    function f(o) {
      if (
        null === o ||
        "object" != typeof o ||
        void 0 === o.behavior ||
        "auto" === o.behavior ||
        "instant" === o.behavior
      )
        return !0;
      if ("object" == typeof o && "smooth" === o.behavior) return !1;
      throw new TypeError(
        "behavior member of ScrollOptions " +
          o.behavior +
          " is not a valid value for enumeration ScrollBehavior."
      );
    }
    function p(o, t) {
      return "Y" === t
        ? o.clientHeight + c < o.scrollHeight
        : "X" === t
        ? o.clientWidth + c < o.scrollWidth
        : void 0;
    }
    function a(t, l) {
      var e = o.getComputedStyle(t, null)["overflow" + l];
      return "auto" === e || "scroll" === e;
    }
    function d(t) {
      var l,
        e,
        i,
        c,
        n = (s() - t.startTime) / r;
      (c = n = n > 1 ? 1 : n),
        (l = 0.5 * (1 - Math.cos(Math.PI * c))),
        (e = t.startX + (t.x - t.startX) * l),
        (i = t.startY + (t.y - t.startY) * l),
        t.method.call(t.scrollable, e, i),
        (e === t.x && i === t.y) || o.requestAnimationFrame(d.bind(o, t));
    }
    function h(l, e, r) {
      var c,
        f,
        p,
        a,
        h = s();
      l === t.body
        ? ((c = o),
          (f = o.scrollX || o.pageXOffset),
          (p = o.scrollY || o.pageYOffset),
          (a = i.scroll))
        : ((c = l), (f = l.scrollLeft), (p = l.scrollTop), (a = n)),
        d({
          scrollable: c,
          method: a,
          startTime: h,
          startX: f,
          startY: p,
          x: e,
          y: r,
        });
    }
  }
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = { polyfill: o })
    : o();
})();
