var express = require('express');
var router = express.Router();

/* GET list of users from DB, return as JSON data */
router.get( '/userslist' , function ( req , res ) {
    req.db.collection( 'users').find().toArray( function( err , records ) {
        res.json( records );
    });
});

module.exports = router;
