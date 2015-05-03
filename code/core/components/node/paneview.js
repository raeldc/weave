var UICanvasActions = require('core/actions/canvas.js');

module.exports = React.createClass({
    render: function() {
        return <a draggable type="button" className="btn btn-primary" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}><i className={this.props.iconClass}></i> {this.props.title}</a> 
    },

    onDragStart: function(event) {
        UICanvasActions.insertingComponent(this.props.component);
        event.stopPropagation();
    },

    onDragEnd: function(event) {
        UICanvasActions.endInsertingComponent(this.props.component);
        event.stopPropagation();
    }
});