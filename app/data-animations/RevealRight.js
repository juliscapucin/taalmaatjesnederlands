import GSAP from "gsap";

import AnimationScroll from "classes/AnimationScroll";

export default class RevealRight extends AnimationScroll {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    this.textDiv = this.element.querySelector(".text");

    this.animatedIn = true;
    this.timelineIn = GSAP.timeline();

    this.timelineIn
      .set(this.element, {
        autoAlpha: 1,
        xPercent: -200,
      })
      .to(this.element, {
        autoAlpha: 1,
        xPercent: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.4,
      });
    if (this.textDiv) {
      this.timelineIn.from(this.textDiv, {
        autoAlpha: 0,
        y: -40,
        duration: 1,
        ease: "expo.out",
      });
    }
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
