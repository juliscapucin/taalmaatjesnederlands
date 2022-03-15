import GSAP from "gsap";

export default function fadeLogo() {
  const content = document.querySelectorAll(".logo__top, .logo__bottom");
  const tl = GSAP.timeline();

  console.log("Fade Logo");

  tl.fromTo(
    content,
    { autoAlpha: 0, yPercent: 100 },
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.8,
      stagger: 0.3,
      ease: "expo.out",
    }
  );
}
