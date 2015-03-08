var Dispatcher = require('application/alchemy/dispatcher.js');
var CONST      = require('application/constants/all.js');

module.exports = {
    selectNode: function(id) {
        Dispatcher.dispatch({
            action: CONST.NODE_SELECTED,
            id: id
        });
    }
}