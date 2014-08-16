var express = require('express');
var router = express.Router();

// GET list of users from DB, return as JSON object
// http://localhost:3000/users/userlist
router.get( '/userlist' , function ( req , res ) {
    req.db.collection( 'users' ).find().toArray( function( err , records ) {
        res.json( records );
    });
});

// POST from add user, insert into DB
router.post( '/adduser' , function( req , res ) {
    console.log( 'req.body:' , req.body );
    req.db.collection( 'users' ).insert( req.body , function( err , result ) {
        res.send( { msg : ( err === null ? '' : err ) } );
    });
})

// PUT from save user information, update user in DB
router.put( '/updateuser/:userid' , function( req , res ) {
    req.db.collection( 'users' ).updateById( req.params.userid , { $set: req.body } , function( err , result ) {
        res.send( { msg : ( result === 1 ? '' : 'error: ' + err ) } );
    });
})

// DELETE from user list, remove user from DB
router.delete( '/deleteuser/:userid' , function( req , res ) {
    req.db.collection( 'users' ).removeById( req.params.userid , function( err , result ) {
        res.send( { msg : ( result === 1 ? '' : 'error: ' + err ) } );
    });
})

module.exports = router;