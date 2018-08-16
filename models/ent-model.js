let Connection = require('tedious').Connection;
let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;
let config = require('./../config');


function EntitlementModel() {
}

EntitlementModel.prototype = {
	getEntitlement: function(entId, callback) {
		console.log("EntitlementModel.getEntitlement() - fguid=[" + entId + "]");

		var connection = new Connection(config);	
		connection.on('connect', function(err) {
			var result = "{ ";
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
					if ( i > 0 )
						result += ","
					i++;
					result += "\"";
					result += column.metadata.colName;
					result += "\"";
					result += ": ";
					if ( column.metadata.type.name == "VarChar" ) {
						result += "\"";
						result += column.value;
						result += "\"";
					}
					else
						result += column.value;
					console.log(column.metadata.type.name + ":" + column.metadata.colName + ":" + column.value);
				      }
				    });
				  });

				  request.on('requestCompleted', function(rowCount, more) {
					// console.log(rowCount + ' rows returned');
					result += " }";
					console.log("JSON:" + result);
					connection.close();
					callback(null, result);  
				  });
			};
			connection.execSql(request);
		});
	}
}

module.exports = EntitlementModel;
