import GSAP from "gsap";
import NormalizeWheel from "normalize-wheel";
import each from "lodash/each";
import map from "lodash/map";
import Prefix from "prefix";

// Components
import burgerMenu from "components/BurgerMenu";

// Loose animations
// import arrowMouseover from "animations/ArrowMouseover";
import FadeLogo from "animations/FadeLogo";

// Data animations
import RevealHome from "data-animations/RevealHome";
import RevealSecondary from "data-animations/RevealSecondary";
import RevealArrow from "data-animations/RevealArrow";
import RevealLeft from "data-animations/RevealLeft";
import RevealRight from "data-animations/RevealRight";

import AsyncLoad from "classes/AsyncLoad";
import { forEach } from "lodash";

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = {
      ...elements,

      animationsRevealHome: '[data-animation="reveal-home"]',
      animationsRevealSecondary: '[data-animation="reveal-secondary"]',
      animationsRevealArrow: '[data-animation="reveal-arrow"]',
      animationsRevealLeft: '[data-animation="reveal-left"]',
      animationsRevealRight: '[data-animation="reveal-right"]',

      imgSource: "[data-src]",
    };
    this.id = id;

    this.transformPrefix = Prefix("transform");

    this.onMouseWheelEvent = this.onMouseWheel.bind(this);
  }

  create() {
    // this.element = document.querySelector(this.selectors.element)
    this.element = document.querySelector(this.selector);

    this.elements = {};

    // console.log(this.elements);

    this.scroll = {
      ease: 0.07,
      position: 0,
      current: 0,
      target: 0,
      limit: 0,
    };

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });
    this.createAnimations();
    this.createAsyncLoad();
  }

  createAsyncLoad() {
    this.elements.imgSource = map(this.elements.imgSource, (element) => {
      return new AsyncLoad({ element });
    });
  }

  createAnimations() {
    this.animations = [];

    /**********************
     * Reveal Home
     **********************/

    this.animationsRevealHome = map(
      this.elements.animationsRevealHome,
      (element) => {
        return new RevealHome({ element });
      }
    );
    this.animations.push(...this.animationsRevealHome);

    /**********************
     * Reveal Secondary
     **********************/

    this.animationsRevealSecondary = map(
      this.elements.animationsRevealSecondary,
      (element) => {
        return new RevealSecondary({ element });
      }
    );
    this.animations.push(...this.animationsRevealSecondary);

    /**********************
     * Reveal Arrow
     **********************/

    this.animationsRevealArrow = map(
      this.elements.animationsRevealArrow,
      (element) => {
        return new RevealArrow({ element });
      }
    );
    this.animations.push(...this.animationsRevealArrow);

    /**********************
     * Reveal Left
     **********************/

    this.animationsRevealLeft = map(
      this.elements.animationsRevealLeft,
      (element) => {
        return new RevealLeft({ element });
      }
    );
    this.animations.push(...this.animationsRevealLeft);

    /**********************
     * Reveal Right
     **********************/

    this.animationsRevealRight = map(
      this.elements.animationsRevealRight,
      (element) => {
        return new RevealRight({ element });
      }
    );
    this.animations.push(...this.animationsRevealRight);
  }

  show() {
    return new Promise((resolve) => {
      burgerMenu();
      // this.element.parentNode.scrollTo(0, 0);

      // Define clicked link in menu
      const findPage = this.element.parentNode.getAttribute("data-template");
      // console.log(findPage)

      // Breadcrumbs in NavBar
      const navBar = document.querySelector(".navigation__wrapper");
      const buttonHome = navBar.querySelector(".Home");
      const buttonEvenementen = navBar.querySelector(".Evenementen");
      const buttonOver = navBar.querySelector(".Over");
      const buttonContact = navBar.querySelector(".Contact");
      const buttonLinks = navBar.querySelector(".Links");

      const allButtons = document.querySelectorAll(".navigation__item__link");

      function removeBreadcrumb() {
        allButtons.forEach((button) => {
          button.id = "";
        });
        if (buttonHome.classList.contains("invisible")) {
          buttonHome.classList.remove("invisible");
        }
      }

      function addBreadcrumb(button) {
        if (button.id != "breadcrumb") {
          button.id = "breadcrumb";
        }
      }

      removeBreadcrumb();

      // Home animations
      if (findPage === "home") {
        // arrowMouseover();
        FadeLogo();
        if (!buttonHome.classList.contains("invisible")) {
          buttonHome.classList.add("invisible");
        }
        // Over animations
      } else if (findPage === "over") {
        addBreadcrumb(buttonOver);
        // Secondary animations
      } else if (findPage === "evenementen") {
        addBreadcrumb(buttonEvenementen);
        // Contact animations
      } else if (findPage === "contact") {
        addBreadcrumb(buttonContact);
        // Links animations
      } else if (findPage === "links") {
        addBreadcrumb(buttonLinks);
      }

      // Full page fade in

      // this.animationIn = GSAP.timeline();
      // this.animationIn.set(
      //   this.element,
      //   {
      //     autoAlpha: 0,
      //   },
      //   0
      // );

      // this.animationIn.to(
      //   this.element,
      //   {
      //     //
      //     autoAlpha: 1,
      //     duration: 1,
      //     ease: "Power1.easeInOut",
      //   },
      //   0
      // );

      // this.animationIn.call((_) => {
      //   // add event listeners (scroll) after animationIn is finished
      //   this.addEventListeners();
      //   resolve();
      // });

      this.addEventListeners();
    });
  }

  hide() {
    return new Promise((resolve) => {
      // remove event listeners (scroll) before animationOut starts
      this.removeEventListeners();
      this.animationOut = GSAP.timeline();

      this.animationOut.to(this.element, {
        // clipPath: "circle(50px at 1% 1%)",
        autoAlpha: 0,
        duration: 0.8,
        ease: "Power1.easeInOut",
        onComplete: resolve,
      });
    });
  }

  onMouseWheel(event) {
    const { pixelY } = NormalizeWheel(event);
    this.scroll.target += pixelY;
  }

  // Sets limits for the smooth scroll
  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight;
    }
    // each(this.animations, (animation) => animation.onResize())
  }

  update() {
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );
    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );
    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }
    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }

  addEventListeners() {
    window.addEventListener("mousewheel", this.onMouseWheelEvent);
  }
  removeEventListeners() {
    window.removeEventListener("mousewheel", this.onMouseWheelEvent);
  }
}
