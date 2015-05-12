var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Components  = require('core/stores/components.js');

module.exports = {
    createNode: function(id, type) {
        var properties = Nodes.get(id),
            type       = type || 'node';

        if(properties) {
            var component = Components.get(properties.component);

            return React.createElement(component[type], {
                id       : properties.id,
                key      : properties.id,
                type     : type,
                device   : LayoutStore.get('device'),
                component: component
            });
        }

        return null;
    }
};