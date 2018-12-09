require('dotenv').config()
var Twitter = require('twitter');
var Sentiment = require('sentiment');

var config = require('./config.js');

var client = new Twitter(config)
var sentiment = new Sentiment()


function analyze(tweets, dancer) {
    console.log("tweets:" + JSON.stringify(tweets,null,3));  // The favorites.
    // console.log(typeof tweets)
    totalComparative = 0
    for (tweet of tweets.statuses) {
        // console.log(tweet.text)s
        // console.log('Sentiment: '+sentiment.analyze(tweet.text).score)
        // console.log('comparative: '+sentiment.analyze(tweet.text).comparative)
        totalComparative += sentiment.analyze(tweet.text).comparative
    }

    // console.log('name: ' + dancer.name)
    // console.log('average comaparative: ' + totalComparative / tweets.statuses.length)

    dancer.score = totalComparative / tweets.statuses.length
}


// async function sentimentForDancer(dancer) {
//     return client.get('search/tweets', { q: '#strictly ' + dancer.handle, count: 100 } );

// }

let dancers = [
    {
        'name': 'Lauren',
        'handle': '@LaurenSteadman'
    },
    {
        'name': 'Joe',
        'handle': '@Joe_Sugg'
    },
    {
        'name': 'Stacey',
        'handle': '@StaceyDooley'
    },
    {
        'name': 'Faye',
        'handle': '@Faye_Tozer'
    },
     {
        'name': 'Ashley',
        'handle': '@ImAshleyRoberts'
    }
]

let queries = [];
for (let dancer of dancers) {
    const query = client.get('search/tweets', { q: '#strictly ' + dancer.handle, count: 100,until:'2018-12-9' });
    queries.push(query)
    const dancerPromise = query.then(function (response) {
        analyze(response, dancer)
    });
    // console.log(dancer.name)
    // queries.push(dancerPromise)
    // dancer.response = dancerPromise
}

Promise.all(queries).then(function () {
    for (dancer of dancers) {
        //     console.log(dancer.name)
        //     dancer.response.then(function(r){
        //         analyze(r,dancer)
        //     })
    }

}).then(() => {
    dancers.sort((a, b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0));

    for (dancer of dancers) {
        console.log('Dancer: ' + dancer.name + " score: " + dancer.score)
    }

}
)


    // console.log("response" + JSON.stringify(response));  // Raw response object.