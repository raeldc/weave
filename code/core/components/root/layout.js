var Nodes         = require('core/stores/nodes.js'),
    LayoutStore   = require('core/stores/layout.js'),
    LayoutActions = require('core/actions/layout.js'),
    Childable     = require('core/components/node/mixins/childable.js'),
    Eventable     = require('core/components/node/mixins/eventable.js'),
    Changeable    = require('core/components/node/mixins/changeable.js'),
    Classable     = require('core/components/node/mixins/classable.js'),
    NodeActions   = require('core/actions/node.js');

module.exports = React.createClass({
    mixins: [Childable, Eventable, Changeable, Classable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        var children;

        this.addClass('root');
        this.addClass(LayoutStore.get('device'));

        this.setEvents();
        this.setClass();

        children = this.getChildren() || [];
        children.push( 
            <div className="controls add-row" key="add-row">
                <button className="btn btn-sm" onClick={this.addRow}>Add Row <i className="fa fa-plus" /></button>
            </div>
        );

        return React.createElement('div', this.properties || {}, children);
    },

    componentWillMount: function() {
        this.addEvent('onMouseOut', function() {
            LayoutActions.mouseOutNode();
        });
    },

    componentDidMount: function() {
        this.stopListeningToDeviceChanges = LayoutStore.listen(this.reRender);
    },

    componentWillUnmount: function() {
        this.stopListeningToDeviceChanges();
    },

    reRender: function(device) {
        if(device) {
            this.forceUpdate();
        }
    },

    addRow: function() {
        NodeActions.addChildNode(this.props.id, {
            component: 'row'
        });
    }
});