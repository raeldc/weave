'use strict'

import Components from 'core/stores/components.js'
import UIConfig   from 'core/stores/uiconfig.js'
import Nodes      from 'core/stores/nodes.js'

export default class NodeConfig extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = this.initialState()
        this.onPreviewConfigChanged = this.onPreviewConfigChanged.bind(this)
    }

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
                <div className="ui-nodeconfig">
                    {Configurations}
                </div>
            )
        }

        return <div />
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Update only when the selected node is different from the previous one
        return this.state.selectedNode !== nextState.selectedNode || this.state.device !== nextState.device
    }

    componentDidMount() {
        this.stopListeningToPreviewConfigChanges = UIConfig.Preview.listen(this.onPreviewConfigChanged)
    }

    componentWillUnmount() {
        this.stopListeningToPreviewConfigChanges()
    }

    onPreviewConfigChanged(node){
        this.setState(this.initialState())
    }
}