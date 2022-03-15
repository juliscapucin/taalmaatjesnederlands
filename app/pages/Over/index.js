import Page from "classes/Page";

export default class Over extends Page {
  constructor() {
    super({
      id: "over",
      element: ".over",
      elements: {
        navigation: document.querySelector(".navigation"),
        wrapper: ".over__wrapper",
      },
    });
  }
}
