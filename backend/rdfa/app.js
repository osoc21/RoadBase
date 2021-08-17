const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const data = require("./data");

const app = express();
nunjucks.configure(path.join(__dirname, 'views'), {
	autoescape: true,
	express: app
});

const PORT = 8888;


app.get("/", (req, res) => {
	res.send("Hi index!");
});


app.get("/rdfa", (req, res) => {
	let opstellingUuid = req.query.uuid;

	res.render("opstelling.html", data.getMockData());
});


app.listen(PORT, () => console.log(`Starting server on http://localhost:${PORT}`));
