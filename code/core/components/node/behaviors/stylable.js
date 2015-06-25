import Nodes       from 'core/stores/nodes.js'
import LayoutActions from 'core/actions/layout.js'

function afterMount(component) {
    component.stopListeningToCssChanges = Nodes.getStore(component.props.id).getStore('css').listen(() => {
        LayoutActions.nodeTouched(component.props.id)
        component.setState(Nodes.get(component.props.id))
    })
}

function beforeRender(component) {
    let all    = component.state.css.all,
        device = component.state.css[component.props.device],
        style  = _.deepExtend(_.deepClone(all), device)

    component.setProperty('style', style)
}

function beforeUnmount(component) {
    component.stopListeningToCssChanges()
}

function afterRender(component) {
    component.setProperty('style', null)
}

function newProps(component, nextProps) {
    if(component.props.device !== nextProps.device) {
        component.forceUpdate()
    }
}

export default {afterMount, beforeRender, afterRender, beforeUnmount, newProps}