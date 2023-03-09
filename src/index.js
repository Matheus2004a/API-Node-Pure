const http = require("node:http")
const url = require("node:url")

const port = 3000

const bodyParser = require("./helpers/bodyParser")
const routes = require("./routes")

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true)

    let { pathname } = parsedUrl

    const splitEndPoint = pathname.split("/").filter(Boolean)

    let [name, id] = splitEndPoint

    if (splitEndPoint.length > 1) {
        pathname = `/${name}/:id`
    }

    // Verify url is equal something array url
    const routeExist = routes.find(route => (
        route.endpoint === pathname && route.method === request.method
    ))

    if (routeExist) {
        request.query = parsedUrl.query
        request.params = { id }

        // Send response to client
        response.send = (statusCode, body) => {
            response.writeHead(statusCode, { "Content-type": "application/json" })
            response.end(JSON.stringify(body))
        }

        const listMethods = ["POST", "PUT", "PATCH"]

        if (listMethods.includes(request.method)) {
            bodyParser(request, () => routeExist.handler(request, response))
        } else {
            routeExist.handler(request, response)
        }
    } else {
        response.writeHead(404, { "Content-type": "text/html" })
        response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
    }
})

server.listen(port, () => console.log(`Server is running on port http://localhost:${port}`))