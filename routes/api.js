var TTModel = require('../database/timetracker'),
	promise = require('promise'); //Our database configuration

function getCollisions(from, to) {
	return new promise(function (resolve, reject) {
		TTModel.find({
			$or: [
				{
					from: {$lt: new Date(to)},
					to: {$gt: new Date(from)}
				}
			]
		}).exec(function(err, items) {
			if (!err) {
				resolve(items);
			}
			else {
				reject(err.message);
			}
		});
	});
}

function isSameDay(from, to) {
	return new Date(from).toDateString() === new Date(to).toDateString();
}

/*function getIntervalsCount(from, to) {
	return new promise(function (resolve, reject) {
		TTModel.find({
			from: {$gte: new Date(from.toDateString() + " 00:00:00")},
			to: {$lte: new Date(from.toDateString() + " 23:59:59")},
		}).exec(function(err, items) {
			if (!err) {
				var sum = 0;

				items.forEach(function (item) {
					sum += new Date(item.to).getTime() - new Date(item.from).getTime();
				});

				resolve(sum);
			}
			else {
				reject(err.message);
			}
		});
	});
}*/

// api index route

exports.apiindex = function (req, res) {
	res.send("TimeTracker API");
}

// elemek listazasa

exports.list = function (req, res) {
	return TTModel.find(function(err, items) {
		if (!err) {
			var sum = 0;

			items.forEach(function (item) {
				sum += new Date(item.to).getTime() - new Date(item.from).getTime();
			});

			return res.send(items);
		}
		else {
			return console.log(err.message);
		}
	});
};

// adott elem kivalasztasa id alapjan

exports.show = function (req, res) {
	return TTModel.findById(req.params.id, function(err, item) {
		if (!err) {
			return res.send(item);
		}
		else {
			return console.log(err.message);
		}
	});
};

// adott elem kivalasztasa intervallum alapjan

exports.byinterval = function (req, res) {
	var d = new Date(parseInt(req.params.timestamp));

	return TTModel.find({
		from: {
			$gte: new Date(d.toDateString() + " 00:00:00"),
			$lte: new Date(d.toDateString() + " 23:59:59")
		}
	}).exec(function(err, item) {
		if (!err) {
			return res.send(item);
		}
		else {
			return console.log(err.message);
		}
	});
};

// uj elem beszurasa

exports.create = function(req, res) {
	 var ttItem = new TTModel({
			 category: req.body.category,
			 subcategory: req.body.subcategory,
			 from: new Date(req.body.from),
			 to: new Date(req.body.to),
			 note: req.body.note
		 });

	if (!isSameDay(req.body.from, req.body.to)) {
		res.status(500).send({error: 'Két időpontnak egy napra kell esnie!'})
	}
	else {
		/*getIntervalsCount(req.body.from, req.body.to).then(function (sum) {
			res.status(500).send({error: 'sum'})
		});*/

		getCollisions(req.body.from, req.body.to).then(function (coll) {
			if (coll.length) {
				res.status(500).send({error: 'Intervallum ütközés. Két intervallum nem fedheti egymást!'})
			}
			else {
				ttItem.save(function(err) {
					if (!err) {
						res.send({});
						return console.log('db record created');
					}
					else {
						res.status(404).send({error: err.message});
						return console.log(err.message);
					}
				});
			}
		}, function (err) {
			console.log(err);
		});
	}
}

// elem torlese

exports.remove = function(req, res) {
	console.log('rekord torlese: ' + req.params.id);

	return TTModel.findById(req.params.id, function(err, item) {
		if (item) {
			return item.remove(function(err) {
				if (!err) {
					console.log('rekord torolve');
					return res.status(200).json({success: true});
				}
				else {
					console.log(err.message);
				}
			});
		}

		var err = 'A keresett elem nem létezik.';
		console.log(err);
		return res.status(404).send({error: err});
	});
};

// report kuldese emailban

exports.sendmail = function (req, res) {
	console.log("Email kuldese a kovetkezo cimre: " + req.body.email);
	return res.send({});
}
