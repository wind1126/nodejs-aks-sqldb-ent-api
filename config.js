let config = {}

config.server = "pariksazdb.database.windows.net";
config.userName = "ganesh";
config.password = "f5help!!";
config.options = {
		rowCollectionOnRequestCompletion: true,
		database: "licensed",
		encrypt: true
	}

module.exports = config;
