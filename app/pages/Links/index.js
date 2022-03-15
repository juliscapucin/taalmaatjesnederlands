import Page from "classes/Page";

export default class Links extends Page {
  constructor() {
    super({
      id: "links",
      element: ".links",
      elements: {
        navigation: document.querySelector(".navigation"),
        wrapper: ".links__wrapper",
      },
    });
  }
}
