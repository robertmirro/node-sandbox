var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactsSchema = new Schema( {
    name: String
});

mongoose.model( 'contacts' , contactsSchema );
