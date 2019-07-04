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

        // Creates a new object that will contain the name and "score" of the best-matched friend.
        var bestMatch = {
          name: "",
          friendDifference: 1000
        };
    
        console.log(req.body)
        
        // userData is set to all of the info the user inputs. userScores is set to only their scores.
        var userData = req.body;
        var userScores = userData.scores;
    
        // This variable will be used later to help determine which person in the array is the best match.
        var totalDifference = 0;
    
        // Loops through the entire array of friends and sets one friend to the variable currentFriend.
        // The totalDifference is still zero at this point, because we aren't comparing anything.
        for (var i = 0; i < friendsArray.length; i++) {
          var currentFriend = friendsArray[i];
          totalDifference = 0;
    
          console.log(currentFriend.name);

          // Loops through the scores of the currentFriend (selected in the above for loop) and sets those to a variable called currentFriendScore.
          for (var j = 0; j < currentFriend.scores.length; j++) {
            var currentFriendScore = currentFriend.scores[j];
            var currentUserScore = userScores[j];
            
            // This equation finds the difference between each number stored as the currentUserScore and the ones stored as the currentFriendScore,
            // and adds them together. Math.abs is needed to prevent a negative score. 
            totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
          }
          
          // If the the total difference is less than or equal to the friendDifference property of the bestMatch object,
          // then the currentFriend is the best match!
          if (totalDifference <= bestMatch.friendDifference) {
            bestMatch.name = currentFriend.name;
            bestMatch.friendDifference = totalDifference;
          }
        }

        // Pushes the user input into the array.
        friendsArray.push(userData);
    
        // Returns the data (name and score) in the bestMatch object in json format, so that we can display it to the user.
        res.json(bestMatch);
      });
};

