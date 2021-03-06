var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Transfer = mongoose.model('Transfer');

module.exports = function route(app) {
  app.use('/api/transfers', router);
};

/**
  @api {post} /transfers 
  @apiName CreateTransfer
  @apiGroup Transfer *
  @apiParam {Object}
  @apiSuccess {String} result.
*/

router.post('/', function (req, res) {
  var newTransfer = {
    amount: req.body.amount, 
    message: req.body.message || '',
    recipient: req.body.recipient,
    sender: req.user.id,
    currency: req.body.currency,
    status: 'completed'
  };

  Transfer.create(newTransfer, function(err, result) {
    if (err) {
      res.status(400).json({error: err});
      return;
    };

    res.json({ result: result });
  });
})

/**
  @api {delete} /transfers 
  @apiName DeleteTransfer
  @apiGroup Transfer *
  @apiParam {Object}
  @apiSuccess {String} deleted record.
*/

router.delete('/:id', function (req, res) {
  
  Transfer.findOne({sender:req.user.id, _id: req.params.id}, function (err, doc) {
    if (err || !doc) {
      res.status(400).json({error: err});
      return;
    }

    doc.status = 'deleted';
    doc.save(function() {
      res.json({result: doc});
    });
  });

})

/**
  @api {get} /transfers 
  @apiName GetTransfers
  @apiGroup Transfer *
  @apiParam {String}
  @apiSuccess {Array} of transactions.
*/

router.get('/', function (req, res) {
  Transfer.find({sender:req.user.id}, function(err, result) {
    if (err) {
      res.status(400).json({error: err});
      return;
    };

    res.json({result: result});
  }).populate('recipient', 'info.name');
})

/**
  @api {get} /transfers/:id
  @apiName GetTransfer
  @apiGroup Transfer *
  @apiParam {String}
  @apiSuccess {Object} transaction.
*/

router.get('/:id', function (req, res) {
  Transfer.findOne({sender:req.user.id, _id: req.params.id}, function(err, result) {
    if (err) {
      res.status(400).json({error: err});
      return;
    };

    res.json({result: result});
  }).populate('recipient', 'info');
})
