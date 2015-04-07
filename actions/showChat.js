'use strict';

var debug = require('debug')('Example:showChatAction');
var MessageStore = require('../stores/MessageStore');
var openThread = require('../actions/openThread');

function fetchMessages(context, payload, resolve) {
    debug('fetching messages');
    context.service.read('message', {}, {}, function (err, messages) {
        context.dispatch('RECEIVE_MESSAGES', messages);

        context.executeAction(openThread, payload)
            .then(() => {
                context.dispatch('SHOW_CHAT_END');
                resolve();
            });
    });

}

module.exports = function (context, payload) {
    context.dispatch('SHOW_CHAT_START');
    var messageStore = context.getStore(MessageStore);

    return new Promise((resolve, reject) => {
        if (Object.keys(messageStore.getAll()).length === 0) {
            fetchMessages(context, payload, resolve, reject);
        } else {
            debug('dispatching SHOW_CHAT_END');
            context.dispatch('SHOW_CHAT_END');
            resolve();
        }
    });
};
