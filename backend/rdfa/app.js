const express = require("express");
const nunjucks = require("nunjucks");
const cors = require('cors');
const prettier = require("prettier");
const path = require("path");
const data = require("./data");

const app = express();
app.use(cors());
nunjucks.configure(path.join(__dirname, "views"), {
	autoescape: true,
	express: app,
});

const PORT = 8888;


app.get("/", (req, res) => {
	res.send("Hi index!");
});


app.get("/rdfa", async (req, res) => {
	let opstellingUuid = req.query.uuid;
	let opstelling = await data.getOpstelling(opstellingUuid);

	res.render("opstelling.njk", opstelling, (err, html) => {
		// Autoformat output, because nunjucks's templating messes with the indentation levels
		html = prettier.format(html, {
			parser: "html",
			useTabs: true,
			printWidth: 200,
		});
		res.send(html);
	});
});


app.listen(PORT, () => console.log(`Starting server on http://localhost:${PORT}`));
