'use strict'

import Component     from 'core/component.js'
import Nodes         from 'core/stores/nodes.js'
import LayoutStore   from 'core/stores/layout.js'
import LayoutActions from 'core/actions/layout.js'
import Changeable    from 'core/components/node/behaviors/changeable.js'
import Childable     from 'core/components/node/behaviors/childable.js'
import Eventable     from 'core/components/node/behaviors/eventable.js'
import Classable     from 'core/components/node/behaviors/classable.js'
import NodeActions   from 'core/actions/node.js'

export default class RootLayout extends Component{
    constructor(props, context) {
        super(props, context)

        this.addBehavior(Changeable, Childable, Eventable, Classable)
    }

    initialState(props) {
        return Nodes.get(props.id)
    }

    beforeMount() {
        Eventable.addEvent(this, 'onMouseOut', function() {
            LayoutActions.mouseOutNode()
        })
    }

    afterMount(component) {
        this.stopListeningToDeviceChanges = LayoutStore.listen(device => {component.forceRender(device)})
    }

    beforeUnmount() {
        this.stopListeningToDeviceChanges()
    }

    beforeRender() {
        Classable.addClass(this, 'root')
        Classable.addClass(this, LayoutStore.get('device'))
    }

    render() {
        return (
            <div {...this.getProperties()}>
                {this.getChildren()}
                <div className="controls add-row" key="add-row">
                    <button className="btn btn-sm" onClick={this.addRow}>Add Row <i className="fa fa-plus" /></button>
                </div>
            </div>
        )
    }

    forceRender(device) {
        if(device) {
            this.forceUpdate()
        }
    }

    addRow() {
        NodeActions.addChildNode(this.props.id, {
            component: 'row'
        })
    }
}