var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Components  = require('core/stores/components.js');

module.exports = {
    createNode: function(id, props) {
        var component,
            properties = Nodes.get(id);

        if(properties) {
            component = Components.get(properties.component);
            props     = _.extend({
                id       : properties.id,
                key      : properties.id,
                type     : 'node',
                device   : LayoutStore.get('device'),
                component: component
            }, props || {});

            return React.createElement(component[props.type] || 'div', props);
        }

        return null;
    }
};