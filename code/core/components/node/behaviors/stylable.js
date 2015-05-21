import Nodes       from 'core/stores/nodes.js'
import LayoutStore from 'core/stores/layout.js'

function beforeRender(component) {
    let all    = component.state.css.all,
        device = component.state.css[component.props.device],
        style  = _.deepExtend(_.deepClone(all), device)

    component.setProperty('style', style)
}

function afterRender(component) {
    component.setProperty('style', null)
}

function newProps(component, nextProps) {
    if(component.props.device !== nextProps.device) {
        component.forceUpdate()
    }
}

export default {beforeRender, afterRender, newProps}