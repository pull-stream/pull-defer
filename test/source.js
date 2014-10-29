var tape = require('tape')
var defer = require('../source')
var pull = require('pull-stream')

tape('defer', function (t) {

  var deferred = defer()

  pull(
    deferred,
    pull.map(function (e) { return e*5 }),
    pull.collect(function (err, ary) {
      if(err) throw err
      t.deepEqual(ary, [5, 10, 15, 20, 25])
      t.end()
    })
  )

  deferred.resolve(pull.values([1,2,3,4,5]))


})


tape('defer - resolve early', function (t) {

  var deferred = defer()

  deferred.resolve(pull.values([1,2,3,4,5]))

  pull(
    deferred,
    pull.map(function (e) { return e*5 }),
    pull.collect(function (err, ary) {
      if(err) throw err
      t.deepEqual(ary, [5, 10, 15, 20, 25])
      t.end()
    })
  )

})
