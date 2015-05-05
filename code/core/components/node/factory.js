var Nodes      = require('core/stores/nodes.js'),
    Components = require('core/stores/components.js');

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
                component: component
            });
        }

        return null;
    }
};