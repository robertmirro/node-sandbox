var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    // explicitally set _id value, override auto-generated _id
    var doc = { '_id' : 'calvin', 'age' : 8 };

    db.collection('students').insert(doc, function(err, inserted) {

        // throwing err generates a huge stack trace below       
        // if(err) throw err;

        // c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\
        // connection\base.js:245
        //         throw message;
        //               ^
        // MongoError: insertDocument :: caused by :: 11000 E11000 duplicate key error index: m101.students.$_id_  dup key: { : "calvin" }
        //     at Object.toError (c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\utils.js:114:11)
        //     at c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\collection\core.js:114:29
        //     at c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\db.js:1131:7
        //     at c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\db.js:1847:9
        //     at Server.Base._callHandler (c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\connection\base.js:445:41)
        //     at c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\connection\server.js:478:18
        //     at MongoReply.parseBody (c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\responses\mongo_reply.js:68:5)
        //     at null.<anonymous> (c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\connection\server.js:436:20)
        //     at emit (events.js:95:17)
        //     at null.<anonymous> (c:\Dev\GitRepos\node-sandbox\db-mongodb-m101js\node_modules\mongodb\lib\mongodb\connection\connection_pool.js:201:13)

        // only logging the err object below
        if (err) {
            // err.message is a non-enumerable property
            //   enumerable: [ 'name', 'code', 'err' ]
            //   non-enumerable: [ 'stack', 'arguments', 'type', 'message', 'name', 'code', 'err' ] 
            // console.log( err.message );    

            console.log( err );
            return db.close();
            
            // $ node app.js
            // { [MongoError: insertDocument :: caused by :: 11000 E11000 duplicate key error index: m101.students.$_id_  dup key: { : "calvin" }]
            //   name: 'MongoError',
            //   code: 11000,
            //   err: 'insertDocument :: caused by :: 11000 E11000 duplicate key error index: m101.students.$_id_  dup key: { : "calvin" }' }
        }

        console.dir("Successfully inserted: " + JSON.stringify(inserted));

        return db.close();
    });
});
