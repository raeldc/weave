var Nodes         = require('core/stores/nodes.js'),
    NodeActions   = require('core/actions/node.js'),
    LayoutActions = require('core/actions/layout.js'),
    Classable     = require('core/components/node/mixins/classable.js'),
    Eventable     = require('core/components/node/mixins/eventable.js'),
    Changeable    = require('core/components/node/mixins/changeable.js');

module.exports = React.createClass({
    mixins: [Changeable, Classable, Eventable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    componentWillMount: function() {
        this.addEvent('onClick.selectable', function(event) {
            LayoutActions.selectNode(this.props.id);
            event.stopPropagation();
        });

        this.addEvent('onMouseOver.hoverable', function(event) {
            LayoutActions.mouseOverNode(this.props.id);
            event.stopPropagation();
        });
    },

    render: function() {
        var properties = {};

        this.addClass('content');

        this.setEvents(properties);
        this.setClass(properties);

        var Controls = (
            <div className="controls">
                <h5 className="title">
                    {this.state.text || "Empty Text"}
                    <div className="btn-group pull-right">
                        <button className="btn btn-xs">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-xs">
                                <i className="fa fa-copy"></i>
                            </button>
                        <button className="btn btn-xs" onClick={this.deleteNode}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </h5>
            </div>
        );

        return React.createElement('div', properties, Controls);
    },

    deleteNode: function() {
        NodeActions.deleteNode(this.props.id);
    }
});