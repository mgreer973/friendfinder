// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData 		= require('../data/friends.js');
var path 			= require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){

		// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
		// It will do this by sending out the value "true" have a table 

//		console.log("before parseInt" + typeof req.body.phoneNumber)
//		req.body.phoneNumber = parseInt(req.body.phoneNumber);
//		console.log("after parseInt"+ typeof req.body.phoneNumber);

			var friendDataB4 = friendData;
			var fName = friendDataB4[0].name;
			var fScore = friendDataB4[0].scores;
			console.log('friendDataB4 length', friendDataB4.length);
//			console.log('fName ', fName);
//			console.log('fScore ', fScore);
//			console.log('friendData before push ', friendData);
//			console.log('req.body ', req.body);

//			console.log('req.body scores length', req.body.scores.length);
//			req.body.phoneNumber = parseInt(req.body.phoneNumber);
			for (var i = 0; i < req.body.scores.length; i++) {
					req.body.scores[i] = parseInt(req.body.scores[i]);
			}

			// set default values
			var winnerIdx = 0;
			var winnerScore = 0;
			var firstTime = 'Y';
			var totalDiff = 0
			var inFriendScores = req.body.scores;  

			console.log('friendDataB4 ', friendDataB4);
//			console.log('inFriendScores ', inFriendScores);

			for (var f = 0; f < friendDataB4.length; f++) {
					var fScore = friendDataB4[f].scores;
					totalDiff = 0;
					console.log('f b4 ', f);
					for (var g = 0; g < inFriendScores.length; g++) {
						 totalDiff = totalDiff + Math.abs(fScore[g] - inFriendScores[g]);
					}
					console.log('f aftr ', f);
					console.log('totalDiff ', totalDiff);
					if (firstTime == 'Y') {
							winnerScore =  totalDiff;
					 		winnerIdx = f;
					 	  firstTime = 'N';
					} else {
					 	 if (totalDiff < winnerScore) {
					 			winnerScore =  totalDiff;
					 			winnerIdx = f;
					}

					} // g for
			} // f for

			console.log('winnerIdx ', winnerIdx)
//			console.log('friendDataB4 b4 push ', friendDataB4);
			friendData.push(req.body);
//			console.log('friendDataB4 after push ', friendDataB4);

			res.json(friendDataB4[winnerIdx]); // KEY LINE
//			console.log('friendData after push ', friendData);


	});

}