var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reposSchema = new Schema({
    _id: Schema.ObjectId ,
    name: String
});

mongoose.model( 'github_repos' , reposSchema );
