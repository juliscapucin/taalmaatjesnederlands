import GSAP from "gsap";
import each from "lodash/each";

export default function ArrowMouseover() {
  //select Latest Work items
  const arrow = document.querySelectorAll(".arrow");

  arrow.forEach((arrowItem) => {
    arrowItem.addEventListener("mouseenter", (event) => {
      let targetLink = event.target;

      GSAP.to(targetLink, {
        autoAlpha: 0.5,
        duration: 1,
        ease: "expo.out",
      });
    });

    arrowItem.addEventListener("mouseleave", (event) => {
      let targetLink = event.target;

      GSAP.to(targetLink, {
        autoAlpha: 1,
        duration: 1,
        ease: "expo.out",
      });
    });
  });
}
