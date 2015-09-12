(function() {
    'use strict';

    var fs = require('fs');
    var stream = require('stream');
    var _ = require('lodash');
    var moment = require('moment');
    var numeral = require('numeral');

    var rs = readStream(process.argv[2], 'INVALID');
    var ws = writeStream();
    var ts = transformStream();
    rs.pipe(ts).pipe(ws);


    // console.log( moment('01\\10\\1971', 'MM-DD-YYYY').toDate().getTime() );

    // var theDate = '01/10/1971';
    // // theDate = 'bob';
    // theDate = '01/bob/1971'
    // theDate = '01/19/1971'
    // var expenseDate = moment(theDate, 'MM-DD-YYYY');
    // console.log('isValid', expenseDate.isValid(), expenseDate.toDate().getTime());

    // var theAmount = '$4b,ob8.95';
    // console.log('theAmount:', numeral().unformat(theAmount));

    function createExpenseReport() {
        fileName, invalidExpenseType
    }

    function readStream(fileName, invalidExpenseType) {
        var rs;
        var file, fileLines;
        var expenseTypes, expenses, expenseDate, expenseAmount, expenseType, expenseDescription, typeIsInvalid, expenseTypesToProcess, expenseCount;

        var validDate = /^\d{2}\/\d{2}\/\d{2}$/;
        var validAmount = /^"?\$(([1-9]\d{0,2}(,\d{3})*)|\d+)?\.\d{2}"?$/; // REQUIRED: $ , decimal with 2 positions and leading number even if zero, OPTIONAL: containing double quotes, comma thousands seperator

        fileName = (fileName || 'Expenses 2014 New.txt');
        file = fs.readFileSync(fileName, 'utf8');
        // console.log('file:', file);
        fileLines = file.split('\n');
        // console.log('fileLines:', fileLines);

        expenseTypes = _.sortByAll(expenseTypesList(invalidExpenseType), ['sortOrder', 'description']);
        // console.log('expenseTypes:', expenseTypes);

        expenses = [];
        _.forEach(fileLines, function(expense) {
            expense = expense.split('\t');

            if (expense[0] && expense[1] && expense[3] && expense[4] && validDate.test(expense[0]) && validAmount.test(expense[1])) {
                expenseDate = moment(expense[0], 'MM-DD-YY');

                if (expenseDate.isValid()) {
                    expenseAmount = numeral().unformat(expense[1]);
                    expenseType = expense[3];
                    expenseDescription = (typeof expense[4] === 'string' ? expense[4].trim() : 'Invalid Expense Description');

                    typeIsInvalid = !expenseTypeIsValid(expenseTypes, expenseType);

                    expenses.push({
                        'type': (typeIsInvalid ? invalidExpenseType : expenseType),
                        'displayDate': expenseDate.format('MM/DD/YYYY'),
                        'sortByDate': expenseDate.toDate().getTime(),
                        'displayAmount': numeral(expenseAmount).format('$0,0.00'),
                        'calculateAmount': expenseAmount,
                        'description': (typeIsInvalid ? '[TYPE: ' + expenseType + '] ' : '') + expenseDescription
                    });
                }
            }
            // console.log('expense:', expense, '\n');
        });
        console.log('\n\nexpenses:\n', expenses);

        expenses = _.sortBy(expenses, 'sortByDate');
        console.log('\n\nexpenses sorted:\n', expenses);

        expenseTypesToProcess = _.filter(expenseTypes, function(expenseType) {
            // returns { false: 5, true: 2 } when value is found/counted or { false: 7 } when value is not found/counted
            expenseType.expenseCount = _.countBy(expenses, {
                'type': expenseType.type
            }).true;
            return expenseType.expenseCount > 0;
        });
        // console.log('expenseTypesToProcess:', expenseTypesToProcess);


        var currentWord = 0;

        rs = stream.Readable();
        rs._read = function(size) {
            console.log('_read...');
            if (currentWord >= 4 /* maxWords */) {
                // null terminator to inform consumer that data is done being output
                return rs.push(null);
            }

            currentWord++;

            // simulate a delay and illustrate async processing
            setTimeout(function() {
                console.log('_read before rs.push...');
                //rs.push(currentWord.toString());
                // var randomIndex = Math.floor( Math.random() * words.length ) ;
                // rs.push( currentWord + '. ' + words[ randomIndex ] /* + '\n' */ );
            }, 100);
        };

        // return an instance of our stream
        return rs;
    }

    function writeStream() {
        var ws = stream.Writable();
        ws._write = function(dataChunk , encoding , nextCb) {
            console.log('write:', dataChunk.toString());

            // simulate a delay and illustrate async processing
            // inform producer we are ready for next dataChunk
            // nextCb();
            setTimeout(nextCb , 100);
        };
        return ws;
    }

    // act as BOTH a read AND write stream
    function transformStream() {
        var ts = stream.Transform();
        ts._transform = function(dataChunk , encoding , nextCb) {
            //        console.log( 'chunk: %s\n' , dataChunk.toString() + '(' + ')' );
            // transform pass-thru data to UPPERCASE and push it out to write stream
            // display original word text in parens (split word from index + word)
            var wordString = dataChunk.toString().trim();
            // ts.push( wordString.toUpperCase() + ' (' + wordString.split(' ')[1] + ')' );
            ts.push(wordString.toUpperCase());

            // simulate a delay and illustrate async processing
            // inform producer we are ready for next dataChunk
            // nextCb();
            setTimeout(nextCb , 100);
        };
        return ts;
    }

    function expenseTypesList(invalidExpenseType) {
        var expenseTypes = [];

        addType(expenseTypes, 'Book',       'Computer Books [Other Exp: Educational Exp]', 0);
        addType(expenseTypes, 'Bus Ins',    'Business Insurance', 0);
        addType(expenseTypes, 'Cell',       'Business Cell Phone [Communication Exp]', 0);
        addType(expenseTypes, 'Conf',       'Conferences & Seminars', 0);
        addType(expenseTypes, 'Meals',      'Meals [Meals & Entertainment Exp]', 0);
        addType(expenseTypes, 'Furn',       'Office Furniture', 0);
        addType(expenseTypes, 'Hard',       'Computer Hardware & Office Equipment [Business Assets]', 0);
        addType(expenseTypes, 'Lodging',    'Lodging [Business Travel]', 0);
        addType(expenseTypes, 'Ins',        'Medical Insurance', 0);
        addType(expenseTypes, 'Mag',        'Magazine Subscriptions', 0);
        addType(expenseTypes, 'Mem',        'Membership Fees', 0);
        addType(expenseTypes, 'Misc',       'Miscellaneous Expenses [Deductible Exp]', 0);
        addType(expenseTypes, 'MiscMed',    'Miscellaneous Medical', 0);
        addType(expenseTypes, 'MiscEdu',    'Miscellaneous Educational Expenses [Other Exp: Educational Exp]', 0);
        addType(expenseTypes, 'Net',        'Internet Connectivity [Communication Exp]', 0);
        addType(expenseTypes, 'Phone',      'Long Distance Business Calls [Communication Exp]', 0);
        addType(expenseTypes, 'Postage',    'Business Postage Fees', 0);
        addType(expenseTypes, 'Rent',       'Rent 350 Sprague Ave (Home Office) OfficeSqFt=144 AptSqFt=778', 0);
        addType(expenseTypes, 'Mort',       'Mortgage 79 3rd Ave (Home Office) OfficeSqFt=130 79SqFt=1017 77+79SqFt=2034', 0);
        addType(expenseTypes, 'MortEscrow', 'Mortgage Escrow & Flood 79 3rd Ave (Home Office)', 0);
        addType(expenseTypes, 'Sec',        'Security And Monitoring [Exp for Entire Home - Other Exp]', 0);
        addType(expenseTypes, 'Soft',       'Computer Software', 0);
        addType(expenseTypes, 'Supplies',   'Office Supplies (Home Office)', 0);
        addType(expenseTypes, 'Tax',        'Business Tax Preparation', 0);
        addType(expenseTypes, 'Toll',       'Business Trip Driving Toll [Other Vehicle Exp]', 0);
        addType(expenseTypes, 'UtilSprag',  'Utilities 350 Sprague Ave (Home Office) [Exp for Utilities]', 0);
        addType(expenseTypes, 'Util',       'Utilities 79 3rd Ave (Home Office) [Exp for Utilities]', 0);
        addType(expenseTypes, 'UtilHalf',   'Utilities 77/79 3rd Ave (50% = 100% WO for 77 expense, 50% = Util WO for 79Home Office)', 0);
        addType(expenseTypes, '77Prof',     '77 3rd Ave Profits', 0);
        addType(expenseTypes, '77Exp',      '77 3rd Ave Expenses (100% = 100% WO for 77 expense)', 0);
        addType(expenseTypes, '77ExpUpd',   '77 3rd Ave Expenses - Updates (100% = 100% WO for 77 expense)', 0);
        addType(expenseTypes, '77/79Exp',   '77/79 3rd Ave Expenses (50% = 100% WO for 77 expense)', 0);
        addType(expenseTypes, 'Pest',       'Pest Control [Exp for Entire Home - Other]', 0);
        addType(expenseTypes, 'RentalCar',  'Rental Car [Business Travel]', 0);
        addType(expenseTypes, '311Rent',    'Rent 311 Wesmond Dr (Home Office) OfficeSqFt=99 AptSqFt=659', 0);
        addType(expenseTypes, '311Util',    'Utilities 311 Wesmond Dr (Home Office) [Exp for Utilities]', 0);
        addType(expenseTypes, '311Move',    'Moving expenses from 79 3rd Ave, PA to 311 Wesmond Dr, VA', 0);
        addType(expenseTypes, 'PropTax',    'Personal Property Tax', 0);
        addType(expenseTypes, invalidExpenseType, 'Invalid Expense Type', 999);
        return expenseTypes;

        function addType(expenseTypes, type, description, sortOrder) {
            expenseTypes.push({
                'type': type,
                'description': description,
                'sortOrder': sortOrder
            });
        }
    }

    function expenseTypeIsValid(expenseTypes, expenseType) {
        return Boolean(getExpenseType(expenseTypes, expenseType));
    }

    function getExpenseType(expenseTypes, expenseType) {
        return _.find(expenseTypes, {
            'type': expenseType
        });
    }

})();
