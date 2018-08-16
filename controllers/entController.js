let Connection = require('tedious').Connection;
let async = require('async');

function EntitlementController(entModel) {
	this.entitlementModel = entModel;
}

EntitlementController.prototype = {

getEntitlement: function(req, res) {
		console.log("EntitlementController.getEntitlement()");
		let self = this;

		self.entitlementModel.getEntitlement(req.params.id, function(err, item) {
			if (err) {
				throw err;
			}
			else {
				res.send(item);
			};
		});
	}
}

module.exports = EntitlementController;
