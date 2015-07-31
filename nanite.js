var Transform = require('readable-stream').Transform
var Inherits = require('util').inherits
var pathrun = require('patrun')

function Nanite () {
  if (!(this instanceof Nanite)) {
    return new Nanite()
  }

  Transform.call(this, {
    objectMode: true,
    highWaterMark: 16
  })

  this.on('pipe', function (source) {
    this.on('end', function () {
      source.end()
    })
  })

  this.handlers = pathrun()
}

Inherits(Nanite, Transform)

Nanite.prototype._transform = function (msg, enc, done) {
  var handler = this.handlers.find(msg)

  if (handler) {
    handler.write(msg, done)
  } else {
    this.push(msg)
    done()
  }
}

Nanite.prototype.handlerFor = function (pattern) {
  var that = this

  return function (handler) {
    return that.addHandler(pattern, handler)
  }
}

Nanite.prototype.addHandler = function (pattern, handler) {
  this.handlers.add(pattern, handler)
  return handler
}

Nanite.prototype.removeHandler = function (pattern) {
  this.handlers.remove(pattern)
}

module.exports = Nanite
