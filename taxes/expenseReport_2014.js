(function() {
    'use strict';

    var fs = require('fs');
    var stream = require('stream');
    var _ = require('lodash');
    var moment = require('moment');
    var numeral = require('numeral');

    var fileName = process.argv[2] || 'Expenses 2014 New.txt';
    var dataType = {
        header: 'HEADER',
        lineItem: 'LINEITEM',
        subTotal: 'SUBTOTAL',
        grandTotal: 'GRANDTOTAL'
    };

    var rs = readStream(fileName, dataType);
    var ts = transformStream(dataType);
    var ws = fs.createWriteStream(fileName + '.REPORT.txt');
    rs.pipe(ts).pipe(ws);

    function readStream(fileName, dataType) {
        var rs;
        var file, fileLines;
        var expenseTypes, expenses, expenseDate, expenseType, expenseDescription, typeIsInvalid;
        var currentExpenseType;

        var invalidExpenseType = 'INVALID';
        var grandTotal = 0;
        var validDate = /^\d{2}\/\d{2}\/\d{2}$/;
        var validAmount = /^"?\$(([1-9]\d{0,2}(,\d{3})*)|\d+)?\.\d{2}"?$/; // REQUIRED: $ , decimal with 2 positions and leading number even if zero, OPTIONAL: containing double quotes, comma thousands seperator

        file = fs.readFileSync(fileName, 'utf8');
        fileLines = file.split('\n');

        expenseTypes = _.sortByAll(expenseTypesList(invalidExpenseType), ['sortOrder', 'description']);

        expenses = [];
        _.forEach(fileLines, function(expense) {
            expense = expense.split('\t');

            if (expense[0] && expense[1] && expense[3] && expense[4] && validDate.test(expense[0]) && validAmount.test(expense[1])) {
                expenseDate = moment(expense[0], 'MM-DD-YY');

                if (expenseDate.isValid()) {
                    expenseType = expense[3];
                    expenseDescription = (typeof expense[4] === 'string' ? expense[4].trim() : 'Invalid Expense Description');

                    typeIsInvalid = expenseTypeIsInvalid(expenseType);

                    expenses.push({
                        type: (typeIsInvalid ? invalidExpenseType : expenseType),
                        date: expenseDate.format('MM/DD/YYYY'),
                        amount: numeral().unformat(expense[1]),
                        description: (typeIsInvalid ? '[TYPE: ' + expenseType + '] ' : '') + expenseDescription,
                        sortByType: getExpenseTypeIndex(typeIsInvalid ? invalidExpenseType : expenseType),
                        sortByDate: expenseDate.toDate().getTime()
                    });
                }
            }
        });
        expenses = _.sortByAll(expenses, ['sortByType', 'sortByDate']);

        rs = stream.Readable({objectMode: true});
        rs._read = function(size) {
            var dataToPrint = [];
            var lineItem;

            if (!expenses.length) {
                if (currentExpenseType) {
                    dataToPrint.push({
                        type: dataType.subTotal,
                        amount: currentExpenseType.subTotal
                    });
                    dataToPrint.push({
                        type: dataType.grandTotal,
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
                        type: dataType.subTotal,
                        amount: currentExpenseType.subTotal
                    });
                }

                currentExpenseType = getExpenseType(expenses[0].type);
                dataToPrint.push({
                    type: dataType.header,
                    description: currentExpenseType.description
                });
                return rs.push(dataToPrint);
            }

            lineItem = expenses.shift();
            currentExpenseType.subTotal += lineItem.amount;
            grandTotal += lineItem.amount;

            dataToPrint.push({
                type: dataType.lineItem,
                lineItem: lineItem
            });
            return rs.push(dataToPrint);
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

    function transformStream(dataType) {
        var ts = stream.Transform({objectMode: true});
        ts._transform = function(dataChunk , encoding , nextCb) {
            // console.log('dataChunk:', dataChunk, Object.prototype.toString.call(dataChunk));
            _.forEach(dataChunk, function(data) {
                if (data.type === dataType.header) {
                    ts.push(dataType.header + ': ' + data.description + '\n');
                }

                if (data.type === dataType.lineItem) {
                    ts.push(dataType.lineItem + ': ' + formatAmount(data.lineItem.amount) + ' ' + data.lineItem.description + '\n');
                }

                if (data.type === dataType.subTotal) {
                    ts.push(dataType.subTotal + ': ' + formatAmount(data.amount) + '\n\n');
                }

                if (data.type === dataType.grandTotal) {
                    ts.push(dataType.grandTotal + ': ' + formatAmount(data.amount) + '\n');
                }
            });
            nextCb();

            function formatAmount(amount) {
                return numeral(amount).format('$0,0.00');
            }
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
