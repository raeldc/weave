var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    Childable   = require('core/components/node/mixins/childable.js'),
    Changeable  = require('core/components/node/mixins/changeable.js'),
    Classable   = require('core/components/node/mixins/classable.js'),
    NodeActions = require('core/actions/node.js');

module.exports = React.createClass({
    mixins: [Childable, Changeable, Classable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        var properties = {};

        this.addClass('root');
        this.addClass(LayoutStore.get('device'));

        this.setClass(properties);

        return (
            <div className={properties.className}>
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