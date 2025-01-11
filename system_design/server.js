const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	// Allow embedding in iframe
	server.use((req, res, next) => {
		res.setHeader("X-Frame-Options", "ALLOWALL");
		res.setHeader(
			"Content-Security-Policy",
			"frame-ancestors 'self' http://localhost:3000;"
		);
		next();
	});

	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(3001, (err) => {
		if (err) throw err;
		console.log("> Ready on http://localhost:3001");
	});
});
