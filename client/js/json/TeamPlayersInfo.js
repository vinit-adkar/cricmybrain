define([
	"jquery",
	"underscore"
], function($, _) {
		var team_players = {
			MI: {
				team : "Mumbai Indians",
				teamId : "MI",
				players : ["Rohit Sharma", "Jasprit Bumrah", "Unmukt Chand", "Shreyas Gopal", "Kishore Kamath", "Mitchell McClenaghan", "Hardik Pandya", "Parthiv Patel", "Deepak Punia", "Ambati Rayudu", "Lendl Simmons", "Tim Southee", "Vinay Kumar", "Corey Anderson", "Jos Buttler", "Marchant de Lange", "Harbhajan Singh", "Siddhesh Lad", "Lasith Malinga", "Krunal Pandya", "Kieron Pollard", "Nitish Rana", "Jitesh Sharma", "Nathu Singh", "Suchith", "Akshay Wakhare"]
			},
			KKR: {
				team : "Kolkata Knight Riders",
				teamId : "KKR",
				players : ["Gautam Gambhir", "John Hastings", "Jason Holder", "Kuldeep Yadav", "Manan Sharma", "Colin Munro", "Manish Pandey", "Ankit Rajpoot", "Rajagopal Sathish", "Jaydev Unadkat", "Suryakumar Yadav", "Piyush Chawla", "Brad Hogg", "Sheldon Jackson", "Chris Lynn", "Morne Morkel", "Sunil Narine", "Yusuf Pathan", "Andre Russell", "Shakib Al Hasan", "Robin Uthappa", "Umesh Yadav"]
			},
			KXIP: {
				team : "Kings XI Punjab",
				teamId : "KXIP",
				players : ["David Miller", "Anureet Singh", "Farhaan Behardien", "Rishi Dhawan", "Mitchell Johnson", "Glenn Maxwell", "Axar Patel", "Mohit Sharma", "Pardeep Sahu", "Swapnil Singh", "Murali Vijay", "Kyle Abbott", "Armaan Jaffer", "Cariappa", "Gurkeerat Singh Mann", "Shaun Marsh", "Nikhil Naik", "Wriddhiman Saha", "Sandeep Sharma", "Marcus Stoinis", "Shardul Thakur", "Manan Vohra"]
			},
			SH: {
				team : "Sunrisers Hyderabad",
				teamId : "SH",
				players : ["Shikhar Dhawan", "Ricky Bhui", "Trent Boult", "Moises Henriques", "Abhimanyu Mithun", "Siddarth Kaul", "Mustafizur Rahman", "Naman Ojha", "Karn Sharma", "Tirumalsetti Suman", "David Warner", "Yuvraj Singh", "Ashish Nehra", "Ashish Reddy", "Bipul Sharma", "Ben Cutting", "Bhuvneshwar Kumar", "Eoin Morgan", "Vijay Shankar", "Barinder Sran", "Aditya Tare", "Kane Williamson"]
			},
			GL: {
				team : "Gujarat Lions",
				teamId : "GL",
				players : ["Suresh Raina", "Akshdeep Nath", "Dwayne Bravo", "Eklavya Dwivedi", "Aaron Finch", "Ravindra Jadeja", "Dinesh Karthik", "Dhawal Kulkarni", "Brendon McCullum", "Jaydev Shah", "Dwayne Smith", "Pravin Tambe", "Sarabjit Ladda", "Amit Mishra", "Paras Dogra", "James Faulkner", "Ishan Kishan", "Shadab Jakati", "Shivil Kaushik", "Praveen Kumar", "Pradeep Sangwan", "Dale Steyn", "Andrew Tye"]
			},
			RPS: {
				team : "Rising Pune Supergiants",
				teamId : "RPS",
				players : ["MS Dhoni", "Baba Aparajith", "Ravichandran Ashwin", "Rajat Bhatia", "Deepak Chahar", "Faf du Plessis", "Jaskaran Singh", "Irfan Pathan", "Kevin Pietersen", "Ishant Sharma", "Steven Smith", "Adam Zampa", "Ankit Sharma", "Murugan Ashwin", "Ankush Bains", "Scott Boland", "Ashok Dinda", "Peter Handscomb", "Mitchell Marsh", "Ishwar Pandey", "Thisara Perera", "Ajinkya Rahane", "RP Singh"]
			},
			RCB: {
				team : "Royal Challengers Bangalore",
				teamId : "RCB",
				players : ["Virat Kohli", "Abu Nechim", "Samuel Badree", "Yuzvendra Chahal", "Praveen Dubey", "Travis Head", "Kedar Jadhav", "Sarfaraz Khan", "Mandeep Singh", "Lokesh Rahul", "Sachin Baby", "Vikas Tokas", "David Wiese", "Varun Aaron", "Sreenath Aravind", "Stuart Binny", "AB de Villiers", "Chris Gayle", "Iqbal Abdulla", "Akshay Karnewar", "Vikramjeet Malik", "Adam Milne", "Harshal Patel", "Kane Richardson", "Shane Watson"]
			},
			DD: {
				team : "Delhi Daredevils",
				teamId : "DD",
				players : ["Zaheer Khan", "Khaleel Ahmed", "Carlos Brathwaite", "Quinton de Kock", "Akhil Herwadkar", "Shreyas Iyer", "Chama Milind", "Mohammed Shami", "Shahbaz Nadeem", "Pawan Negi", "Joel Paris", "Sanju Samson", "Jayant Yadav", "Mayank Agarwal", "Sam Billings", "Nathan Coulter-Nile", "Jean-Paul Duminy", "Imran Tahir", "Mahipal Lomror", "Chris Morris", "Karun Nair", "Rishabh Pant", "Pratyush Singh", "Pawan Suyal", "Amit Mishra"]
			}
		};

		var getTeamName = function(teamId) {
			return team_players[teamId].team;
		};

		var getPlayers = function(teamId) {
			return team_players[teamId].players;
		};

		return {
			getTeamName: getTeamName,
			getPlayers: getPlayers
		};

	} 
);
