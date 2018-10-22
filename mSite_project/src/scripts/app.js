import Router from './utils/router.js'
import homeController from "./controllers/home.js";
import categoryController from "./controllers/category/category.js";
import homeContentController from "./controllers/home/home-content.js";
import requirementController from "./controllers/requirement/requirement.js"
import searchController from "./controllers/search/search.js";
import profileController from "./controllers/profile/profile.js";

homeController.render();
localStorage.clear();
const router = new Router()
router.init()
router.route('#home', homeContentController.render)
router.route('#category',categoryController.render)
router.route("#requirement",requirementController.render)
router.route('#search', searchController.render)
router.route('#profile', profileController.render)