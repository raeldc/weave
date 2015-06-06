'use strict'

import Nodes         from 'core/stores/nodes.js'
import LayoutActions from 'core/actions/layout.js'

function shouldUpdate(component, nextProps, nextState) {
    return (!_.isEqual(nextProps, component.props) || !_.isEqual(nextState, component.state))
}

function afterMount(component) {
    component.stopListeningToNodeChanges = Nodes.getStore(component.props.id).listen(() => {
        onNodeChange(component)
    })
}

function afterUpdate(component) {
    renewSubscription(component)
}

function newProps(component) {
    renewSubscription(component)
}

function beforeUnmount(component) {
    component.stopListeningToNodeChanges()
}

function renewSubscription(component) {
    component.stopListeningToNodeChanges()
    component.stopListeningToNodeChanges = Nodes.getStore(component.props.id).listen(() => {
        onNodeChange(component)
    })
}

function onNodeChange(component) {
    LayoutActions.nodeTouched(component.props.id)
    component.setState(Nodes.get(component.props.id))
}

export default {shouldUpdate, newProps, afterMount, afterUpdate, beforeUnmount}