require('dotenv').config()
var Twitter = require('twitter');
var config = require('./config.js');

var client = new Twitter(config)

client.get('search/tweets', { q: '#strictly',count:100 }, function (error, tweets, response) {
    if (error) {
        console.log(error);
        throw error
    }
    // console.log("tweets:" + JSON.stringify(tweets,null,3));  // The favorites.
    // console.log(typeof tweets)
    for( tweet of tweets.statuses){
        console.log(tweet.text)
    }
    // console.log("response" + JSON.stringify(response));  // Raw response object.
});