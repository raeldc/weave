var EventEmitter = require('events').EventEmitter;
var Dispatcher   = require('application/alchemy/dispatcher.js');
var DOM          = require('application/stores/dom.js');
var CONST        = require('application/constants/all.js');

var UIActions = _.extend({
    selectedNode : null,
    hoveredNode  : null,

    selectNode: function(node) {
        this.unselectNode(this.selectedNode);
        this.mouseOutNode(this.hoveredNode);

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

    mouseOverNode: function(node) {
        if(node === this.selectedNode) return;

        this.mouseOutNode(this.hoveredNode);
        this.hoveredNode = node;

        Dispatcher.dispatch({
            action    : CONST.NODE_ACTION_ADD_CLASS,
            node      : node,
            className : 'hover'
        });

        this.emit(CONST.NODE_MOUSEOVER + '_' + node, node);
        this.emit(CONST.NODE_MOUSEOVER, node);
    },

    mouseOutNode: function(node) {
        if(node) {
            Dispatcher.dispatch({
                action    : CONST.NODE_ACTION_REMOVE_CLASS,
                node      : node,
                className : 'hover'
            });

            this.emit(CONST.NODE_MOUSEOUT + '_' + node, node);
            this.emit(CONST.NODE_MOUSEOUT, node);
        }

        this.hoveredNode = null;
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

    deleteNode: function(id) {
        Dispatcher.dispatch({
            action: CONST.NODE_ACTION_DELETENODE,
            node  : id,
        });
    },

    startComponentDrag: function(event, component) {
        this.emit(CONST.UI_COMPONENT_DRAG_START, event, component);
    },

    endComponentDrag: function(event, component) {
        this.emit(CONST.UI_COMPONENT_DRAG_END, event, component);
    },

    changeText: function(node, text) {
        Dispatcher.dispatch({
            action    : CONST.NODE_ACTION_UPDATE_NODE,
            node      : node,
            properties: {
                text: text
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
    },

    setDevice: function(device) {
        Dispatcher.dispatch({
            action: CONST.UI_ACTION_SET_DEVICE,
            device: device
        });
    },

    addNodeSelectedListener: function(node, fn) {
        this.addNodeListener(node, fn, CONST.NODE_SELECTED);
    },

    removeNodeSelectedListener: function(node, fn) {
        this.removeNodeListener(node, fn, CONST.NODE_SELECTED);
    },

    addNodeUnselectedListener: function(node, fn) {
        this.addNodeListener(node, fn, CONST.NODE_UNSELECTED);
    },

    removeNodeUnselectedListener: function(node, fn) {
        this.removeNodeListener(node, fn, CONST.NODE_UNSELECTED);
    },

    addNodeMouseOverListener: function(node, fn) {
        this.addNodeListener(node, fn, CONST.NODE_MOUSEOVER);
    },

    removeNodeMouseOverListener: function(node, fn) {
        this.removeNodeListener(node, fn, CONST.NODE_MOUSEOVER);
    },

    addNodeMouseOutListener: function(node, fn) {
        this.addNodeListener(node, fn, CONST.NODE_MOUSEOUT);
    },

    removeNodeMouseOutListener: function(node, fn) {
        this.removeNodeListener(node, fn, CONST.NODE_MOUSEOUT);
    },

    addNodeListener: function(node, fn, event) {
        if(_.isArray(node)) {
            _.each(node, function(id, index) {
                this.on(event + '_' + id, fn);
            }.bind(this));
        }else {
            this.on(event + '_' + node, fn);
        }
    },

    removeNodeListener: function(node, fn, event) {
        if(_.isArray(node)) {
            _.each(node, function(id, index) {
                this.removeListener(event + '_' + id, fn);
            }.bind(this));
        }else {       
            this.removeListener(event + '_' + node, fn);
        }
    },

}, EventEmitter.prototype);

UIActions.setMaxListeners(0);

module.exports = UIActions;