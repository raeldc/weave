var Factory       = require('core/components/node/factory.js'),
    Nodes         = require('core/stores/nodes.js'),
    Components    = require('core/stores/components.js'),
    LayoutStore   = require('core/stores/layout.js'),
    NodeActions   = require('core/actions/node.js'),
    LayoutActions = require('core/actions/layout.js'),
    DragContainer = require('core/ui/layout/dragcontainer.js');

module.exports = React.createClass({
    componentWillMount: function() {
        this.stopListeningToStartDrag        = LayoutActions.startDrag.listen(this.draggingOnTop);
        this.stopListeningToDraggingOnTop    = LayoutActions.draggingOnTop.listen(this.draggingOnTop);
        this.stopListeningToDraggingOnRight  = LayoutActions.draggingOnRight.listen(this.draggingOnRight);
        this.stopListeningToDraggingOnBottom = LayoutActions.draggingOnBottom.listen(this.draggingOnBottom);
        this.stopListeningToDraggingOnLeft   = LayoutActions.draggingOnLeft.listen(this.draggingOnLeft);
        this.stopListeningToDraggingInside   = LayoutActions.draggingInside.listen(this.draggingInside);
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

    draggingOnTop: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnTop === 'function') {
            layout.draggingOnTop(LayoutStore.get('drag_subject'), id);
        }
    },

    draggingOnRight: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnRight === 'function') {
            layout.draggingOnRight(LayoutStore.get('drag_subject'), id);
        }
    },

    draggingOnBottom: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnBottom === 'function') {
            layout.draggingOnBottom(LayoutStore.get('drag_subject'), id);
        }
    },

    draggingOnLeft: function(id) {
        var component = Components.get(Nodes.get(id).component);
        var layout    = component.layout || {};

        if(typeof layout.draggingOnLeft === 'function') {
            layout.draggingOnLeft(LayoutStore.get('drag_subject'), id);
        }
    },

    draggingInside: function(id) {
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