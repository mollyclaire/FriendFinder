// Requiring the use of path and our data in the friends array
var friendsArray = require("../data/friends.js")
var path = require("path");

// Routes
// =============================================================

// Exporting both functions that will send the associated HTML pages to the corresponding route.
module.exports = function (app) {

    // Users can access this json object when they click on the link that says, "API Friends List."
    app.get("/api/friends", function(req, res) {
        res.json(friendsArray);
    });

    // This method takes in the user information and compares it with existing data to make a friend match.
    app.post("/api/friends", function(req, res) {
        console.log(req.body);

		// This variable represents the user's scores from the survey. 
        var surveyResults = req.body.scores;
        
		// Looping through the scores and making each one an integer.
		for (var i = 0; i < surveyResults.length; i++) {
			surveyResults[i] = parseInt(surveyResults[i]);
		}

        // This variable stores the difference between the user input and a friend already in the array.
        // The current number of 100 is arbitrary and will change based on the user's scores. 
        var totalDifference = 100;
        // This variable represents an index in the array for the best match.
		var bestMatch = 0; 

		// Looping through the entire array to select every entry. 
		for (i = 0; i < friendsArray.length; i++) {

            // This variable stores the difference function (see below) that calculates the difference between two arrays.
            // In this instance(the user's scoresand the scores of each friend in the array ([i])).
			var tempDifference = difference(surveyResults, friendsArray[i].scores);

			// console log the difference between user choices and pet being compared
			console.log("difference between", surveyResults, "and", friendsArray[i].name, friendsArray[i].scores, "=", tempDifference);

            // If the temporary difference is less than the total difference, then the temporary
            // difference should equal the new total difference, signifying a best match. The best match
            // variable is then updated to be the index of that friend.
			if (tempDifference < totalDifference) {
				totalDifference = tempDifference;
				bestMatch = i;
			}
		}

		// function to calculate the difference between two arrays
		// it cycles through values of each array and subtracts them
		// from values of the other aray, and applies absolute
		// value function, then returns the total tally reflecting
        // the deviation between the two arrays.
        // This function calculates the difference between two arrays (in this case, the arrays of scores).
		function difference(array1, array2) {
			var differenceAmount=0;
            
            // Loops through array one...
			for (var i = 0; i < array1.length; i++) {
                // The difference of each array is calculated with the absolute math function (no negative numbers!),
                // and is added to the differenceAmount (which is set to 0).
				differenceAmount += Math.abs(array1[i] - array2[i]);
			}
			return differenceAmount;
		}

		// Sends whatever is the bestMatch index of the friendsArray to the HTML page.
		res.send(friendsArray[bestMatch]);
	});

}

