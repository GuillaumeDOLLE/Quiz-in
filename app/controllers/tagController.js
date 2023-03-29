const { Tag } = require("../models");

const tagController = {
  async allTags(req, res) {
    const tags = await Tag.findAll();

    res.render("tags", { tags });
  },


  async showTag(req, res) {

    // Récupérer le tag avec les quizs
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          association: "quizList",
          include: ["author"]
        }
      ]
    });

    res.render("tag", { tag });
  }
};

module.exports = tagController;