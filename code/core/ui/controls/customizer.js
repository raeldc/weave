'use strict'

import Component       from 'core/component.js'
import Nodes           from 'core/stores/nodes.js'
import UIConfig        from 'core/stores/uiconfig.js'
import Components from 'core/stores/components.js'

export default class Customizer extends Component {
    initialState() {
        return UIConfig.Preview.toObject()
    }

    render() {
        var node = Nodes.get(this.state.selectedNode)

        if(node) {
            var component      = Components.get(node.component)
            var Configurations = _.map(component.configurations, function(config, index){
                return React.createElement(config, {
                    key          : 'config-'+index,
                    node         : node.id,
                    device       : this.state.device,
                    defaults     : component.defaults,
                    configurables: component.configurables,
                })
            }.bind(this))

            return ( 
                <div className="ui-customizer">
                    {Configurations}
                </div>
            )
        }

        return <div />
    }

    shouldUpdate(nextProps, nextState) {
        // Update only when the selected node is different from the previous one
        return this.state.selectedNode !== nextState.selectedNode || this.state.device !== nextState.device
    }

    afterMount() {
        this.stopListeningToPreviewConfigChanges = UIConfig.Preview.listen(this.onPreviewConfigChanged)
    }

    beforeUnmount() {
        this.stopListeningToPreviewConfigChanges()
    }

    onPreviewConfigChanged(node){
        this.setState(this.initialState())
    }
}