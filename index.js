const http = require('http')
const qs = require('querystring')

const server = http.createServer(function (request, response) {

	
	const allowedOrigins = [
		"http://localhost:3000",
		"http://localhost:8000"
	]

	if(allowedOrigins.indexOf(request.headers.origin) < 0 ){
		console.log("Not allowed")
		response.writeHead(400);
		response.end();
	}

	const headers = {
		"Access-Control-Allow-Credentials": 'true',
		"Access-Control-Allow-Origin": `${request.headers.origin}`,
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type,Accept,Authorization,X-sample,credentials"
	}

	
	for(let k in headers){
		response.setHeader(k,headers[k]);
	}

	if(request.method === 'OPTIONS'){
		response.writeHead(200);
		response.end();
	}

	if (request.method == 'POST') {
		console.log('POST')
		const chunks = []
		request.on('data', function (chunk) {
			chunks.push(chunk)
		})
		request.on('end', function () {
			const body = Buffer.concat(chunks).toString();
			const parsedBody = JSON.parse(body);
			console.log("Body", parsedBody);
			response.writeHead(200, { 'Content-Type': 'application/json' })
			response.write(JSON.stringify({
				"key": "value"
			}))
			response.end()
		})
	} else {

	}
})

const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
