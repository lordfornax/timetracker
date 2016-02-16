var path = require('path');

exports.index = function(req, res){
	res.render("../views/index");
};

exports.additem = function(req, res){
	res.render("../views/index");
};

exports.report = function(req, res){
	res.render("../views/index");
};

exports.fromJade = function(req, res) {
	return res.render(path.join("../", req.params[0]));
}
