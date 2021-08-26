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
	let instanceUuids = req.query.uuid.split(",");

	// Fetch all instances asynchronously. Note: order is not guaranteed!
	let instances = await Promise.all(instanceUuids.map(async (uuid) => {
		return await data.getInstance(uuid);
	}));
	let ctx = {"instances": instances};

	res.render("selection.njk", ctx, (err, html) => {
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
