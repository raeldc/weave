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

    unselectNode: function(id) {
        Dispatcher.dispatch({
            action: CONST.NODE_UNSELECTED,
            id: id
        });
    },

    insertComponentAsNode: function(component, parent) {
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_ADDNODE,
            parent : parent,
            properties: {
                element: component,
                parent : parent, 
                text   : 'This is a paragraph of text...'
            }
        });
    },

    changeWidth: function(id, width) {
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_UPDATE_NODE_STYLE,
            node  : id,
            style : {width: width}
        });
    },

    changeHeight: function(id, height) {
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_UPDATE_NODE_STYLE,
            node  : id,
            style : {height: height}
        });
    }
}