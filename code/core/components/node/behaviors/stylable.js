import Nodes       from 'core/stores/nodes.js'
import LayoutStore from 'core/stores/layout.js'

function beforeRender(component) {
    let all    = component.state.css.all,
        device = component.state.css[component.props.device]

    component.setProperty('style', _.deepExtend(_.deepClone(all), device))
}

export default {beforeRender}