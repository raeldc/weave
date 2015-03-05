var Dispatcher = require('application/alchemy/dispatcher.js');
var CONST      = require('application/constants/nodes.js');

module.exports = {
    editModeOn: function(event){
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_EDITMODE_ON,
            subject: this.props.id
        });

        event.stopPropagation();
    },
    editModeOff: function(event){
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_EDITMODE_OFF,
            subject: this.props.id
        });

        event.stopPropagation();
    }
}