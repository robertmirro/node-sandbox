var socketio = require('socket.io');
var io;
var guestNumber = 1;
var guestNicknames = {};
var nicknamesUsed = [];
var currentRoom = {};

exports.listen = function( server ) {
//    console.log( server );

    // start socket.io server and piggyback it on existing http server
    io = socketio.listen( server );
    io.set( 'log-level' , 1);

    // handle each socket (user) connection
    io.sockets.on( 'connection' , function( socket ) {
        console.log( 'connected to socket.id:' , socket.id) ;

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

    socket.emit( 'nameResult' , { success: true , name: name });
    return ++guestNumber;
}

function joinRoom( socket , roomName ) {
    socket.join( roomName );
    currentRoom[ socket.id ] = roomName;

    socket.emit( 'joinResult' , { roomName: roomName });
    socket.broadcast.to( roomName ).emit( 'message' , { text: guestNicknames[ socket.id ] + ' has joined ' + roomName + '.' });

    var usersInRoom = io.sockets.clients( roomName );
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
        usersInRoomMessage += '.';
        socket.emit( 'message' , { text: usersInRoomMessage });
    }
}