'use strict'

import Nodes     from 'core/stores/nodes.js'
import Classable from 'core/components/node/behaviors/classable.js'

function initialize(component) {
    Classable.addClass(component, 'col-lg-' + getColspan(component, 'desktop'))
    Classable.addClass(component, 'col-md-' + getColspan(component, 'laptop'))
    Classable.addClass(component, 'col-sm-' + getColspan(component, 'tablet'))
    Classable.addClass(component, 'col-xs-' + getColspan(component, 'phone'))
}

export function getColspan(component, device) {
    let colspan, columns

    device  = device || component.props.device
    columns = Nodes.get(component.state.parent).columns
    colspan = Nodes.getStore(component.props.id).getStore('colspan').get(device) || columns

    return colspan * (12 / columns)
}

export default {initialize, getColspan}
