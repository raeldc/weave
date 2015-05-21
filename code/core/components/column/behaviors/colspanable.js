'use strict'

import Nodes     from 'core/stores/nodes.js'
import Classable from 'core/components/node/behaviors/classable.js'

function addClasses(component) {
    Classable.addClass(component, 'col-lg-' + getColspan(component, 'desktop'))
    Classable.addClass(component, 'col-md-' + getColspan(component, 'laptop'))
    Classable.addClass(component, 'col-sm-' + getColspan(component, 'tablet'))
    Classable.addClass(component, 'col-xs-' + getColspan(component, 'phone'))
}

function removeClasses(component) {
    Classable.removeClass(component, 'col-lg-' + getColspan(component, 'desktop'))
    Classable.removeClass(component, 'col-md-' + getColspan(component, 'laptop'))
    Classable.removeClass(component, 'col-sm-' + getColspan(component, 'tablet'))
    Classable.removeClass(component, 'col-xs-' + getColspan(component, 'phone'))
}

function beforeMount(component) {
    addClasses(component)
}

function beforeUpdate(component) {
    addClasses(component)
}

function afterRender(component) {
    removeClasses(component)
}

export function getColspan(component, device) {
    let colspan, columns

    device  = device || component.props.device
    columns = Nodes.get(component.state.parent).columns
    colspan = Nodes.getStore(component.props.id).getStore('colspan').get(device) || columns

    return colspan * (12 / columns)
}

export default {beforeMount, beforeUpdate, afterRender, getColspan}
