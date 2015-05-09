var Factory       = require('core/components/node/factory.js'),
    Nodes         = require('core/stores/nodes.js')
    LayoutStore   = require('core/stores/layout.js'),
    NodeActions   = require('core/actions/node.js'),
    LayoutActions = require('core/actions/layout.js');

module.exports = React.createClass({
    componentWillMount: function() {
        this.stopListentingToStartDrag        = LayoutActions.startDrag.listen(this.insertPlaceholderOnTop);
        this.stopListentingToDraggingOnTop    = LayoutActions.draggingOnTop.listen(this.insertPlaceholderOnTop);
        this.stopListentingToDraggingOnRight  = LayoutActions.draggingOnRight.listen(this.insertPlaceholderOnTop);
        this.stopListentingToDraggingOnBottom = LayoutActions.draggingOnBottom.listen(this.insertPlaceholderOnBottom);
        this.stopListentingToDraggingOnLeft   = LayoutActions.draggingOnLeft.listen(this.insertPlaceholderOnTop);
        this.stopListeningToStopDrag          = LayoutActions.stopDrag.listen(this.deletePlaceholder);
    },

    componentWillUnmount: function() {
        this.stopListentingToStartDrag();
        this.stopListentingToDraggingOnTop();
        this.stopListentingToDraggingOnBottom();
        this.stopListeningToStopDrag();
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