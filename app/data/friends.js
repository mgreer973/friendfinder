// ====================================================
// DATA
// Below data will hold all of the friends tables.
// Initially we just set it equal to a "dummy" friend. 
// But you could have it be an empty array as well.
// ====================================================

var friendsArray = [
	{
		name: "test",
		photo: "https://i.vimeocdn.com/portrait/58832_300x300.jpg",
		scores: [3, 2, 3, 2, 2, 5, 1, 2, 5, 2, ]
	},
	{
		name: "quiz",
		photo: "http://www.citizenship-aei.org/wp-content/uploads/Testing.jpg",
		scores: [3, 5, 1, 2, 3, 5, 3, 4, 5, 4, ]
	}
];

// Note how we export the array. This makes it accessible to other files using require. 
module.exports = friendsArray; 