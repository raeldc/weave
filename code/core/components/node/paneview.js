'use strict'

import Component     from 'core/component.js'
import Nodes         from 'core/stores/nodes.js'
import Components    from 'core/stores/components.js'
import LayoutActions from 'core/actions/layout.js'

export default class PaneView extends Component {
    render() {
        return (
            <a  draggable 
                type="button" 
                className="btn" 
                onDragStart={this.onDragStart} 
                onDragEnd={this.onDragEnd}>
                    <i className={this.props.icon}></i><br />
                    {this.props.title}
            </a> 
        )
    }

    onDragStart(event) {
        let component = this.props.component,
            defaults  = _.deepExtend({component: component, unmounted: true}, Components.getDefaults(component)),
            node      = Nodes.addNode(defaults)
            this.node = node

        LayoutActions.startDrag(node)
        event.stopPropagation()
    }

    onDragEnd(event) {
        let node = Nodes.get(this.node) || {}

        if(node.unmounted) {
            Nodes.deleteNode(this.node)
        }

        LayoutActions.stopDrag()
        event.stopPropagation()
    }
}