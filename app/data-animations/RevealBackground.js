import GSAP from "gsap";

import AnimationScroll from "classes/AnimationScroll";

export default class RevealBackground extends AnimationScroll {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    this.animatedIn = true;
    this.timelineIn = GSAP.timeline();
    this.timelineIn.to(this.element, {
      width: "100%",
      duration: 2,
      ease: "expo.out",
      delay: 1,
    });
    this.isVisible = true;
    console.log("oi");
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
