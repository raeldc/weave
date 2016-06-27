'use strict'

import Nodes      from 'core/stores/nodes.js'
import Components from 'core/stores/components.js'

function initialize(component) {
    let defaults = component.props.component.defaults.attributes || {}

    _.each(defaults, function(attribute, key) {
        component.setProperty(key, attribute)
    })
}

function beforeRender(component) {
    const node = Nodes.get(component.props.id)

    _.each(node.attributes, function(attribute, key) {
        component.setProperty(key, attribute)
    })
}

export default {initialize, beforeRender}
