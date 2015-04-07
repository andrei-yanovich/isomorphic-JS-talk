'use strict';

var debug = require('debug')('Example:createMessageAction');
var ThreadStore = require('../stores/ThreadStore');

module.exports = function createMessage (context, payload) {
    var threadStore = context.getStore(ThreadStore);
    var message = threadStore.createMessage({
        timestamp: Date.now(),
        authorName: 'Bill', // hard coded for the example
        isRead: true,
        text: payload.text
    });
    debug('dispatching RECEIVE_MESSAGES', message);
    context.dispatch('RECEIVE_MESSAGES', [message]);
    
    return new Promise((resolve, reject) => {
        context.service.create('message', message, {}, {}, function (err) {
            if (err) {
                debug('dispatching RECEIVE_MESSAGES_FAILURE', message);
                context.dispatch('RECEIVE_MESSAGES_FAILURE', [message]);
                reject();
            }
            debug('dispatching RECEIVE_MESSAGES_SUCCESS', message);
            context.dispatch('RECEIVE_MESSAGES_SUCCESS', [message]);
            resolve([message]);
        });
    });
};
