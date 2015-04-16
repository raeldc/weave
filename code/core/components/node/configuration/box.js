var Nodes         = require('application/stores/nodes.js'),
    PropertyInput = require('application/components/node/configuration/inputs/property.js');

module.exports = React.createClass({
    render: function() {
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
        );
    },

    componentDidMount: function() {
        this.stopListeningToCSSChanges = Nodes.getStore(this.props.node).getStore('css').listen(this.update);
    },

    componentWillUnmount: function() {
        this.stopListeningToCSSChanges();
    },

    update: function() {
        this.forceUpdate();
    }
});