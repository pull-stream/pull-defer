var error = require('pull-stream/sources/error')

var Source = require('./source')
var Sink = require('./sink')

module.exports = function () {

  var source = Source()
  var sink = Sink()

  return {
    source: source,
    sink: sink,
    resolve: resolve,
    abort: abort
  }

  function resolve (duplex) {
    source.resolve(duplex.source)
    sink.resolve(duplex.sink)
  }

  function abort (err) {
    resolve({
      source: error(err || true),
      sink: error(err || true)
    })
  }
}
