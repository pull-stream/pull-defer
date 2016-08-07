var error = require('pull-stream/sources/error')

module.exports = function (stream) {
  var read, abort, started = false

  function consume (_read) {
    if(!_read) throw new Error('must be passed a readable')
    read = _read
    if(abort) read(abort, noop)
    else if(started) stream(read)
  }

  consume.resolve =
  consume.ready =
  consume.start = function (_stream) {
    started = true; stream = _stream || stream
    if(abort && stream.abort) stream.abort(abort)
    else if(read) stream(read)
    return consume
  }

  consume.abort = function (err) {
    abort = err || true
    if(stream && stream.abort) stream.abort(abort)
    if(read) read(abort, noop)
    return consume
  }

  return consume
}

function noop () {}
