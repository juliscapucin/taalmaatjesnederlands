import GSAP from "gsap";

import AnimationScroll from "classes/AnimationScroll";

export default class RevealArrow extends AnimationScroll {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    this.animatedIn = true;
    this.timelineIn = GSAP.timeline();
    this.timelineIn
      .set(this.element, { autoAlpha: 1, xPercent: -100 })
      .to(this.element, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "expo.out",
      });
    this.isVisible = true;
  }

  animateOut() {
    // this.animatedIn = false;
    // this.timelineOut = GSAP.timeline();
    // this.timelineOut.fromTo(
    //   this.element,
    //   { autoAlpha: 1, x: 0 },
    //   { autoAlpha: 0, x: 500, duration: 1, ease: "expo.out" }
    // );
  }
  onResize() {}
}
