'use strict'

export function toggleOpen(component) {
    if(!component.state.open) {
        component.setState({open: true})
        bindClick(component)
    }else {
        component.setState({open: false});
        unbindClick(component)
    }
}

function bindClick(component) {
    jQuery(document).bind('mouseup.GridSelect' + component.props.node, toggleOpen.bind(null, component))
}

function unbindClick(component) {
    jQuery(document).unbind('mouseup.GridSelect' + component.props.node)
}

export default {toggleOpen}