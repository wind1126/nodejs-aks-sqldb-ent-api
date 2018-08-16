let config = {}

config.server = "xxxxx.database.windows.net";
config.userName = "xxxxx";
config.password = "xxxxx";
config.options = {
		rowCollectionOnRequestCompletion: true,
		database: "xxxxx",
		encrypt: true
	}

module.exports = config;
