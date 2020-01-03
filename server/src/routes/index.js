var express = require("express");
var router = express.Router();
var helpers = require("../helpers/helpers");

var authRoutes = require("./auth");

router.get("/", (req, res) => {
  return helpers.generateApiResponse(
    res,
    req,
    "Server is up and running.",
    200,
    []
  );
});

router.all("/cds-service/patient-greet", (req, res) => {
	var userData = {
		cards: [{
			summary: "SMART App Success",
			indicator: "success",
			detail: "Test HAE app",
			source: [
			{
				label: "Static CDS Service Example",
				url: "https://example.com"
			}
			],
			links: [
			{
				label: "Launch SMART App",
				url: "https://haeserver.visolyr.io/launch",
				type: "smart"
			}
			]
		}]
	};
	res.status(200).send(userData);
});
router.all("/cds-service", (req, res) => {
  var userData = {
    services: [{
      hook: "patient-view",
      name: "Static CDS Service Example",
      description:
        "An example of a CDS Service that returns a card with SMART app recommendations.",
      id: "patient-greet",
      prefetch: {
        patientToGreet: "Patient/{{Patient.id}}"
      }
    }]
  };
  res.status(200).send(userData);
});

router.all("/status", (req, res) => {
  return helpers.generateApiResponse(
    res,
    req,
    "Server is up and running.",
    200,
    []
  );
});

router.get("/launch", (req, res) => {
	var launchData = {
		token: req.query.launch,
		fhir: req.query.iss
	};
	res.send(launchData);
});

router.use("/auth", authRoutes);

module.exports = router;
