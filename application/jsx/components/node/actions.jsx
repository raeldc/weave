var Dispatcher = require('application/alchemy/dispatcher.js');
var CONST      = require('application/constants/nodes.js');

module.exports = {
    editModeOn: function(event){
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_EDIT_MODE_ON,
            subject: this
        });

        event.stopPropagation();
    },
    editModeOff: function(event){
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_EDIT_MODE_OFF,
            subject: this
        });

        event.stopPropagation();
    }
}