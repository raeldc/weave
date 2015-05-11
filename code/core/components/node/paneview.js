var Nodes         = require('core/stores/nodes.js'),
    Components    = require('core/stores/components.js'),
    LayoutActions = require('core/actions/layout.js');

module.exports = React.createClass({
    render: function() {
        return <a draggable type="button" className="btn btn-primary" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}><i className={this.props.iconClass}></i> {this.props.title}</a> 
    },

    onDragStart: function(event) {
        var component = this.props.component,
            defaults  = _.deepExtend({component: component, unmounted: true}, Components.getDefaults(component));
            node      = Nodes.addNode(defaults);
            this.node = node;

        LayoutActions.startDrag(node);
        event.stopPropagation();
    },

    onDragEnd: function(event) {
        var node = Nodes.get(this.node) || {};

        if(node.unmounted) {
            Nodes.deleteNode(this.node);
        }

        LayoutActions.stopDrag();
        event.stopPropagation();
    }
});