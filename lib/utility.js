var request = require('request');
var Users = require('app/collections/users');
var bcrypt = require('bcrypt-nodejs');
var knex = require('knex');

var db = require('../app/config');

exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/


exports.checkUser = function(username, password, callback) {
  var result = false;
  db.knex('users').where('username', username).then(function(user){
    bcrypt.compare(password, user[0].password, function(err, res){
      if (err) throw err;
      console.log(res);
      callback(res);
    });
  });
}
      // console.log('result: ' + result);
      // console.log(user[0].password);
      // console.log(hash);
      // console.log('result: ' + result);
      // console.log('result: ' + result);
      // if (res){
      //   //take them to front page
      //   callback()
      // } else {
      //   //redirect to login
      // }








