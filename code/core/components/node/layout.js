var Nodes         = require('core/stores/nodes.js'),
    NodeActions   = require('core/actions/node.js'),
    LayoutActions = require('core/actions/layout.js'),
    Classable     = require('core/components/node/mixins/classable.js'),
    Eventable     = require('core/components/node/mixins/eventable.js'),
    Droppable     = require('core/components/node/mixins/droppable.js'),
    Changeable    = require('core/components/node/mixins/changeable.js'),
    Draggable     = require('core/components/node/mixins/draggable.js'),
    DragRules     = require('core/components/node/statics/dragrules.js');

module.exports = React.createClass({
    mixins : [Changeable, Classable, Eventable, Droppable, Draggable],
    statics: DragRules,

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
        this.addClass('content');

        this.setEvents();
        this.setClass();

        var Controls = (
            <div className="controls">
                <h5 className="title">
                    {this.state.text || "Empty Text"}
                    <div className="btn-group pull-right">
                        <button className="btn btn-xs" onClick={this.deleteNode}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </h5>
            </div>
        );

        return React.createElement('div', this.properties || {}, Controls);
    },

    deleteNode: function() {
        NodeActions.deleteNode(this.props.id);
    }
});