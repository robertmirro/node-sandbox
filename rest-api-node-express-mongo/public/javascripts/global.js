var userListData = [];

$( document ).ready( function() {
    populateTable();

    // attach click handler to all username links to display user details
    $( '#userList table tbody' ).on( 'click' , 'td a.linkshowuser' , showUserInfo );

    // attach click handler to all username links to display user details
    $( '#userList table tbody' ).on( 'click' , 'td a.linkdeleteuser' , deleteUser );

    // update user button
    $( '#btnUpdateUser' ).on( 'click' , updateUser );

    // cancel update button
    $( '#btnCancelUpdate' ).on( 'click' , cancelUpdate );

    // add user button click handler to post to /users/adduser
    $( '#btnAddUser' ).on( 'click' , addUser );
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

    $( '#userInfo' ).show();
    $( '#userInfoDetails' ).hide();

    var thisUserName = $( this ).attr( 'rel' );

    // map all usernames to array, find index of this username
    var arrayIndex = userListData.map( function( userObject ) {
        return userObject.username;
    }).indexOf( thisUserName );
//    console.log( 'username: %s , index: %s' , thisUserName , arrayIndex );

    var thisUserObject = userListData[ arrayIndex ];

    $( '#userFullName' ).text( thisUserObject.fullname );
    $( '#userAge' ).text( thisUserObject.age );
    $( '#userGender' ).text( thisUserObject.gender );
    $( '#userLocation' ).text( thisUserObject.location );
}

function updateUser( event ) {
    event.preventDefault();

    $( '#userInfoDetails' ).show();
    $( '#userInfo' ).hide();
}

function cancelUpdate( event ) {
    event.preventDefault();

    $( '#userInfo' ).show();
    $( '#userInfoDetails' ).hide();
}

function addUser( event ) {
    event.preventDefault();

    var errorCount = 0;
    $( '#addUser input' ).each( function( index , val ) {
        if( $(this).val() === '' ) {
            errorCount++;
        }
    });
    if( errorCount !== 0 ) {
        return alert( 'Please fill in all fields' );
    }

    // If it is, compile all user info into one object
    var newUser = {
        'username': $('#inputUserName').val(),
        'email': $('#inputUserEmail').val(),
        'fullname': $('#inputUserFullName').val(),
        'age': $('#inputUserAge').val(),
        'location': $('#inputUserLocation').val(),
        'gender': $('#inputUserGender').val()
    }

    $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/adduser',
        dataType: 'JSON'
    }).done( function( response ) {
        if ( response.msg === '' ) {
            // Clear the form inputs
            $( '#addUser fieldset input' ).val('');

            populateTable();
        }
        else {
            alert( 'Error: ' + response.msg );
        }
    });
}

function deleteUser(event) {
    event.preventDefault();

    if ( confirm( 'Are you sure you want to delete this user?' ) ) {
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert( 'Error: ' + response.msg );
            }

            populateTable();
        });

    }
};