import GSAP from "gsap";

import AnimationScroll from "classes/AnimationScroll";

export default class RevealSecondary extends AnimationScroll {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    this.bgDiv = this.element.parentNode;
    this.textDiv = this.element.parentNode.getElementsByClassName("text");

    this.animatedIn = true;
    this.timelineIn = GSAP.timeline();

    this.timelineIn
      .set(this.bgDiv, {
        xPercent: -200,
        autoAlpha: 1,
      })
      .to(this.bgDiv, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.2,
      })
      .from(
        this.element,
        {
          autoAlpha: 0,
          y: -20,
          duration: 2,
          ease: "expo.out",
        },
        "-=.1"
      );
    if (this.textDiv) {
      this.timelineIn.from(
        this.textDiv,
        {
          autoAlpha: 0,
          y: -40,
          duration: 2,
          ease: "expo.out",
          delay: 0.1,
        },
        "<"
      );
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
