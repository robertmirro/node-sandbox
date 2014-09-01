var MongoClient = require('mongodb').MongoClient
  , request = require('request');

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    // determine format of reddit json using
    // http://jsonformatter.curiousconcept.com/ -> http://www.reddit.com/r/technology/.json
    //
    request('http://www.reddit.com/r/technology/.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            var stories = obj.data.children.map(function (story) { return story.data; });

            // native driver insert() returns data that was inserted via option callback
            // http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#insert
            db.collection('reddit').insert(stories, function (err, data) {
                    if(err) throw err;

                    console.dir(data);

                    db.close();
            });

            // var domains = obj.data.children.map(function (story) { return { domain : story.data.domain}; });
            // // console.log( domains );    
            // // console.log( typeof domains[0] );
            // // db.close();

            // db.collection('reddit_domains').insert(domains, function (err, data) {
            //         if(err) throw err;

            //         console.dir(data);

            //         db.close();
            // });
        }
    });
});
