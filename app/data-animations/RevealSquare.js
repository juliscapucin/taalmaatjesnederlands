import GSAP from "gsap";

import AnimationScroll from "classes/AnimationScroll";

export default class RevealSquare extends AnimationScroll {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    const titleDiv = document.querySelectorAll(".title");

    this.animatedIn = true;
    this.timelineIn = GSAP.timeline();
    this.to(titleDiv, {
      autoAlpha: 1,
      x: 0,
      duration: 4,
      ease: "expo.out",
      delay: 2,
    });
    this.isVisible = true;
  }

  animateOut() {
    this.animatedIn = true;
    // this.animatedIn = false;
    // this.timelineOut = GSAP.timeline();
    // this.timelineOut.fromTo(
    //   this.element,
    //   { autoAlpha: 1, y: 0 },
    //   { autoAlpha: 0, y: 40, duration: 2, ease: "expo.out" }
    // );
  }
  onResize() {}
}
