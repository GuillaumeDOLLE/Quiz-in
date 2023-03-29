const { Quiz } = require("../models");

const mainController = {

  async homePage(req, res) {
    const quizzes = await Quiz.findAll({
      include: ["author"]
    });
    res.render("home", { quizzes });
  }

};

module.exports = mainController;