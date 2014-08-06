var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reposSchema = new Schema( {
    name: String
});

mongoose.model( 'github_repos' , reposSchema );
