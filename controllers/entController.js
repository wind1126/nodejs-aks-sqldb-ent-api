let Connection = require('tedious').Connection;
let async = require('async');

function EntitlementController(entModel) {
	this.entitlementModel = entModel;
}

EntitlementController.prototype = {
	getInfo: function(req, res) {
		console.log("EntitlementController.getInfo()");
		let self = this;

		self.entitlementModel.getInfo(function(err, item) {
			if (err) {
				throw err;
			}
			else {
				res.json(item);
			};
		});
	},
	getEntitlement: function(req, res) {
		console.log("EntitlementController.getEntitlement()");
		let self = this;

		self.entitlementModel.getEntitlement(req.params.id, function(err, item) {
			if (err) {
				throw err;
			}
			else {
				res.json(item);
			};
		});
	}
}

module.exports = EntitlementController;
