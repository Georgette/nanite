var nanite = require('../nanite')()
var into = require('../into')

var handlerOne = nanite.handlerFor({cmd: 'say-hello'})
var handlerTwo = nanite.handlerFor({cmd: 'say-goodbye'})

handlerOne(into(function (msg, done) {
  console.log('Hi!')
  done()
}))

handlerTwo(into(function (msg, done) {
  console.log('Goodbye')
  done()
}))

nanite.write({cmd: 'say-hello'})
nanite.write({cmd: 'say-goodbye'})
