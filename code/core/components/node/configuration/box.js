'use strict'

import Component     from 'core/component.js'
import Nodes         from 'core/stores/nodes.js'
import PropertyInput from 'core/components/node/configuration/inputs/property.js'

export default class Box extends Component {
    render() {
        return (
            <div className="form-inline">
                <h5>Box</h5>
                <div>
                    <PropertyInput 
                        key="css-property-marginTop" 
                        node={this.props.node} 
                        default="0" 
                        device={this.props.device} 
                        filter={/\d+/i} 
                        propertyName="marginTop" 
                    />
                    <PropertyInput 
                        key="css-property-marginTopUnit" 
                        node={this.props.node} 
                        default="px" 
                        device={this.props.device} 
                        filter={['em', 'ch', 'vw', 'vh', 'vmin', 'vmax', '%', 'px']}
                        propertyName="marginTopUnit" 
                    />
                </div>
            </div>
        )
    }

    afterMount() {
        this.stopListeningToCSSChanges = Nodes.getStore(this.props.node).getStore('css').listen(this.update)
    }

    beforeUnmount() {
        this.stopListeningToCSSChanges();
    }

    update() {
        this.forceUpdate();
    }
}