var exec = require('child-process-promise').exec;
var Server = require('mongodb').Server;
const util = require('util');
const fs = require('fs');

//import {MongoClient, ObjectId} from 'mongodb';
require('events').EventEmitter.defaultMaxListeners = Infinity;

var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var Tweets;
mongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("worldCupTweetsDB");
  dbo.collection("tweets").find({}).toArray(function(err, result) {
    if (err) throw err;
    Tweets = result;
    db.close();
  });
});

const resolvers = {
    MyQueryType: {
        tweets(root, args, context) {
            return Tweets;
        }
    }
}

export default resolvers;
