import NormalizeWheel from "normalize-wheel";
import each from "lodash/each";

import Detection from "classes/Detection";

import Navigation from "components/Navigation";
import Preloader from "components/Preloader";

import Contact from "pages/Contact";
import Evenementen from "pages/Evenementen";
import Home from "pages/Home";
import Links from "pages/Links";
import Over from "pages/Over";

class App {
  constructor() {
    this.createContent();

    this.createPreloader();
    this.createNavigation();
    this.createPages();

    this.addEventListeners();
    this.addLinkListeners();

    this.update();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }
  createNavigation() {
    this.navigation = new Navigation({
      template: this.template,
    });
  }

  createPages() {
    this.pages = {
      contact: new Contact(),
      evenementen: new Evenementen(),
      home: new Home(),
      links: new Links(),
      over: new Over(),
    };
    this.page = this.pages[this.template];
    this.page.create();
  }
  //*****
  // EVENTS
  //*****
  onPreloaded() {
    this.preloader.destroy();
    this.onResize();
    this.page.show();
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false,
    });
  }

  // POPULATES HTML PAGE ON A FAKE DIV

  // async onChange({ url, push = true }) {
  //   // console.log(url);

  //   // Hide previous page
  //   await this.page.hide();

  //   // Fetch new page
  //   const request = await window.fetch(url);

  //   if (request.status === 200) {
  //     const html = await request.text();
  //     const div = document.createElement("div");

  //     if (push) {
  //       window.history.pushState({}, "", url);
  //     }

  //     div.innerHTML = html;

  //     const divContent = div.querySelector(".content");

  //     this.template = divContent.getAttribute("data-template");

  //     // this.navigation.onChange(this.template)

  //     this.content.setAttribute("data-template", this.template);

  //     this.content.innerHTML = divContent.innerHTML;

  //     this.page = this.pages[this.template];

  //     this.page.create();

  //     this.onResize();

  //     // Show new page
  //     this.page.show();

  //     this.addLinkListeners();
  //   } else {
  //     console.log("Error");
  //   }
  // }

  async onChange({ url, push = false }) {
    if (url.includes("localhost")) {
      push = true;

      // Hide previous page
      await this.page.hide();

      // Fetch new page
      const request = await window.fetch(url);

      if (request.status === 200) {
        const html = await request.text();
        const div = document.createElement("div");

        if (push) {
          window.history.pushState({}, "", url);
        }

        div.innerHTML = html;

        const divContent = div.querySelector(".content");

        this.template = divContent.getAttribute("data-template");

        // this.navigation.onChange(this.template)

        this.content.setAttribute("data-template", this.template);

        this.content.innerHTML = divContent.innerHTML;

        this.page = this.pages[this.template];

        this.page.create();

        this.onResize();

        // Show new page
        this.page.show();

        this.addLinkListeners();
      } else {
        console.log("Error");
      }
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  //*****
  //LISTENERS
  //*****
  addEventListeners() {
    window.addEventListener("popstate", this.onPopState.bind(this));
    window.addEventListener("resize", this.onResize.bind(this));
  }

  //REMOVE DEFAULT ACTIONS FROM LINKS
  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      if (!link.classList.contains("external__link")) {
        link.onclick = (event) => {
          event.preventDefault();
          const { href } = link;
          this.onChange({ url: href });
        };
      }
    });
  }

  //*****
  //SMOOTH SCROLL LOOP
  //*****
  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
}

new App();
