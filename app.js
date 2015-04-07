'use strict';

var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin = require('fluxible-plugin-routr');

// create new fluxible instance
var app = new Fluxible({
    component: require('./components/ChatApp.jsx')
});

// add routes to the routr plugin
app.plug(routrPlugin({
    routes: require('./configs/routes')
}));

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

// register stores
app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/MessageStore'));
app.registerStore(require('./stores/ThreadStore'));
app.registerStore(require('./stores/UnreadThreadStore'));

module.exports = app;
