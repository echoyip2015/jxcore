// Copyright & License details are available under JXCORE_LICENSE file


var common = require('../common');
var assert = require('assert');
var events = require('events');

var e = new events.EventEmitter();

// default
for (var i = 0; i < 10; i++) {
  e.on('default', function() {});
}
assert.ok(!e._events['default'].hasOwnProperty('warned'));
e.on('default', function() {});
assert.ok(e._events['default'].warned);

// specific
e.setMaxListeners(5);
for (var i = 0; i < 5; i++) {
  e.on('specific', function() {});
}
assert.ok(!e._events['specific'].hasOwnProperty('warned'));
e.on('specific', function() {});
assert.ok(e._events['specific'].warned);

// only one
e.setMaxListeners(1);
e.on('only one', function() {});
assert.ok(!e._events['only one'].hasOwnProperty('warned'));
e.on('only one', function() {});
assert.ok(e._events['only one'].hasOwnProperty('warned'));

// unlimited
e.setMaxListeners(0);
for (var i = 0; i < 1000; i++) {
  e.on('unlimited', function() {});
}
assert.ok(!e._events['unlimited'].hasOwnProperty('warned'));