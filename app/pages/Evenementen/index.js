import Page from "classes/Page";

export default class Evenementen extends Page {
  constructor() {
    super({
      id: "evenementen",
      element: ".evenementen",
      elements: {
        navigation: document.querySelector(".navigation"),
        wrapper: ".evenementen__wrapper",
      },
    });
  }
}
