
const bcrypt = require("bcrypt");

const { User } = require("../models");
const userController = {
  // afficher le formulaire d'inscription
  showSignUp(req, res) {
    res.render("signup", {error: ""});
  },
  // traiter le formulaire d'inscription,
  async doSignUp(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm
    } = req.body;

    const checkUser = await User.findOne({
      where: { email }
    });

    // on vérifie si le user existe déjà, en checkant l'email puisqu'il doit etre unique
    if (checkUser) {
      return res.render("signup", { error: `L'adresse email "${email}" est déjà utilisée`});
    }

    // on vérifie si la confirmation du mot de passe correspond avec le mot de passe
    if (passwordConfirm !== password) {
      return res.render("signup", { error: "Veuillez confirmer le bon mot de passe"});
    }
    console.log(password);
    // on va hash le mot de passe pour ne pas pouvoir le récupérer en bdd
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    await User.create({
      firstname,
      lastname,
      email,
      password: hash
    });
    res.redirect("/login");

  },
  // d'afficher le formulaire de connexion
  showLogin (req, res) {
    // ça ne sert à rien d'afficher le login si on est déjà connecté
    if (req.session.user) {
      return res.redirect("/");
    }

    res.render("login");
  },
  // se connecter
  async doLogin(req, res) {
    if (req.session.user) {
      return res.redirect("/");
    }

    // ETAPE 1 : Tenter de récupérer l'utilisateur en fonction de l'email donnée

    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    // DEUX Possibilités

    // ETAPE 2: USER TROUVE
    if (user) {
      //      -> VERIF MDP
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        //              SI MDP OK
        //                 ON STOCK LE USER DANS LA SESSION
        req.session.user = user;
        delete req.session.user.password;

        res.redirect("/");

      } else {//              SINON -> ON RENVOIT SE BALADER
        res.redirect("/login?error=wrongUserOrPwd");
      }
    } else {
      // USER PAS TROUVE
      //      -> ON RENVOIT BALADER
      res.redirect("/login?error=wrongUserOrPwd");
    }

  },
  doLogOut(req, res) {
    delete req.session.user;

    res.redirect("/login");
  }

};

module.exports = userController;