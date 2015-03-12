var Dispatcher     = require('application/alchemy/dispatcher.js');
var Components     = require('application/stores/components.js');
var UIConfig       = require('application/stores/uiconfig.js');
var OverlayActions = require('application/ui/actions/overlay.js');
var CONST          = require('application/constants/all.js');

var ComponentButton = React.createClass({
    render: function() {
        return <button draggable type="button" className="btn btn-primary" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}><i className={this.props.iconClass}></i> {this.props.title}</button> 
    },

    onDragStart: function(event) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('component', this.props.component);
        OverlayActions.unselectNode();

        UIConfig.emit(CONST.UI_COMPONENT_DRAG_START, event, this.props.component);
    },

    onDragEnd: function(event) {
        UIConfig.emit(CONST.UI_COMPONENT_DRAG_END, event, this.props.component);
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
                    <div className="ui-component-group" key={index}>
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