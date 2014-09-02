var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;


    // NOTE: when using dot notation, field references must be quoted in shell as well:
    // from shell: db.reddit.find({'media.oembed.type':'video'},{'media.oembed.url':1})

    // need to populate media field because reddit json extract from earlier only has media:null values:
    // from shell: db.reddit.update({},{$set: {media : {"guid": "dfc28786-2adb-41bf-bafb-452b8a6ee085","type": "youtube.com","oembed": {  "type": "video",  "url": "https://www.youtube.com/watch?v=PZyDPthMMK8&feature=em-uploademail"}}}},{multi:true})
    var query = { 'media.oembed.type' : 'video' };

    var projection = { 'media.oembed.url' : 1, '_id' : 0 };

    db.collection('reddit').find(query, projection).each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        console.dir(doc);
    });
});
