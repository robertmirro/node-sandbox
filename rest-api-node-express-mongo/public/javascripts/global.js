var userListData = [];

$( document ).ready( function() {
    populateTable();

    // attach click handler to all username links to display user details
    $( '#userList table tbody' ).on( 'click' , 'td a.linkshowuser' , showUserInfo );

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
        'username': $('#addUser fieldset input#inputUserName').val(),
        'email': $('#addUser fieldset input#inputUserEmail').val(),
        'fullname': $('#addUser fieldset input#inputUserFullName').val(),
        'age': $('#addUser fieldset input#inputUserAge').val(),
        'location': $('#addUser fieldset input#inputUserLocation').val(),
        'gender': $('#addUser fieldset input#inputUserGender').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/adduser',
        dataType: 'JSON'
    }).done( function( response ) {
        // Check for successful (blank) response
        if ( response.msg === '' ) {
            // Clear the form inputs
            $( '#addUser fieldset input' ).val('');

            // Update the table
            populateTable();
        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert( 'Error: ' + response.msg );
        }
    });
}