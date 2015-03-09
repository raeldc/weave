var Dispatcher = require('application/alchemy/dispatcher.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/all.js');

module.exports = {
    selectNode: function(id) {
        Dispatcher.dispatch({
            action: CONST.NODE_SELECTED,
            id: id
        });
    },

    changeHeight: function(id, height) {
        Dispatcher.dispatch({
            action    : CONST.NODE_ACTION_UPDATE_NODE,
            node      : id,
            properties: {
                style: {height: height}
            }
        });
    }
}