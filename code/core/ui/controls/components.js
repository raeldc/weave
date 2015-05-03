var UIControlsActions = require('core/actions/controls.js'),
    UICanvasActions   = require('core/actions/canvas.js'),
    Components        = require('core/stores/components.js');

var ComponentSelection = React.createClass({
    render: function() {
        var groups = []

        _.each(Components.getGroups(), function(group, index){
            if(_.size(group.components)) {
                var components = [];
                _.each(group.components, function(name, index){
                    var component = Components.get(name);

                    if(component.paneview !== undefined) {
                        components.push(
                            <component.paneview key={component.name} component={component.name} title={component.title} iconClass={component.iconClass} /> 
                        );
                    }
                }.bind(this));

                if(components.length) {
                    groups.push(
                        <div className="components-group" key={index}>
                            <h5>{group.title}</h5>
                            {components}
                        </div>
                    );
                }
            }
        }.bind(this));

        return <div id="corebuilder-components">{groups}</div>
    },
});



module.exports = ComponentSelection;