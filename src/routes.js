const UserController = require("./controllers/UserController")

const userService = new UserController()

module.exports = [
    {
        endpoint: "/users",
        method: "GET",
        handler: userService.listUsers
    },
    {
        endpoint: "/users/:id",
        method: "GET",
        handler: userService.getUserById
    },
    {
        endpoint: "/users",
        method: "POST",
        handler: userService.createUser
    },
    {
        endpoint: "/users/:id",
        method: "PUT",
        handler: userService.updateUser
    },
    {
        endpoint: "/users/:id",
        method: "DELETE",
        handler: userService.deleteUser
    }
]