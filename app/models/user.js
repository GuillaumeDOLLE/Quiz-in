const Sequelize = require("sequelize");
const sequelize = require("../database");

class User extends Sequelize.Model {

  get fullname() {
    return this.firstname + " " + this.lastname;
  }

}

User.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notNull: true
    },
    unique: true
  },
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  role: Sequelize.TEXT,
}, {
  sequelize,
  tableName: "user"
});


module.exports = User;