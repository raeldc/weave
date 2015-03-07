var Dispatcher = require('application/alchemy/dispatcher.js');
var CONST      = require('application/constants/nodes.js');

module.exports = {
    onMouseOver: function(event){
        Dispatcher.dispatch({
            action: CONST.NODE_MOUSEOVER,
            id    : this.props.id
        });

        event.stopPropagation();
    },
    onMouseOut: function(event){
        Dispatcher.dispatch({
            action: CONST.NODE_MOUSEOUT,
            id    : this.props.id
        });

        event.stopPropagation();
    },
}