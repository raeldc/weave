var Factory       = require('core/components/node/factory.js'),
    Nodes         = require('core/stores/nodes.js')
    LayoutStore   = require('core/stores/layout.js'),
    NodeActions   = require('core/actions/node.js'),
    LayoutActions = require('core/actions/layout.js');

module.exports = React.createClass({
    componentWillMount: function() {
        this.stopListentingToDraggingOnTop    = LayoutActions.draggingOnTop.listen(this.insertPlaceholderOnTop);
        this.stopListentingToDraggingOnBottom = LayoutActions.draggingOnBottom.listen(this.insertPlaceholderOnBottom);
        this.stopListeningToStopDrag          = LayoutActions.stopDrag.listen(this.deletePlaceholder);
    },

    componentWillUnmount: function() {
        this.stopListentingToDraggingOnTop();
        this.stopListentingToDraggingOnBottom();
    },

    render: function() {
        return Factory.createNode('root', 'layout');
    },

    insertPlaceholderOnTop: function(id) {
        Nodes.deleteNode('placeholder');
        Nodes.insertNodeBesideSibling({
            id       : 'placeholder',
            component: 'placeholder',
            position : 'before',
            sibling  : id
        }, id, 'before');
    },

    insertPlaceholderOnBottom: function(id) {
        Nodes.deleteNode('placeholder');
        Nodes.insertNodeBesideSibling({
            id       : 'placeholder',
            component: 'placeholder',
            position : 'after',
            sibling  : id
        }, id, 'after');
    },

    deletePlaceholder: function() {
        NodeActions.deleteNode('placeholder');
    }
});