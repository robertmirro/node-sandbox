var userListData = [];

$( document ).ready( function() {
    populateTable();

    // attach click handler to all username links
    $( '#userList table tbody' ).on( 'click' , 'td a.linkshowuser' , showUserInfo );
});

function populateTable() {
    var tableRow = '<tr>' +
            '<td><a href="#" class="linkshowuser" rel="#USERNAME#" title="Show Details">#USERNAME#</a></td>' +
            '<td>#EMAIL#</td>' +
            '<td><a href="#" class="linkdeleteuser" rel="#_ID#">delete</a></td>' +
            '</tr>' ,
        tableContent = '';

    $.getJSON( '/users/userlist' , function( data ) {
//        console.log( 'json data:' , data );
        // store user data globally just as a quick/dirty solution to persistence
        userListData = data;

        $.each( data , function() {
            tableContent += tableRow.replace( /#USERNAME#/gi , this.username )
                .replace( /#EMAIL#/gi , this.email )
                .replace( /#_ID#/gi , this._id );
        });
//        console.log( tableContent );

        $( '#userList table tbody' ).html( tableContent );
    });
}

function showUserInfo( event ) {
    // prevent link from firing
    event.preventDefault();

    var thisUserName = $( this ).attr( 'rel' );

    // map all usernames to array, find index of this username
    var arrayIndex = userListData.map( function( userObject ) {
        return userObject.username;
    }).indexOf( thisUserName );
    console.log( 'username: %s , index: %s' , thisUserName , arrayIndex );

    var thisUserObject = userListData[ arrayIndex ];

    $( '#userFullName' ).text( thisUserObject.fullname );
    $( '#userAge' ).text( thisUserObject.age );
    $( '#userGender' ).text( thisUserObject.gender );
    $( '#userLocation' ).text( thisUserObject.location );
}