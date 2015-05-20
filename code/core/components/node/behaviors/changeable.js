'use strict'

import Nodes         from 'core/stores/nodes.js'
import LayoutActions from 'core/actions/layout.js'

function shouldUpdate(component, nextProps, nextState) {
    return (component.props.device !== nextProps.device || !_.isEqual(nextProps, component.props) || !_.isEqual(nextState, component.state))
}

function afterMount(component) {
    component.stopListeningToNodeChanges = Nodes.getStore(component.props.id).listen(() => {
        LayoutActions.nodeTouched(component.props.id)
        component.setState(Nodes.get(component.props.id))
    })
}

function afterUpdate(component) {
    component.stopListeningToNodeChanges()
    component.stopListeningToNodeChanges = Nodes.getStore(component.props.id).listen(() => {
        LayoutActions.nodeTouched(component.props.id)
        component.setState(Nodes.get(component.props.id))
    })
}

function afterUnmount(component) {
    component.stopListeningToNodeChanges()
}

export default {shouldUpdate, afterMount, afterUpdate, afterUnmount}