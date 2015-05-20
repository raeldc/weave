'use strict'

import Nodes       from 'core/stores/nodes.js'
import LayoutStore from 'core/stores/layout.js'
import Components  from 'core/stores/components.js'

export function createNode(id, props) {
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

export default {createNode}