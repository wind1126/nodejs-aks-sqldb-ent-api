var express = require('express');
var router = express.Router();

var Connection = require('tedious').Connection;
// var config = require('../../config');
var EntitlementModel = require('../../models/ent-model');
var EntitlementController = require('../../controllers/entController');

// var connection = new Connection(config);

let entModel = new EntitlementModel();
let entController = new EntitlementController(entModel);

// Routes
router.get('/', entController.getInfo.bind(entController));

// Get details of a single order
router.get('/:id', entController.getEntitlement.bind(entController));

// Create a new purchase order
// router.post('/create', orderController.createOrder.bind(orderController));

// Update an order
// router.post('/:id/update', orderController.updateOrder.bind(orderController));

// Delete an order
// router.post('/:id/delete', orderController.deleteOrder.bind(orderController));

module.exports = router;
