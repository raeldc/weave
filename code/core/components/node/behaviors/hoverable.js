import LayoutActions from 'core/actions/layout.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'

function beforeMount(component) {
    Eventable.addEvent(component, 'onMouseOver.hoverable', function(event) {
        LayoutActions.mouseOverNode(component.props.id)
        event.stopPropagation()
    })
}

function afterMount(component) {
    component.stopListeningToMouseOverNode = LayoutActions.mouseOverNode.listen(id => {hoverNode(component, id)})
}

function beforeUnmount(component) {
    component.stopListeningToMouseOverNode()
}

function hoverNode(component, id) {
    if(id === component.props.id) {
        LayoutActions.displayHoverOverlay(ReactDOM.findDOMNode(component))
    }
}

export default {beforeMount, afterMount, beforeUnmount}