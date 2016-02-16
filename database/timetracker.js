/*
 * Database configuration
 */

var mongoose = require( 'mongoose' ); // MongoDB integration

mongoose.connect( 'mongodb://localhost/timetracker' ); //Connect to database

var TTItem = new mongoose.Schema({
	category: Number,
	subcategory: Number,
	from: Date,
	to: Date,
	note: String
});

module.exports = mongoose.model( 'TTItem', TTItem );
