var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactsSchema = new Schema({
//    _id: Schema.ObjectId ,
    name: String
//    ,
//    owner: {
//        type: Schema.ObjectId ,
//        ref: 'owners'
//    }
});

mongoose.model( 'contacts' , contactsSchema );
