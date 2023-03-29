const errorController = {
  showError(req, res) {
    res.render("errors/" + req.params.err);
  }
};

module.exports = errorController;