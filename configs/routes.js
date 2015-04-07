'use strict';

import showChat from '../actions/showChat';
import openThread from '../actions/openThread';

export default {
    home: {
        path: '/',
        method: 'get',
        action (context) {
            return context.executeAction(showChat, {});
        }
    },
    thread: {
        path: '/thread/:id',
        method: 'get',
        action (context, payload) {
            return context.executeAction(showChat, { threadID: payload.params.id })
                .then(() => { 
                    context.executeAction(openThread, { threadID: payload.params.id });
                });
        }
    }
};
