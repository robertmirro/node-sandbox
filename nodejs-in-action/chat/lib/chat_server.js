var socketio = require('socket.io');
var io;
var guestNumber = 1;
var guestNicknames = {};
var nicknamesUsed = [];
var currentRoom = {};

exports.listen = function( server ) {
//    console.log( server );

    // start socket.io server and piggyback it on existing http server
    io = socketio.listen( server , { log: false} );  // log:false = turn OFF debug logging
    io.set( 'log-level' , 1 );  // default = 1

    // handle each socket (user) connection
    io.sockets.on( 'connection' , function( socket ) {
//        console.log( 'connected to socket.id:' , socket.id) ;

        guestNumber = assignGuestName( socket , guestNumber , guestNicknames , nicknamesUsed );
        joinRoom( socket , 'Lobby' );

        handleMessageBroadcasting( socket , guestNicknames );
        handleNameChangeAttempts( socket , guestNicknames , nicknamesUsed );
        handleRoomJoining( socket );

        // handles requests for list of occupied rooms
        socket.on( 'rooms' , function() {
            socket.emit( 'rooms' , io.sockets.manager.rooms );
        });

        handleClientDisconnection( socket , guestNicknames , nicknamesUsed );
    });
};

function assignGuestName( socket , guestNumber , guestNicknames , nicknamesUsed ) {
    var name = 'Guest' + guestNumber;
    guestNicknames[ socket.id ] = name;
    nicknamesUsed.push( name );

    socket.emit( 'nameResult' , { success: true , name: name } );
    return ++guestNumber;
}

function joinRoom( socket , roomName ) {
//    console.log( 'joinRoom - roomName: %s - %s' , roomName , socket.id );
    socket.join( roomName );
    currentRoom[ socket.id ] = roomName;

    socket.emit( 'joinResult' , { roomName: roomName } );
    socket.broadcast.to( roomName ).emit( 'message' , { text: guestNicknames[ socket.id ] + ' has joined ' + roomName + '.' } );

    var usersInRoom = io.sockets.clients( roomName );
//    console.log( 'usersInRoom.length:' , usersInRoom.length );
//    console.log( 'usersInRoom:' , usersInRoom );
    if (usersInRoom.length <= 1) {
        return;
    }

    var usersInRoomMessage = 'Users currently in ' + roomName + ': ';
    for ( var index in usersInRoom ) {
        var userSocketId = usersInRoom[ index ].id;
        if ( userSocketId !== socket.id ) {
            if ( index > 0 ) {
                usersInRoomMessage += ', ';
            }
            usersInRoomMessage += guestNicknames[ userSocketId ];
        }
    }
    usersInRoomMessage += '.';
//    console.log( 'usersInRoomMessage: %s' , usersInRoomMessage );
    socket.emit( 'message' , { room: roomName ,  text: usersInRoomMessage } );
}

function handleNameChangeAttempts( socket , guestNicknames , nicknamesUsed ) {
    socket.on( 'nameAttempt' , function( name ) {
        if ( name.indexOf('Guest') == 0 ) {
            return socket.emit( 'nameResult' , { success: false , message: 'Names cannot begin with "Guest".' } );
        }
        if ( nicknamesUsed.indexOf( name ) >= 0) {
            return socket.emit( 'nameResult' , { success: false , message: 'The name "' + name + '" is already in use.' } );
        }

        var previousName = guestNicknames[ socket.id ];
        var previousNameIndex = nicknamesUsed.indexOf( previousName );

        nicknamesUsed.push( name );
        guestNicknames[ socket.id ]= name;
        delete nicknamesUsed[ previousNameIndex ];

        socket.emit( 'nameResult' , { success: true , name: name } );
        socket.broadcast.to( currentRoom[ socket.id] ).emit( 'message' , { text: previousName + ' is now known as ' + name + '.' } );
    });
}

function handleMessageBroadcasting( socket , guestNicknames ) {
//    console.log( 'handleMessageBroadcasting.on INIT' );
    socket.on( 'message' , function( message ) {
//        console.log( 'handleMessageBroadcasting.on MESSAGE' , message );
//        console.log( 'guestNicknames[ socket.id ]' , guestNicknames[ socket.id ]);
//        console.log( 'guestNicknames[]' , guestNicknames);
        socket.broadcast.to( message.room ).emit( 'message' , { text: guestNicknames[ socket.id ] + ': ' + message.text } );
    });
}

function handleRoomJoining( socket ) {
    socket.on( 'join' , function( room ) {
        socket.leave( currentRoom[ socket.id ] );
        joinRoom( socket , room.newRoom );
    });
}

function handleClientDisconnection( socket , guestNicknames , nicknamesUsed ) {
    socket.on( 'disconnect' , function(  ) {
        var nameIndex = nicknamesUsed.indexOf( guestNicknames[ socket.id ] );
        delete nicknamesUsed[ nameIndex ];
        delete guestNicknames[ socket.id ];
    });
}