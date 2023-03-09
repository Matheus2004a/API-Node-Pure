let users = require("../../mocks/users")

class UserController {
    listUsers(request, response) {
        const { order } = request.query

        if (users.length <= 0) {
            return response.send(404, { message: "No user registered" })
        }

        const sortedUsers = users.sort((a, b) => {
            if (order === "desc") return a.id < b.id ? 1 : -1

            return a.id > b.id ? 1 : -1
        })

        response.send(200, sortedUsers)
    }

    getUserById(request, response) {
        let { id } = request.params
        id = Number(id)
        
        const userExist = users.find(user => user.id === id)

        if (!userExist) return response.send(404, { message: "User not found" })

        response.send(200, userExist)
    }

    createUser(request, response) {
        const { name } = request.body

        const lastUserId = users.at(-1).id
        const newUser = {
            id: lastUserId + 1,
            name
        }

        users.push(newUser)

        response.send(200, newUser)
    }

    updateUser(request, response) {
        let { id } = request.params
        const { name } = request.body

        id = Number(id)

        const userExist = users.find(user => user.id === id)

        if (!userExist) {
            return response.send(404, { message: "User not found" })
        }

        users = users.map(user => {
            if (user.id === id) {
                return {
                    id: user.id,
                    name
                }
            }

            return user
        })

        response.send(200, { id, name })
    }

    deleteUser(request, response) {
        let { id } = request.params
        id = Number(id)

        const userExist = users.find(user => user.id === id)

        if (!userExist) {
            return response.send(404, { message: "User not found" })
        }

        users = users.filter(user => user.id !== id)

        response.send(200, { message: "User successfully deleted" })
    }
}

module.exports = UserController