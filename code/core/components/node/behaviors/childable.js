'use strict'

import Factory from 'core/components/node/factory.js'

function beforeRender(component) {
    let children = component.state.children || []

    children.forEach(id => {
        component.addChild(createChildElement(id, {type: component.props.type}))
    })
}

export function createChildElement(id, props = {}) {
    return Factory.createNode(id, props)
}

export function createChildrenElements(component, props = {}) {
    let nodes    = [],
        children = component.state.children || []

    if(_.isArray(children)){
        props = _.extend({
            type: component.props.type
        }, props)

        children.forEach(id => {
            let child = createChildElement(id, props);

            if(React.isValidElement(child)){
                nodes.push(child);
            }
        })
    }

    return nodes
}

export default {beforeRender, createChildrenElements, createChildElement}