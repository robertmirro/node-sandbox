var express = require('express');
var router = express.Router();

// GET list of users from DB, return as JSON data
// http://localhost:3000/users/userlist
router.get( '/userlist' , function ( req , res ) {
    req.db.collection( 'users').find().toArray( function( err , records ) {
        res.json( records );
    });
});

module.exports = router;