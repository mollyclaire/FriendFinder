// Routes
// =============================================================

// Requiring the use of path
var path = require("path");

// Exporting both functions that will send the associated HTML pages to the corresponding route
module.exports = function (app) {

    // Survey page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    // Home page
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};