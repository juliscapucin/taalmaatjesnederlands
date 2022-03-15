import GSAP from "gsap";

import AnimationScroll from "classes/AnimationScroll";
import { takeWhile } from "lodash";

export default class RevealHome extends AnimationScroll {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    this.bgDiv = this.element.parentNode.parentNode.querySelector(".bg");
    this.arrowDiv = this.element.parentNode.parentNode.querySelector(".arrow");
    this.titleDiv = this.element;
    this.textDiv = this.element.parentNode.querySelector(".text");

    // console.log(this.titleDiv);
    // console.log(this.textDiv);
    // console.log(this.bgDiv);
    // console.log(this.arrowDiv);

    this.animatedIn = true;
    this.timelineIn = GSAP.timeline();
    this.timelineIn
      .set(this.titleDiv, {
        autoAlpha: 0,
        y: -20,
      })
      .set(
        this.textDiv,
        {
          autoAlpha: 0,
          y: -40,
        },
        0
      )
      .set(
        this.arrowDiv,
        {
          autoAlpha: 1,
          xPercent: -200,
        },
        0
      )
      .to(this.bgDiv, {
        x: 0,
        duration: 2,
        ease: "expo.out",
      })
      .to(
        this.arrowDiv,
        {
          xPercent: 0,
          duration: 1,
          ease: "expo.out",
        },
        "-=1.8"
      )
      .to(
        this.titleDiv,
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: "expo.out",
        },
        "-=1"
      )
      .to(
        this.textDiv,
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: "expo.out",
          delay: 0.1,
        },
        "<"
      );
    this.isVisible = true;
  }

  animateOut() {
    this.animatedIn = false;

    // this.titleDiv = this.element;
    // this.textDiv = this.element.parentNode.querySelector(".text");

    // this.timelineOut = GSAP.timeline();
    // this.timelineOut.fromTo(
    //   [this.titleDiv, this.textDiv],
    //   { autoAlpha: 1, yPercent: 0 },
    //   { autoAlpha: 0, yPercent: -100, duration: 1, ease: "expo.out" }
    // );
  }
  onResize() {}
}
