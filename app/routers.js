const express = require("express");
const adminController = require("./controllers/adminController");
const errorController = require("./controllers/errorController");
const mainController = require("./controllers/mainController");
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const userController = require("./controllers/userController");
const adminMiddleware = require("./middlewares/adminMiddleware");

const router = express.Router();

router.get("/", mainController.homePage);

router.get("/quiz/:id", quizController.showQuiz);

router.get("/tags", tagController.allTags);

router.get("/tag/:id", tagController.showTag);

// ******************* AUTH **************************** //
router.get("/signup", userController.showSignUp);
router.post("/signup", userController.doSignUp);

router.get("/login", userController.showLogin);
router.post("/login", userController.doLogin);

router.get("/logout", userController.doLogOut);


router.get("/admin", adminMiddleware, adminController.showAdmin);

// router.use('/admin/*', adminMiddleware);

// router.get('/admin/users');



router.get("/error/:err", errorController.showError);


module.exports = router;