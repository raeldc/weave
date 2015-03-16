var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('application/alchemy/dispatcher.js');
var DOM          = require('application/stores/dom.js');
var CONST        = require('application/constants/all.js');

var UIActions = _.extend({
    selectNode: function(id) {
        this.emit(CONST.NODE_SELECTED, id);
    },

    insertComponentAsNode: function(component, parent) {
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_ADDNODE,
            parent : parent,
            properties: {
                component: component,
                parent   : parent, 
                text     : 'This is a paragraph of text...'
            }
        });
    },

    startComponentDrag: function(event, component) {
        this.emit(CONST.UI_COMPONENT_DRAG_START, event, component);
    },

    endComponentDrag: function(event, component) {
        this.emit(CONST.UI_COMPONENT_DRAG_END, event, component);
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
}, EventEmitter.prototype);

UIActions.setMaxListeners(0);

module.exports = UIActions;