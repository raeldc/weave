var LayoutActions = require('core/actions/layout.js');

module.exports = React.createClass({
    render: function() {
        return <a draggable type="button" className="btn btn-primary" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}><i className={this.props.iconClass}></i> {this.props.title}</a> 
    },

    onDragStart: function(event) {
        LayoutActions.insertingComponent(this.props.component);
        this.startListeningToDroppedOnNode = LayoutActions.droppedOnNode.listen(this.onDrop);
        event.stopPropagation();
    },

    onDragEnd: function(event) {
        LayoutActions.endInsertingComponent(this.props.component);
        this.startListeningToDroppedOnNode();
        event.stopPropagation();
    },

    onDrop: function(id, node, event) {
        LayoutActions.insertComponent(this.props.component, id);
        event.stopPropagation();
    }
});