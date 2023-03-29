require("dotenv").config();

const path = require("path");
const express = require("express");
const router = require("./app/routers");
const session = require("express-session");
const userMiddleware = require("./app/middlewares/userMiddleware");

const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static(path.join(__dirname, "./assets")));

// on rajoute à la gestion des POST -> body
app.use(express.urlencoded({ extended: true }));

app.use(session({
  saveUninitialized: true, // Je crée une session vide même si l'utilisateur n'est pas connecté
  resave: true, // Je ré-enregistre les cookies à chaque requête
  secret: process.env.SESSION_SECRET || "Change Me!",
}));

app.use(userMiddleware);

app.use(router);

app.listen(port, _ => {
  console.log(`http://localhost:${port}`);
});
