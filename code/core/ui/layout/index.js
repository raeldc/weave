var Factory       = require('core/components/node/factory.js'),
    Nodes         = require('core/stores/nodes.js'),
    Components    = require('core/stores/components.js'),
    LayoutStore   = require('core/stores/layout.js'),
    NodeActions   = require('core/actions/node.js'),
    LayoutActions = require('core/actions/layout.js'),
    DragContainer = require('core/ui/layout/dragcontainer.js');

module.exports = React.createClass({
    componentWillMount: function() {
        this.stopListeningToStartDrag        = LayoutActions.startDrag.listen(this.insertPlaceholderOnTop);
        this.stopListeningToDraggingOnTop    = LayoutActions.draggingOnTop.listen(this.insertPlaceholderOnTop);
        this.stopListeningToDraggingOnRight  = LayoutActions.draggingOnRight.listen(this.insertPlaceholderOnRight);
        this.stopListeningToDraggingOnBottom = LayoutActions.draggingOnBottom.listen(this.insertPlaceholderOnBottom);
        this.stopListeningToDraggingOnLeft   = LayoutActions.draggingOnLeft.listen(this.insertPlaceholderOnLeft);
        this.stopListeningToDraggingInside   = LayoutActions.draggingInside.listen(this.insertPlaceholderInside);
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
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnTop === 'function') {
            layout.draggingOnTop(LayoutStore.get('drag_subject'), id);
        }
    },

    insertPlaceholderOnRight: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnRight === 'function') {
            layout.draggingOnRight(LayoutStore.get('drag_subject'), id);
        }
    },

    insertPlaceholderOnBottom: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnBottom === 'function') {
            layout.draggingOnBottom(LayoutStore.get('drag_subject'), id);
        }
    },

    insertPlaceholderOnLeft: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnLeft === 'function') {
            layout.draggingOnLeft(LayoutStore.get('drag_subject'), id);
        }
    },

    insertPlaceholderInside: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingInside === 'function') {
            layout.draggingInside(LayoutStore.get('drag_subject'), id);
        }
    },

    deletePlaceholder: function() {
        NodeActions.deleteNode('placeholder');
    }
});