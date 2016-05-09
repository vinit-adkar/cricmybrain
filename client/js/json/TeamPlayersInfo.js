define([
	"jquery",
	"underscore"
], function($, _) {
		var team_players = {
			MI: {  
				team : "Mumbai Indians",
				teamId : "MI",
				players : [
					{"name" : "Jasprit Bumrah", "type" : "bowler"},
					{"name" : "Shreyas Gopal", "type" : "bowler"},
					{"name" : "Kishore Kamath", "type" : "bowler"},
					{"name" : "Mitchell McClenaghan", "type" : "bowler"},
					{"name" : "Tim Southee", "type" : "bowler"},
					{"name" : "Vinay Kumar", "type" : "bowler"},
					{"name" : "Marchant de Lange", "type" : "bowler"},
					{"name" : "Harbhajan Singh", "type" : "bowler"},
					{"name" : "Lasith Malinga", "type" : "bowler"},
					{"name" : "Nathu Singh", "type" : "bowler"},
					{"name" : "Suchith", "type" : "bowler"},
					{"name" : "Jerome Taylor", "type" : "bowler"},
					{"name" : "Hardik Pandya", "type" : "allrounder"},
					{"name" : "Corey Anderson", "type" : "allrounder"},
					{"name" : "Krunal Pandya", "type" : "allrounder"},
					{"name" : "Kieron Pollard", "type" : "allrounder"},
					{"name" : "Rohit Sharma", "type" : "batsman"},
					{"name" : "Unmukt Chand", "type" : "batsman"},
					{"name" : "Deepak Punia", "type" : "batsman"},
					{"name" : "Ambati Rayudu", "type" : "batsman"},
					{"name" : "Martin Guptill", "type" : "batsman"},
					{"name" : "Siddhesh Lad", "type" : "batsman"},
					{"name" : "Nitish Rana", "type" : "batsman"},
					{"name" : "Jitesh Sharma", "type" : "batsman"},
					{"name" : "Akshay Wakhare", "type" : "batsman"},
					{"name" : "Parthiv Patel", "type" : "wicketkeeper"},
					{"name" : "Jos Buttler", "type" : "wicketkeeper"}
				]
			},
			KKR: {
				team : "Kolkata Knight Riders",
				teamId : "KKR",
				players : [
					{"name" : "Ankit Rajpoot", "type" : "bowler"},
					{"name" : "Kuldeep Yadav", "type" : "bowler"},
					{"name" : "Jaydev Unadkat", "type" : "bowler"},
					{"name" : "Brad Hogg", "type" : "bowler"},
					{"name" : "Morne Morkel", "type" : "bowler"},
					{"name" : "Sunil Narine", "type" : "bowler"},
					{"name" : "Umesh Yadav", "type" : "bowler"},
					{"name" : "John Hastings", "type" : "bowler"},
					{"name" : "Piyush Chawla", "type" : "allrounder"},
					{"name" : "Jason Holder", "type" : "allrounder"},
					{"name" : "Yusuf Pathan", "type" : "allrounder"},
					{"name" : "Andre Russell", "type" : "allrounder"},
					{"name" : "Shakib Al Hasan", "type" : "allrounder"},
					{"name" : "Gautam Gambhir", "type" : "batsman"},
					{"name" : "Manan Sharma", "type" : "batsman"},
					{"name" : "Colin Munro", "type" : "batsman"},
					{"name" : "Manish Pandey", "type" : "batsman"},
					{"name" : "Rajagopal Sathish", "type" : "batsman"},
					{"name" : "Suryakumar Yadav", "type" : "batsman"},
					{"name" : "Chris Lynn", "type" : "batsman"},
					{"name" : "Robin Uthappa", "type" : "wicketkeeper"},
					{"name" : "Sheldon Jackson", "type" : "wicketkeeper"}
				]
			},
			KXIP: {
				team : "Kings XI Punjab",
				teamId : "KXIP",
				players : [
					{"name" : "Anureet Singh", "type" : "bowler"},
					{"name" : "Mitchell Johnson", "type" : "bowler"},
					{"name" : "Mohit Sharma", "type" : "bowler"},
					{"name" : "Kyle Abbott", "type" : "bowler"},
					{"name" : "Cariappa", "type" : "bowler"},
					{"name" : "Sandeep Sharma", "type" : "bowler"},
					{"name" : "Shardul Thakur", "type" : "bowler"},
					{"name" : "Farhaan Behardien", "type" : "allrounder"},
					{"name" : "Rishi Dhawan", "type" : "allrounder"},
					{"name" : "Glenn Maxwell", "type" : "allrounder"},
					{"name" : "Axar Patel", "type" : "allrounder"},
					{"name" : "Pardeep Sahu", "type" : "allrounder"},
					{"name" : "Swapnil Singh", "type" : "allrounder"},
					{"name" : "Marcus Stoinis", "type" : "allrounder"},
					{"name" : "David Miller", "type" : "batsman"},
					{"name" : "Murali Vijay", "type" : "batsman"},
					{"name" : "Armaan Jaffer", "type" : "batsman"},
					{"name" : "Gurkeerat Singh Mann", "type" : "batsman"},
					{"name" : "Shaun Marsh", "type" : "batsman"},
					{"name" : "Nikhil Naik", "type" : "batsman"},
					{"name" : "Manan Vohra", "type" : "batsman"},
					{"name" : "Hashim Amla", "type" : "batsman"},
					{"name" : "Wriddhiman Saha", "type" : "wicketkeeper"}
				]
			},
			SH: {
				team : "Sunrisers Hyderabad",
				teamId : "SH",
				players : [
					{"name" : "Trent Boult", "type" : "bowler"},
					{"name" : "Abhimanyu Mithun", "type" : "bowler"},
					{"name" : "Siddarth Kaul", "type" : "bowler"},
					{"name" : "Mustafizur Rahman", "type" : "bowler"},
					{"name" : "Ashish Nehra", "type" : "bowler"},
					{"name" : "Bipul Sharma", "type" : "bowler"},
					{"name" : "Bhuvneshwar Kumar", "type" : "bowler"},
					{"name" : "Barinder Sran", "type" : "bowler"},
					{"name" : "Moises Henriques", "type" : "allrounder"},
					{"name" : "Karn Sharma", "type" : "allrounder"},
					{"name" : "Ashish Reddy", "type" : "allrounder"},
					{"name" : "Ben Cutting", "type" : "allrounder"},
					{"name" : "Vijay Shankar", "type" : "allrounder"},
					{"name" : "Shikhar Dhawan", "type" : "batsman"},
					{"name" : "Tirumalsetti Suman", "type" : "batsman"},
					{"name" : "David Warner", "type" : "batsman"},
					{"name" : "Yuvraj Singh", "type" : "batsman"},
					{"name" : "Eoin Morgan", "type" : "batsman"},
					{"name" : "Kane Williamson", "type" : "batsman"},
					{"name" : "Deepak Hooda", "type" : "batsman"},
					{"name" : "Ricky Bhui", "type" : "batsman"},
					{"name" : "Naman Ojha", "type" : "wicketkeeper"},
					{"name" : "Aditya Tare", "type" : "wicketkeeper"}
				]
			},
			GL: {
				team : "Gujarat Lions",
				teamId : "GL",
				players : [
					{"name" : "Dhawal Kulkarni", "type" : "bowler"},
					{"name" : "Pravin Tambe", "type" : "bowler"},
					{"name" : "Sarabjit Ladda", "type" : "bowler"},
					{"name" : "Amit Mishra", "type" : "bowler"},
					{"name" : "Shadab Jakati", "type" : "bowler"},
					{"name" : "Shivil Kaushik", "type" : "bowler"},
					{"name" : "Praveen Kumar", "type" : "bowler"},
					{"name" : "Pradeep Sangwan", "type" : "bowler"},
					{"name" : "Dale Steyn", "type" : "bowler"},
					{"name" : "Andrew Tye", "type" : "bowler"},
					{"name" : "Dwayne Bravo", "type" : "allrounder"},
					{"name" : "Ravindra Jadeja", "type" : "allrounder"},
					{"name" : "James Faulkner", "type" : "allrounder"},
					{"name" : "Suresh Raina", "type" : "batsman"},
					{"name" : "Akshdeep Nath", "type" : "batsman"},
					{"name" : "Aaron Finch", "type" : "batsman"},
					{"name" : "Brendon McCullum", "type" : "batsman"},
					{"name" : "Jaydev Shah", "type" : "batsman"},
					{"name" : "Dwayne Smith", "type" : "batsman"},
					{"name" : "Paras Dogra", "type" : "batsman"},
					{"name" : "Ishan Kishan", "type" : "batsman"},
					{"name" : "Umang Sharma", "type" : "batsman"},
					{"name" : "Amit Mishra", "type" : "batsman"},
					{"name" : "Eklavya Dwivedi", "type" : "wicketkeeper"},
					{"name" : "Dinesh Karthik", "type" : "wicketkeeper"}
				]	
			},
			RPS: {
				team : "Rising Pune Supergiants",
				teamId : "RPS",
				players : [
					{"name" : "Ravichandran Ashwin", "type" : "bowler"},
					{"name" : "Ishant Sharma", "type" : "bowler"},
					{"name" : "Adam Zampa", "type" : "bowler"},
					{"name" : "Ankit Sharma", "type" : "bowler"},
					{"name" : "Murugan Ashwin", "type" : "bowler"},
					{"name" : "Scott Boland", "type" : "bowler"},
					{"name" : "Ashok Dinda", "type" : "bowler"},
					{"name" : "Ishwar Pandey", "type" : "bowler"},
					{"name" : "RP Singh", "type" : "bowler"},
					{"name" : "Baba Aparajith", "type" : "allrounder"},
					{"name" : "Rajat Bhatia", "type" : "allrounder"},
					{"name" : "Irfan Pathan", "type" : "allrounder"},
					{"name" : "Mitchell Marsh", "type" : "allrounder"},
					{"name" : "Thisara Perera", "type" : "allrounder"},
					{"name" : "Albie Morkel", "type" : "allrounder"},
					{"name" : "Deepak Chahar", "type" : "batsman"},
					{"name" : "Faf du Plessis", "type" : "batsman"},
					{"name" : "Jaskaran Singh", "type" : "batsman"},
					{"name" : "Kevin Pietersen", "type" : "batsman"},
					{"name" : "Steven Smith", "type" : "batsman"},
					{"name" : "Ankush Bains", "type" : "batsman"},
					{"name" : "Peter Handscomb", "type" : "batsman"},
					{"name" : "Ajinkya Rahane", "type" : "batsman"},
					{"name" : "Saurabh Tiwary", "type" : "batsman"},
					{"name" : "Usman Khawaja", "type" : "batsman"},
					{"name" : "George Bailey", "type" : "batsman"},
					{"name" : "MS Dhoni", "type" : "wicketkeeper"}
				]
			},
			RCB: {
				team : "Royal Challengers Bangalore",
				teamId : "RCB",
				players : [
					{"name" : "Abu Nechim", "type" : "bowler"},
					{"name" : "Yuzvendra Chahal", "type" : "bowler"},
					{"name" : "Vikas Tokas", "type" : "bowler"},
					{"name" : "Varun Aaron", "type" : "bowler"},
					{"name" : "Sreenath Aravind", "type" : "bowler"},
					{"name" : "Iqbal Abdulla", "type" : "bowler"},
					{"name" : "Vikramjeet Malik", "type" : "bowler"},
					{"name" : "Adam Milne", "type" : "bowler"},
					{"name" : "Harshal Patel", "type" : "bowler"},
					{"name" : "Kane Richardson", "type" : "bowler"},
					{"name" : "Chris Jordan", "type" : "bowler"},
					{"name" : "Praveen Dubey", "type" : "allrounder"},
					{"name" : "David Wiese", "type" : "allrounder"},
					{"name" : "Stuart Binny", "type" : "allrounder"},
					{"name" : "Shane Watson", "type" : "allrounder"},
					{"name" : "Tabraiz Shamsi", "type" : "allrounder"},
					{"name" : "Parvez Rasool", "type" : "allrounder"},
					{"name" : "Virat Kohli", "type" : "batsman"},
					{"name" : "Travis Head", "type" : "batsman"},
					{"name" : "Sarfaraz Khan", "type" : "batsman"},
					{"name" : "Mandeep Singh", "type" : "batsman"},
					{"name" : "Lokesh Rahul", "type" : "batsman"},
					{"name" : "Sachin Baby", "type" : "batsman"},
					{"name" : "AB de Villiers", "type" : "batsman"},
					{"name" : "Chris Gayle", "type" : "batsman"},
					{"name" : "Akshay Karnewar", "type" : "batsman"},
					{"name" : "Kedar Jadhav", "type" : "wicketkeeper"}
				]
			},
			DD: {
				team : "Delhi Daredevils",
				teamId : "DD",
				players : [
					{"name" : "Zaheer Khan", "type" : "bowler"},
					{"name" : "Khaleel Ahmed", "type" : "bowler"},
					{"name" : "Mohammed Shami", "type" : "bowler"},
					{"name" : "Shahbaz Nadeem", "type" : "bowler"},
					{"name" : "Jayant Yadav", "type" : "bowler"},
					{"name" : "Nathan Coulter-Nile", "type" : "bowler"},
					{"name" : "Imran Tahir", "type" : "bowler"},
					{"name" : "Mahipal Lomror", "type" : "bowler"},
					{"name" : "Chris Morris", "type" : "bowler"},
					{"name" : "Pratyush Singh", "type" : "bowler"},
					{"name" : "Pawan Suyal", "type" : "bowler"},
					{"name" : "Amit Mishra", "type" : "bowler"},
					{"name" : "Carlos Brathwaite", "type" : "allrounder"},
					{"name" : "Chama Milind", "type" : "allrounder"},
					{"name" : "Pawan Negi", "type" : "allrounder"},
					{"name" : "Jean-Paul Duminy", "type" : "allrounder"},
					{"name" : "Akhil Herwadkar", "type" : "batsman"},
					{"name" : "Shreyas Iyer", "type" : "batsman"},
					{"name" : "Mayank Agarwal", "type" : "batsman"},
					{"name" : "Sam Billings", "type" : "batsman"},
					{"name" : "Karun Nair", "type" : "batsman"},
					{"name" : "Quinton de Kock", "type" : "wicketkeeper"},
					{"name" : "Sanju Samson", "type" : "wicketkeeper"},
					{"name" : "Rishabh Pant", "type" : "wicketkeeper"}
				]
			}
		};

		var getTeamName = function(teamId) {
			return team_players[teamId].team;
		};

		var getPlayers = function(teamId) {
			return team_players[teamId].players;
		};

		var getPlayerType = function(playerName) {
			var type = '';
			_.each (team_players, function(team) {
				_.each(team.players, function(player) {
					if (player.name == playerName) {
						type = player.type;
						return false;
					}
				})
			});
			return type;
		};

		var getAllTeamName = function() {
			var allTeams = {};
			_.each(team_players, function(team) {
				allTeams[team.teamId] = team.team;
			});
			return allTeams;
		}

		return {
			getTeamName: getTeamName,
			getPlayers: getPlayers,
			getPlayerType: getPlayerType,
			getAllTeamName: getAllTeamName
		};

	} 
);
