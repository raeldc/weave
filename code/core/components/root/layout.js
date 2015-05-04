var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Childable   = require('core/components/node/mixins/childable.js'),
    Changeable  = require('core/components/node/mixins/changeable.js'),
    NodeActions = require('core/actions/node.js');

module.exports = React.createClass({
    mixins: [Childable, Changeable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        return (
            <div className="root">
                {this.getChildren()}

                <div className="controls add-row">
                    <button className="btn btn-sm" onClick={this.addRow}>Add Row <i className="fa fa-plus" /></button>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        this.stopListeningToDeviceChanges = LayoutStore.listen(this.reRender);
    },

    componentWillUnmount: function() {
        this.stopListeningToDeviceChanges();
    },

    reRender: function(device) {
        this.setState(this.getInitialState());
    },

    addRow: function() {
        NodeActions.addChildNode(this.props.id, {
            component: 'row'
        });
    }
});