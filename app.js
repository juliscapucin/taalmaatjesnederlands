require("dotenv").config();

const logger = require("morgan");
const express = require("express");
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const UAParser = require("ua-parser-js");

const app = express();
const path = require("path");
const port = 2200;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(errorHandler());

//serve scss styles
app.use(express.static(path.join(__dirname, "public")));

const Prismic = require("@prismicio/client");
const PrismicDOM = require("@prismicio/helpers");

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });
};

// Link Resolver
const handleLinkResolver = (doc) => {
  // return doc.uid;
  if (doc.uid) {
    return doc.uid;
  }

  // Define the url depending on the document type
  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid
  // }
  // else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid
  // }

  // Default to homepage
  // return '/'
};

// Middleware to inject prismic context
app.use((req, res, next) => {
  // res.locals.ctx = {
  //   endpoint: process.env.PRISMIC_ENDPOINT,
  //   linkResolver: handleLinkResolver,
  // }
  const ua = UAParser(req.headers["user-agent"]);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isPhone = ua.device.type === "mobile";
  res.locals.isTablet = ua.device.type === "tablet";

  res.locals.Link = handleLinkResolver;

  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// ITEMS THAT SHOW IN ALL PAGES
const handleRequest = async (api) => {
  const meta = await api.getSingle("meta");
  const navigation = await api.getSingle("navigation");
  const navigationHome = await api.getSingle("navigation_home");
  const preloader = await api.getSingle("preloader");

  return {
    meta,
    navigation,
    navigationHome,
    preloader,
  };
};

// ROUTES

app.get("/", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const home = await api.getSingle("home");

  res.render("pages/home", { ...defaults, home });
});

app.get("/over", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const over = await api.getSingle("over");

  res.render("pages/over", { ...defaults, over });
});

app.get("/contact", async (req, res) => {
  const api = await initApi(req);
  const contact = await api.getSingle("contact");
  const defaults = await handleRequest(api);

  res.render("pages/contact", { contact, ...defaults });
});

app.get("/links", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const links = await api.getSingle("links");

  res.render("pages/links", { ...defaults, links });
});

app.get("/evenementen", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const evenementen = await api.getSingle("evenementen");

  res.render("pages/evenementen", { ...defaults, evenementen });
});

app.listen(port, () => {
  console.log(`Taalmaatjes App listening at http://localhost:${port}`);
});
