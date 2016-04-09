define([
	"jquery",
	"underscore"
], function($, _) {
		var rules = {
			rule1: {   
				"ruleNum": "rule1",
				"ruleType" : "teamName",
				"ruleDesc" : "Match Winner",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted team is same as winner",
				"rulePoints" : 2,
				"range" : 0
			},

			rule2: {   
				"ruleNum": "rule2",
				"ruleType" : "number",
				"ruleDesc" : "Max runs scored by a single batsman in the match",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted runs is within a tolerance of +-3 of the max runs",
				"rulePoints" : 3,
				"range" : 3
			},

			rule3: {   
				"ruleNum": "rule3",
				"ruleType" : "playerName",
				"ruleDesc" : "Bowler with best bowling figures in the match",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus1: {
				"ruleNum": "bonus1",
				"ruleType": "number",
				"ruleDesc" : "Max runs scored by batsman with highest strike rate, only runs greater than 20 will be considered",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted runs is within a tolerance of +-3 of the max runs",
				"rulePoints" : 2,
				"range" : 3
			},

			bonus2: {
				"ruleNum": "bonus2",
				"ruleType": "playerName",
				"ruleDesc" : "Batsman with highest sixes",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus3: {
				"ruleNum": "bonus3",
				"ruleType": "number",
				"ruleDesc" : "Total wickets in the game",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted wickets is within a tolerance of +-1 of the total wickets",
				"rulePoints" : 2,
				"range" : 1
			},

			bonus4: {
				"ruleNum": "bonus4",
				"ruleType": "number",
				"ruleDesc" : "Highest partnership in the game",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted partnership is within a tolerance of +-5 of the max partnership",
				"rulePoints" : 3,
				"range" : 5
			},

			bonus5: {
				"ruleNum": "bonus5",
				"ruleType": "number",
				"ruleDesc" : "Total extras in the game",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted extras is within a tolerance of +-2 of the total extras",
				"rulePoints" : 2,
				"range" : 2
			},

			bonus6: {
				"ruleNum": "bonus6",
				"ruleType": "playerName",
				"ruleDesc" : "Bowler with best economy in the game",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus7: {
				"ruleNum": "bonus7",
				"ruleType": "number",
				"ruleDesc" : "Total dismisals by wicketkeeper in the game, includes catches, runouts (even if it means taking wickets off) and stumpings",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted wickets is within a tolerance of +-1 of the max wickets",
				"rulePoints" : 2,
				"range" : 1
			},

			bonus8: {
				"ruleNum": "bonus8",
				"ruleType": "number",
				"ruleDesc" : "Total runs in sixes in the game",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted runs is within a tolerance of +-3 of the total runs in sixes",
				"rulePoints" : 3,
				"range" : 3
			},

			bonus9: {
				"ruleNum": "bonus9",
				"ruleType": "playerName",
				"ruleDesc" : "Bowler with most dot balls in the game",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus10: {
				"ruleNum": "bonus10",
				"ruleType": "playerName",
				"ruleDesc" : "Batsman with slowest strike rate, minimum 7 balls faced",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus11: {
				"ruleNum": "bonus11",
				"ruleType": "number",
				"ruleDesc" : "How many catches in the game excluding wicket-keeper catches",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted wickets is within a tolerance of +-1 of total catches",
				"rulePoints" : 2,
				"range" : 1
			},

			bonus12: {
				"ruleNum": "bonus12",
				"ruleType": "number",
				"ruleDesc" : "How many wickets taken as bowled in the game",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted wickets is same as bowled wickets",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus13: {
				"ruleNum": "bonus13",
				"ruleType": "number",
				"ruleDesc" : "How many LBWs by bowlers from the winning team",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted wickets is same as LBW wickets",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus14: {
				"ruleNum": "bonus14",
				"ruleType": "playerName",
				"ruleDesc" : "Who will be the NOT OUT player with maximum runs",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus15: {
				"ruleNum": "bonus15",
				"ruleType": "number",
				"ruleDesc" : "How many balls will be remaining for the team batting second at the time of match finish",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted balls is within a tolerance of +-2 of the total balls remaining",
				"rulePoints" : 2,
				"range" : 2
			},

			bonus16: {
				"ruleNum": "bonus16",
				"ruleType": "number",
				"ruleDesc" : "Total runs scored in batting powerplay 1 of both teams",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted runs is within a tolerance of +-3 of the total runs in powerplay 1",
				"rulePoints" : 2,
				"range" : 3
			},

			bonus17: {
				"ruleNum": "bonus17",
				"ruleType": "number",
				"ruleDesc" : "Maximum number of sixes conceded by a bowler",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted sixes is same as the total sixes",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus18: {
				"ruleNum": "bonus18",
				"ruleType": "number",
				"ruleDesc" : "How many ducks in the match",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted ducks is same as total ducks",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus19: {
				"ruleNum": "bonus19",
				"ruleType": "number",
				"ruleDesc" : "Maximum runs conceded by a single bowler in the game",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted runs is within tolerance of +-2 of total runs conceded",
				"rulePoints" : 3,
				"range" : 2
			},

			bonus20: {
				"ruleNum": "bonus20",
				"ruleType": "number",
				"ruleDesc" : "How many players will NOT bat from the winning team",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted number is same as winner number",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus21: {
				"ruleNum": "bonus21",
				"ruleType": "number",
				"ruleDesc" : "Total runs scored by batsmen with highest strike rate from both teams",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted runs is within a tolerance of +-3 of the max runs",
				"rulePoints" : 3,
				"range" : 3
			},

			bonus22: {
				"ruleNum": "bonus22",
				"ruleType": "playerName",
				"ruleDesc" : "Man of the match",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus23: {
				"ruleNum": "bonus23",
				"ruleType": "number",
				"ruleDesc" : "Total run-outs in the game",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted wickets is within a tolerance of +-1 of the total wickets",
				"rulePoints" : 2,
				"range" : 1
			},

			bonus24: {
				"ruleNum": "bonus24",
				"ruleType": "number",
				"ruleDesc" : "Total runs conceded in the first over in both innings of the match",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted runs is within a tolerance of +-1 of the max runs",
				"rulePoints" : 3,
				"range" : 1
			},

			bonus25: {
				"ruleNum": "bonus25",
				"ruleType": "number",
				"ruleDesc" : "How many bowlers in the match with economy rate of less than 6",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted number is same as total bowlers",
				"rulePoints" : 3,
				"range" : 0
			},

			bonus26: {
				"ruleNum": "bonus26",
				"ruleType": "number",
				"ruleDesc" : "How many bowlers in the match with economy rate of less than 8",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted number is same as total bowlers",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus27: {
				"ruleNum": "bonus27",
				"ruleType": "teamName",
				"ruleDesc" : "Which team will concede most extras in the game",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus28: {
				"ruleNum": "bonus28",
				"ruleType": "number",
				"ruleDesc" : "How many balls will the fastest 50 partnership in the game take",
				"ruleFunction" : "isWithinRange",
				"ruleCriteria" : "Check if predicted balls is within a tolerance of +-2 of the total balls",
				"rulePoints" : 3,
				"range" : 2
			},

			bonus29: {
				"ruleNum": "bonus29",
				"ruleType": "playerName",
				"ruleDesc" : "Bowler with most extras in the game",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 2,
				"range" : 0
			},

			bonus30: {
				"ruleNum": "bonus30",
				"ruleType": "playerName",
				"ruleDesc" : "Batsman with highest fours in the match",
				"ruleFunction" : "isEqual",
				"ruleCriteria" : "Check if predicted name is same as winner name",
				"rulePoints" : 2,
				"range" : 0
			}
		};

		var getRules = function(ruleNum) {
			return rules[ruleNum];
		};

		var getRulesDescription = function(ruleNum) {
			return rules[ruleNum].ruleDesc;
		};

		var getRulesType = function(ruleNum) {
			return rules[ruleNum].ruleType;
		};

		return {
			getRules: getRules,
			getRulesDescription: getRulesDescription,
			getRulesType: getRulesType
		};

	} 
);
