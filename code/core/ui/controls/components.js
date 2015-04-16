var UIControlsActions = require('core/actions/controls.js'),
    UICanvasActions   = require('core/actions/canvas.js'),
    Components        = require('core/stores/components.js');

var ComponentButton = React.createClass({
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

var ComponentSelection = React.createClass({
    render: function() {
        var groups = []

        _.each(Components.getGroups(), function(group, index){
            if(_.size(group.components)) {
                var components = [];
                _.each(group.components, function(name, index){
                    var component = Components.get(name);

                    components.push(
                        <ComponentButton key={component.name} component={component.name} title={component.title} iconClass={component.iconClass} /> 
                    );
                }.bind(this));

                groups.push(
                    <div className="ui-controls-components-group" key={index}>
                        <h5>{group.title}</h5>
                        {components}
                    </div>
                );
            }
        }.bind(this));

        return <div>{groups}</div>
    },
});



module.exports = ComponentSelection;