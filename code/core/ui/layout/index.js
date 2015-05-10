var Factory       = require('core/components/node/factory.js'),
    Nodes         = require('core/stores/nodes.js')
    LayoutStore   = require('core/stores/layout.js'),
    NodeActions   = require('core/actions/node.js'),
    LayoutActions = require('core/actions/layout.js'),
    DragContainer = require('core/ui/layout/dragcontainer.js');

module.exports = React.createClass({
    componentWillMount: function() {
        this.stopListeningToStartDrag        = LayoutActions.startDrag.listen(this.insertPlaceholderOnTop);
        this.stopListeningToDraggingOnTop    = LayoutActions.draggingOnTop.listen(this.insertPlaceholderOnTop);
        this.stopListeningToDraggingOnRight  = LayoutActions.draggingOnRight.listen(this.insertPlaceholderOnTop);
        this.stopListeningToDraggingOnBottom = LayoutActions.draggingOnBottom.listen(this.insertPlaceholderOnBottom);
        this.stopListeningToDraggingOnLeft   = LayoutActions.draggingOnLeft.listen(this.insertPlaceholderOnTop);
        this.stopListeningToStopDrag         = LayoutActions.stopDrag.listen(this.deletePlaceholder);
    },

    componentWillUnmount: function() {
        this.stopListeningToStartDrag();
        this.stopListeningToDraggingOnTop();
        this.stopListeningToDraggingOnRight();
        this.stopListeningToDraggingOnBottom();
        this.stopListeningToDraggingOnLeft();
        this.stopListeningToStopDrag();
    },

    render: function() {
        return (
            <div>
                <DragContainer />
                {Factory.createNode('root', 'layout')}
            </div>
        )
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