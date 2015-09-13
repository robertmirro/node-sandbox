(function() {
    'use strict';

    var fs = require('fs');
    var stream = require('stream');
    var _ = require('lodash');
    var moment = require('moment');
    var numeral = require('numeral');

    var rs = readStream(process.argv[2]);
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

    function readStream(fileName) {
        var rs;
        var file, fileLines;
        var expenseTypes, expenses, expenseDate, expenseAmount, expenseType, expenseDescription, typeIsInvalid, sortByType;
        var currentExpenseType;

        var invalidExpenseType = 'INVALID';
        var validDate = /^\d{2}\/\d{2}\/\d{2}$/;
        var validAmount = /^"?\$(([1-9]\d{0,2}(,\d{3})*)|\d+)?\.\d{2}"?$/; // REQUIRED: $ , decimal with 2 positions and leading number even if zero, OPTIONAL: containing double quotes, comma thousands seperator
        var grandTotal = 0;

        fileName = (fileName || 'Expenses 2014 New.txt');
        file = fs.readFileSync(fileName, 'utf8');
        // console.log('file:', file);
        fileLines = file.split('\n');
        // console.log('fileLines:', fileLines);

        expenseTypes = _.sortByAll(expenseTypesList(invalidExpenseType), ['sortOrder', 'description']);
        console.log('expenseTypes:', expenseTypes);

        expenses = [];
        _.forEach(fileLines, function(expense) {
            expense = expense.split('\t');

            if (expense[0] && expense[1] && expense[3] && expense[4] && validDate.test(expense[0]) && validAmount.test(expense[1])) {
                expenseDate = moment(expense[0], 'MM-DD-YY');

                if (expenseDate.isValid()) {
                    expenseAmount = numeral().unformat(expense[1]);
                    expenseType = expense[3];
                    expenseDescription = (typeof expense[4] === 'string' ? expense[4].trim() : 'Invalid Expense Description');

                    typeIsInvalid = expenseTypeIsInvalid(expenseType);

                    expenses.push({
                        type: (typeIsInvalid ? invalidExpenseType : expenseType),
                        amount: expenseAmount,
                        description: (typeIsInvalid ? '[TYPE: ' + expenseType + '] ' : '') + expenseDescription,
                        displayDate: expenseDate.format('MM/DD/YYYY'),
                        displayAmount: numeral(expenseAmount).format('$0,0.00'),
                        sortByType: getExpenseTypeIndex(typeIsInvalid ? invalidExpenseType : expenseType),
                        sortByDate: expenseDate.toDate().getTime()
                    });
                }
            }
            // console.log('expense:', expense, '\n');
        });
        console.log('\n\nexpenses:\n', expenses);

        expenses = _.sortByAll(expenses, ['sortByType', 'sortByDate']);
        console.log('\n\nexpenses sorted:\n', expenses);

        // var expensesGroupBy = _.groupBy(expenses, 'type');
        // console.log('\n\nexpenses groupBy:\n', expensesGroupBy);

        // var expensesGroupByPairs = _.pairs(expensesGroupBy);
        // console.log('\n\nexpenses groupByPairs:\n', expensesGroupByPairs);


        // expenseTypesToProcess = _.filter(expenseTypes, function(expenseType) {
        //     // returns { false: 5, true: 2 } when value is found/counted or { false: 7 } when value is not found/counted
        //     expenseType.expenseCount = _.countBy(expenses, {
        //         'type': expenseType.type
        //     }).true;
        //     return expenseType.expenseCount > 0;
        // });
        // // console.log('expenseTypesToProcess:', expenseTypesToProcess);


        var currentWord = 0;

        // rs = stream.Readable();
        rs = stream.Readable({objectMode: true});
        // rs = stream.Readable.call(this, {objectMode: true});
        rs._read = function(size) {
            var dataToPrint = [];
            var lineItem;

            /*
            var currentExpenseType, currentExpense;

            // if there is no next expense (expense.length = 0)

                // if there is a currentType, print array (sub total AND grand total), clear currentType
                // if there is NOT a currentType, end read (return push(null))

            // else if currentType not defined OR currentType.type <> type of next expense in array

                // var arrayToPrint = [];
                // if there is a currentType, arrayToPrint.push(currentType subtotal line)
                // set currentType (getExpenseType(next expense in array: expense.type))
                // arrayToPrint.push(new currentType header and column headers)

            // else

                // shift expense from expenses array
                // print array (expense detail line)

            */

            if (!expenses.length) {
                if (currentExpenseType) {
                    dataToPrint.push({
                        type: 'SUBTOTAL',
                        amount: currentExpenseType.subTotal
                    });
                    dataToPrint.push({
                        type: 'GRANDTOTAL',
                        amount: grandTotal
                    });

                    currentExpenseType = undefined;
                    return rs.push(dataToPrint);
                }
                return rs.push(null);
            }

            if (_.isUndefined(currentExpenseType) || currentExpenseType.type !== expenses[0].type) {
                if (currentExpenseType) {
                    dataToPrint.push({
                        type: 'SUBTOTAL',
                        amount: currentExpenseType.subTotal
                    });
                }

                currentExpenseType = getExpenseType(expenses[0].type)
                dataToPrint.push({
                    type: 'HEADERS',
                    description: currentExpenseType.description
                });
                return rs.push(dataToPrint);
            }

            lineItem = expenses.shift();
            currentExpenseType.subTotal += lineItem.amount;
            grandTotal += lineItem.amount;

            dataToPrint.push({
                type: 'LINEITEM',
                lineItme: lineItem
            });
            return rs.push(dataToPrint);


            // console.log('_read...');
            // if (currentWord >= 4 /* maxWords */) {
            //     // null terminator to inform consumer that data is done being output
            //     return rs.push(null);
            // }

            // currentWord++;

            // // simulate a delay and illustrate async processing
            // setTimeout(function() {
            //     console.log('_read before rs.push...');
            //     // rs.push(currentWord.toString());
            //     // rs.push(JSON.stringify({name: currentWord}));

            //     rs.push({name: currentWord});
            //     // rs.push([{name: currentWord}]);

            //     // var randomIndex = Math.floor( Math.random() * words.length ) ;
            //     // rs.push(currentWord + '. ' + words[ randomIndex ] /* + '\n' */);
            // }, 100);
        };

        return rs;

        function expenseTypeIsInvalid(expenseType) {
            return !(getExpenseType(expenseType));
        }

        function getExpenseType(expenseType) {
            return _.find(expenseTypes, {
                'type': expenseType
            });
        }

        function getExpenseTypeIndex(expenseType) {
            return _.findIndex(expenseTypes, {
                'type': expenseType
            });
        }
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
        // var ts = stream.Transform();
        var ts = stream.Transform({objectMode: true});
        // var ts = stream.Transform.call(this, {objectMode: true});
        ts._transform = function(dataChunk , encoding , nextCb) {
            //        console.log( 'chunk: %s\n' , dataChunk.toString() + '(' + ')' );
            // transform pass-thru data to UPPERCASE and push it out to write stream
            // display original word text in parens (split word from index + word)
            // var wordString = dataChunk.toString().trim();
            // ts.push(wordString.toUpperCase());
            console.log('dataChunk:', dataChunk, Object.prototype.toString.call(dataChunk));
            // ts.push('1: ' + dataChunk.name.toString());
            // ts.push('2: ' + dataChunk.name.toString());
            ts.push('1: ' + dataChunk.toString());
            ts.push('2: ' + dataChunk.toString());

            // simulate a delay and illustrate async processing
            // inform producer we are ready for next dataChunk
            // nextCb();
            setTimeout(nextCb , 100);
        };
        return ts;
    }

    function expenseTypesList(invalidExpenseType) {
        var expenseTypes = [];

        addType('Book',       'Computer Books [Other Exp: Educational Exp]', 0);
        addType('Bus Ins',    'Business Insurance', 0);
        addType('Cell',       'Business Cell Phone [Communication Exp]', 0);
        addType('Conf',       'Conferences & Seminars', 0);
        addType('Meals',      'Meals [Meals & Entertainment Exp]', 0);
        addType('Furn',       'Office Furniture', 0);
        addType('Hard',       'Computer Hardware & Office Equipment [Business Assets]', 0);
        addType('Lodging',    'Lodging [Business Travel]', 0);
        addType('Ins',        'Medical Insurance', 0);
        addType('Mag',        'Magazine Subscriptions', 0);
        addType('Mem',        'Membership Fees', 0);
        addType('Misc',       'Miscellaneous Expenses [Deductible Exp]', 0);
        addType('MiscMed',    'Miscellaneous Medical', 0);
        addType('MiscEdu',    'Miscellaneous Educational Expenses [Other Exp: Educational Exp]', 0);
        addType('Net',        'Internet Connectivity [Communication Exp]', 0);
        addType('Phone',      'Long Distance Business Calls [Communication Exp]', 0);
        addType('Postage',    'Business Postage Fees', 0);
        addType('Rent',       'Rent 350 Sprague Ave (Home Office) OfficeSqFt=144 AptSqFt=778', 0);
        addType('Mort',       'Mortgage 79 3rd Ave (Home Office) OfficeSqFt=130 79SqFt=1017 77+79SqFt=2034', 0);
        addType('MortEscrow', 'Mortgage Escrow & Flood 79 3rd Ave (Home Office)', 0);
        addType('Sec',        'Security And Monitoring [Exp for Entire Home - Other Exp]', 0);
        addType('Soft',       'Computer Software', 0);
        addType('Supplies',   'Office Supplies (Home Office)', 0);
        addType('Tax',        'Business Tax Preparation', 0);
        addType('Toll',       'Business Trip Driving Toll [Other Vehicle Exp]', 0);
        addType('UtilSprag',  'Utilities 350 Sprague Ave (Home Office) [Exp for Utilities]', 0);
        addType('Util',       'Utilities 79 3rd Ave (Home Office) [Exp for Utilities]', 0);
        addType('UtilHalf',   'Utilities 77/79 3rd Ave (50% = 100% WO for 77 expense, 50% = Util WO for 79Home Office)', 0);
        addType('77Prof',     '77 3rd Ave Profits', 0);
        addType('77Exp',      '77 3rd Ave Expenses (100% = 100% WO for 77 expense)', 0);
        addType('77ExpUpd',   '77 3rd Ave Expenses - Updates (100% = 100% WO for 77 expense)', 0);
        addType('77/79Exp',   '77/79 3rd Ave Expenses (50% = 100% WO for 77 expense)', 0);
        addType('Pest',       'Pest Control [Exp for Entire Home - Other]', 0);
        addType('RentalCar',  'Rental Car [Business Travel]', 0);
        addType('311Rent',    'Rent 311 Wesmond Dr (Home Office) OfficeSqFt=99 AptSqFt=659', 0);
        addType('311Util',    'Utilities 311 Wesmond Dr (Home Office) [Exp for Utilities]', 0);
        addType('311Move',    'Moving expenses from 79 3rd Ave, PA to 311 Wesmond Dr, VA', 0);
        addType('PropTax',    'Personal Property Tax', 0);
        addType(invalidExpenseType, 'Invalid Expense Type', 999);
        return expenseTypes;

        function addType(type, description, sortOrder) {
            expenseTypes.push({
                type: type,
                description: description,
                sortOrder: sortOrder,
                subTotal: 0
            });
        }
    }
})();
