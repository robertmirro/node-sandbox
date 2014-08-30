
// run from command line:
// 
//   dev /c/Dev/GitRepos/node-sandbox/db-mongodb-m101js (master)
//   $ mongo node_demo ./source/async_vs_sync/script.js

// Find one document in our collection
var doc = db.contacts.findOne();

// Print the result
printjson(doc);
