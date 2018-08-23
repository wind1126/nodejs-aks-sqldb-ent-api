let Connection = require('tedious').Connection;
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;
let config = require('./../config');


function EntitlementModel() {
}

EntitlementModel.prototype = {
	getInfo: function(callback) {
		console.log("EntitlementRouter() - Get /");
		var result = {
			name: 'Entitlement Controller',
			desccription: 'API for Entitlements',
			owner: 'Microsoft Inc. Copyright @2018.  All rights reserved.',
			getUrl: 'https://<IP>/entitlements/{fguid}'
		};

		callback(null, result);
	},
	getEntitlement: function(entId, callback) {
		console.log("EntitlementModel.getEntitlement() - fguid=[" + entId + "]");

		var connection = new Connection(config);	
		connection.on('connect', function(err) {
			var result = {};
			let query = "SELECT l.fguid, l.licenseid, s.capacity FROM licenses l inner join subscriptions s on l.licenseid = s.licenseid where l.fguid = @fguid";
			if ( err ) {
				console.log("Connection ERR: " + err);
			}
			else {
				var request = new Request(query, function(err, rowCount, rows) {
					if ( err ) {
						console.log("Request ERR: " + err);
					}
					else {
						console.log("Rows=" + rowCount + ", Metadata JSON=" + JSON.stringify(rows));
					};
				});
				request.addParameter('fguid', TYPES.VarChar, entId);
				request.on('row', function(columns) {
				    var i = 0;
				    columns.forEach(function(column) {
				      if (column.value === null) {
					console.log('NULL');
				      } else {
					result[column.metadata.colName] = column.value;
				      }
				    });
				  });

				  request.on('requestCompleted', function(rowCount, more) {
					// console.log(rowCount + ' rows returned');
				    	console.log("JSON:" + JSON.stringify(result));
					connection.close();
					callback(null, result);  
				  });
			};
			connection.execSql(request);
		});
	}
}

module.exports = EntitlementModel;
