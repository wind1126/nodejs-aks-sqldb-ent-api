let config = {}

config.server = "xxxx.database.windows.net";
config.userName = "xxxx";
config.password = "xxxx";
config.options = {
		rowCollectionOnRequestCompletion: true,
		database: "xxxx",
		encrypt: true
	}

module.exports = config;
