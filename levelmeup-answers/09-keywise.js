/*
Write a program that reads in a JSON file containing mappings of
usernames to their GitHub repositories and store them in a LevelUP
data-store such that they can be searched.

Your first command-line argument will be the full path to the LevelUP
store where you need to write the data.

You will be given the path to a JSON file as the second command-line
argument, you can use `require(process.argv[3])` to load and parse
it into a JavaScript object.

The JSON file is an array with two kinds of rows, some are users:

    { "type": "user", "name": "maxogden" }

And some are repositories:

    { "type": "repo", "name": "mux-demux", "user": "dominictarr" }

You must write all of the entries in this file to the data-store.

Open the data-store and write data with '!' as a delimiter such that
the verify script will be able to read the repos for each user by
doing the following range query:

    db.createReadStream({ start: 'rvagg!', end: 'rvagg!~' })

The user data should also be fetchable with:

    db.get('rvagg', function (err, user) { ... })

The value of each entry of the data-store should be the same as the
original JSON object from the data file.
*/

var level = require('level')
var db = level(process.argv[2], { valueEncoding: 'json' })
var data = require(process.argv[3])

var users = data
  .filter(function (item) { return item.type === 'user' })
  .map(function (item) { return {
    type: 'put',
    key: item.name,
    value: item
  }
})

var repos = data
  .filter(function (item) { return item.type === 'repo' })
  .map(function (item) { return {
    type: 'put',
    key: item.user + '!' + item.name,
    value: item
  }
})

var ops = users.concat(repos)

db.batch(ops)
