const http = require('http')
const fs = require('fs')
const url = require('url')

const dirname = "./public"
const server = http.createServer(function (request, response) {
	const endpoint = url.parse(request.url).pathname
	const allowedOrigins = [
		"http://localhost:3000",
		"http://localhost:8000"
	]

	const secureEndpoints = [
		"/login"
	]

	const origin = request.headers.origin ||  ''

	const same_origin = (allowed_origin) => origin.startsWith(allowed_origin)

	if (!allowedOrigins.some(same_origin) && secureEndpoints.includes(endpoint)) {
		console.log(`Request from ${origin} Not allowed`)
		response.writeHead(404)
		response.end()
		return
	}

	const headers = {
		"Access-Control-Allow-Credentials": 'true',
		"Access-Control-Allow-Origin": `${origin}`,
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type,Accept,Authorization,X-sample,credentials"
	}


	for (let k in headers) {
		response.setHeader(k, headers[k])
	}


	if (request.method === 'OPTIONS') {
		response.writeHead(200)
		response.end()
		return
	}
	else if (request.method === 'POST') {

		if (endpoint === "/login") {
			const chunks = []
			request.on('data', function (chunk) {
				chunks.push(chunk)
			})
			request.on('end', function () {
				const body = Buffer.concat(chunks).toString()
				const parsedBody = JSON.parse(body)
				const { username, password } = parsedBody
				console.log("Body", parsedBody)
				const params = `param1=${username}&param2=value2`
				response.writeHead(301, { "Location": `/home?${params}` })
				response.end()
			})

		}
		return
	}
	else if (request.method === 'GET') {

		if (endpoint === "/home") {
			const queryObject = url.parse(request.url, true).query
			const { param1, param2 } = queryObject
			response.writeHead(200, { 'Content-Type': 'text/html' })
			const html = `
				<html>
				<body>
					<p>Hello ${param1}</p>
					<p>Param2: ${param2}</p>
				<body>
				</html>
			`
			response.write(html)
			response.end()
		}
		else {
			const files = fs.readdirSync(dirname)
			const file = (request.url === "/") ? "/index.html" : request.url

			if (!files.includes(file.split("/")[1])) {
				response.writeHead(404)
				response.end("Not Found")
				return
			}

			fs.readFile(dirname + file, function (err, data) {
				if (err) {
					response.writeHead(404)
					response.end(JSON.stringify(err))
					return
				}
				response.writeHead(200)
				response.end(data)
			})
		}
	}
})

const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
