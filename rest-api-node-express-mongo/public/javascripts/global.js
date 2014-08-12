var userListData = [];

$( document ).ready( function() {
    populateTable();
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
        $.each( data , function() {
            tableContent += tableRow.replace( /#USERNAME#/gi , this.username )
                .replace( /#EMAIL#/gi , this.email )
                .replace( /#_ID#/gi , this._id );
        });
//        console.log( tableContent );
        $( '#userList table tbody' ).html( tableContent );
    });
}