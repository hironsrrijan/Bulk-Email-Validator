const express = require("express");
const bodyparser = require("body-parser");
var verify = require("bulk-email-verifier");
const app = express();
app.use(bodyparser.urlencoded({
	extended: false
}));
app.use(bodyparser.json());
app.set("view engine", "ejs");

//bulk email checker app connecting here

app.get("/bulkemailchecker", (req, res) => {
	res.render("bulkemailchecker", {
		title: "Hiran Roy Bulk Email Validator",
		text: "",
		flag: false,
	});
});

app.post("/bulkemailchecker", (req, res) => {
	var domains = req.body.domain;
	var provider = req.body.provider;
	console.log(domains);

	var lines = domains.split(/\n/);
	var output = [];
	var outputText = [];
	for (var i = 0; i < lines.length; i++) {
		// only push this line if it contains a non whitespace character.
		if (/\S/.test(lines[i])) {
			outputText.push('"' + lines[i].trim() + '"');
			output.push(lines[i].trim());
		}
	}
	console.log(output);

	verify.verifyEmails(provider, output, {}, function(err, response) {
		console.log("Domains Status: ", response);
		res.render("bulkemailchecker", {
			title: "Hiran Roy Bulk Email Validator",
			text: response,
			flag: true,
		});
	});
});
app.listen(5000, () => {
	console.log("App is listening on PORT 5000");
});