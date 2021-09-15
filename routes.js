const userController = require("./controllers/userController");

module.exports = (app) => {
    app.get("/creat-user-table", userController.creatUserTable);
    app.get("/users", userController.getUser);
    app.get("/users/:id", userController.getUserById);
    app.post("/users", userController.createUser);
    app.post("/login", userController.login);
    app.put("/users/:id", userController.updateUser);
    app.delete("/users/:id", userController.deleteUser);
}