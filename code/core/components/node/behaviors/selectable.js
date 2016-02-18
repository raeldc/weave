import LayoutActions from 'core/actions/layout.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'

function beforeMount(component) {
    Eventable.addEvent(component, 'onClick.selectable', function(event) {
        LayoutActions.selectNode(component.props.id)
        event.stopPropagation()
    })
}

function afterMount(component) {
    component.stopListeningToSelectNode = LayoutActions.selectNode.listen(id => {selectNode(component, id)})
}

function beforeUnmount(component) {
    LayoutActions.unSelectNode()
    LayoutActions.mouseOutNode()
    component.stopListeningToSelectNode()
}

function selectNode(component, id) {
    if(id === component.props.id) {
        LayoutActions.displaySelectOverlay(ReactDOM.findDOMNode(component))
    }
}

export default {beforeMount, afterMount, beforeUnmount}