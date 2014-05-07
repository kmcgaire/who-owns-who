/**
 * Created by kevin on 5/6/2014.
 */

var Summary = require('./db').collection('summary');


// Amount is how much user1 owes user2
// user {
//   username: username
//   fullName: fullName
//   thumbnail: string
exports.createInitalTabSumamry = function (user1, user2, amount, callback) {
  var summaryToInsert= {
    user1: user1,
    user2: user2,
    amount: amount
  };
  Summary.insert(summaryToInsert);
  callback(summaryToInsert);
};

exports.getUsersSummary= function (username, callback) {
  Summary.find({
    $or: [
      { user1: { username: username } },
      { user2: { username: username } }
    ]
  }, function (err, tabList) {
    callback(tabList)
  });
};

// user1 owes user 2 the amount
exports.updateTabSummary = function (user1, user2, amount) {
  Summary.update({
    $or: [
      {
        user1: { username: user1 },
        user2: { username: user2 }
      }, {
        user1: { username: user2 },
        user2: { username: user1 }
      }
    ]
  }, {
    $inc: {
      amount: amount
    }
  });
};


