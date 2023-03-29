const { Quiz } = require("../models");

const quizController = {
  async showQuiz(req, res) {
    // Récupérer un quiz à partir du req.params.id
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [
        "tags", // un quiz a des tags
        "author", // un quiz a un auteur
        {
          association: "questions", // un quiz a des questions
          include: ["answers", "level"] // une question à des réponses et un niveau
        }
      ]
    });


    // je renvoi tout à la vue
    res.render("quiz", { quiz });
  }
};

module.exports = quizController;