var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('application/alchemy/dispatcher.js');
var DOM          = require('application/stores/dom.js');
var CONST        = require('application/constants/all.js');

var UIActions = _.extend({
    selectedNode: null,

    selectNode: function(node) {
        this.unselectNode(this.selectedNode);
        this.selectedNode = node;

        this.emit(CONST.NODE_SELECTED + '_' + node, node);
        this.emit(CONST.NODE_SELECTED, node);
    },

    unselectNode: function(node) {
        if(node) {
            this.emit(CONST.NODE_UNSELECTED + '_' + node, node);
            this.emit(CONST.NODE_UNSELECTED, node);
        }

        this.selectedNode = null;
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
    },

    addNodeSelectedListener: function(node, fn) {
        if(_.isArray(node)) {
            _.each(node, function(id, index) {
                this.on(CONST.NODE_SELECTED + '_' + id, fn);
            }.bind(this));
        }else {
            this.on(CONST.NODE_SELECTED + '_' + node, fn);
        }
    },

    removeNodeSelectedListener: function(node, fn) {
        if(_.isArray(node)) {
            _.each(node, function(id, index) {
                this.removeListener(CONST.NODE_SELECTED + '_' + id, fn);
            }.bind(this));
        }else {       
            this.removeListener(CONST.NODE_SELECTED + '_' + node, fn);
        }
    },

    addNodeUnselectedListener: function(node, fn) {
        if(_.isArray(node)) {
            _.each(node, function(id, index) {
                this.on(CONST.NODE_UNSELECTED + '_' + id, fn);
            }.bind(this));
        }else {
            this.on(CONST.NODE_UNSELECTED + '_' + node, fn);
        }
    },

    removeNodeUnselectedListener: function(node, fn) {
        if(_.isArray(node)) {
            _.each(node, function(id, index) {
                this.removeListener(CONST.NODE_UNSELECTED + '_' + id, fn);
            }.bind(this));
        }else {       
            this.removeListener(CONST.NODE_UNSELECTED + '_' + node, fn);
        }
    }

}, EventEmitter.prototype);

UIActions.setMaxListeners(0);

module.exports = UIActions;