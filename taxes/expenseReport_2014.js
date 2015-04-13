(function() {
    'use strict';

    var fs = require('fs');
    var stream = require('stream');
    var _ = require('lodash');
    var moment = require('moment');
    var numeral = require('numeral');

    // console.log( moment('01\\10\\1971', 'MM-DD-YYYY').toDate().getTime() );

    var theDate = '01/10/1971';
    // theDate = 'bob';
    theDate = '01/bob/1971'
    theDate = '01/19/1971'
    var expenseDate = moment(theDate, 'MM-DD-YYYY');
    console.log('isValid', expenseDate.isValid(), expenseDate.toDate().getTime());

    var theAmount = '$4b,ob8.95';
    console.log('theAmount:', numeral().unformat(theAmount));
 
    function readStream(fileName) {
        var rs;
        var file, fileLines;
        var expenses, expenseDate, expenseAmount;

        var validDate = /^\d{2}\/\d{2}\/\d{2}$/;
        var validAmount = /^"?\$(([1-9]\d{0,2}(,\d{3})*)|\d+)?\.\d{2}"?$/; // REQUIRED: $ , decimal with 2 positions and leading number even if zero, OPTIONAL: containing double quotes, comma thousands seperator

        fileName = (fileName || 'Expenses 2014 New 2.txt');
        file = fs.readFileSync(fileName, 'utf8');
        fileLines = file.split('\n');

        expenses = [];
        _.forEach(fileLines, function(expense) {
            expense = expense.split('\t');

            if (expense[0] && expense[1] && expense[3] && expense[4] && validDate.test(expense[0]) && validAmount.test(expense[1])) {
                expenseDate = moment(expense[0], 'MM-DD-YY');
                expenseAmount = numeral().unformat(expense[1]);

                if (expenseDate.isValid()) {
                    console.log('\n', expense, '\n');
                    console.log('expenseDate:', expense[0], '---', expenseDate.toDate().getTime(), '\n');
                    console.log('expenseAmount:', expenseAmount, '---', typeof expenseAmount, '\n');
                }
            }
            // console.log('expense:', expense, '\n');
        });

        // console.log('fileLines:', fileLines);

        rs = stream.Readable();
        rs._read = function( size ) {
    console.log('_read...');        
            if ( currentWord >= maxWords ) {
                // null terminator to inform consumer that data is done being output
                return rs.push( null );
            }

            currentWord++;

            // simulate a delay and illustrate async processing
            setTimeout( function() {
                var randomIndex = Math.floor( Math.random() * words.length ) ;
                rs.push( currentWord + '. ' + words[ randomIndex ] /* + '\n' */ );
            }, 100 );
        };

        // return an instance of our stream
        return rs;
    }

    function writeStream() {
        var ws = stream.Writable();
        ws._write = function( dataChunk , encoding , nextCb ) {
            console.log( dataChunk.toString() );

            // simulate a delay and illustrate async processing
            // inform producer we are ready for next dataChunk
            // nextCb();
            setTimeout( nextCb , 100 );
        };
        return ws;
    }

    // act as BOTH a read AND write stream
    function transformStream() {
        var ts = stream.Transform();
        ts._transform = function( dataChunk , encoding , nextCb ) {
    //        console.log( 'chunk: %s\n' , dataChunk.toString() + '(' + ')' );
            // transform pass-thru data to UPPERCASE and push it out to write stream
            // display original word text in parens (split word from index + word)
            var wordString = dataChunk.toString().trim();
            ts.push( wordString.toUpperCase() + ' (' + wordString.split(' ')[1] + ')' );

            // simulate a delay and illustrate async processing
            // inform producer we are ready for next dataChunk
            // nextCb();
            setTimeout( nextCb , 100 );
        };
        return ts;
    }

    // pass maxWords as a command line arg
    var rs = readStream(process.argv[2]);
    // console.log('AFTER randomWordStream');
    var ws = writeStream();
    var ts = transformStream();
    // rs.pipe(ts).pipe(ws);

    // test - display 10 words:
    // $ node readable_writable_transform_stream_random_word.js 10
    //
    // test - display words infinitely -
    // $ node readable_writable_transform_stream_random_word.js

    function expenseTypes() {
        var expenseTypes = [];

        addType(expenseTypes, 'Book', 'Computer Books [Other Exp: Educational Exp]', 0);
        addType(expenseTypes, 'Bus Ins', 'Business Insurance', 0);
        addType(expenseTypes, 'Cell', '', 0);
        addType(expenseTypes, 'Conf', '', 0);
        addType(expenseTypes, 'Meals', '', 0);
        addType(expenseTypes, 'Furn', '', 0);
        addType(expenseTypes, 'Hard', '', 0);
        addType(expenseTypes, 'Lodging', '', 0);
        addType(expenseTypes, 'Ins', '', 0);
        addType(expenseTypes, 'Mag', '', 0);
        addType(expenseTypes, 'Mem', '', 0);
        addType(expenseTypes, 'Misc', '', 0);
        addType(expenseTypes, 'MiscMed', '', 0);
        addType(expenseTypes, 'MiscEdu', '', 0);
        addType(expenseTypes, 'Net', '', 0);
        addType(expenseTypes, 'Phone', '', 0);
        addType(expenseTypes, 'Postage', '', 0);
        addType(expenseTypes, 'Rent', '', 0);
        addType(expenseTypes, 'Mort', '', 0);
        addType(expenseTypes, 'MortEscrow', '', 0);
        addType(expenseTypes, 'Sec', '', 0);
        addType(expenseTypes, 'Soft', '', 0);
        addType(expenseTypes, 'Supplies', '', 0);
        addType(expenseTypes, 'Tax', '', 0);
        addType(expenseTypes, 'Toll', '', 0);
        addType(expenseTypes, 'UtilSprag', '', 0);
        addType(expenseTypes, 'Util', '', 0);
        addType(expenseTypes, 'UtilHalf', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        addType(expenseTypes, '', '', 0);
        return expenseTypes;

        function addType(expenseTypes, type, description, sortOrder, excludeType) {
            if (excludeType) {
                return;
            }

            expenseTypes.push({
                'type': type,
                'description': description,
                'sortOrder': sortOrder
            });
        }  
    }

})();
