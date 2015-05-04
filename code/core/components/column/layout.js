var Nodes       = require('core/stores/nodes.js'),
    LayoutStore = require('core/stores/layout.js'),
    NodeActions = require('core/actions/node.js'),
    DeviceIcon  = require('core/ui/controls/topbar/deviceicon.js'),
    Childable   = require('core/components/node/mixins/childable.js'),
    Changeable  = require('core/components/node/mixins/changeable.js'),
    Eventable   = require('core/components/node/mixins/eventable.js'),
    Droppable   = require('core/components/node/mixins/droppable.js'),
    GridSelect  = require('core/components/node/mixins/gridselect.js'),
    Classable   = require('core/components/node/mixins/classable.js'),
    Colspanable = require('core/components/column/mixins/colspanable.js');

var ColspanSelect = React.createClass({
    mixins: [GridSelect],

    render: function() {
        var open     = this.state.open ? ' open' : '';
        var node     = Nodes.get(this.props.node);
        var device   = LayoutStore.get('device');
        var colspan  = Number(Nodes.getStore(this.props.node).getStore('colspan').get(device));
        var columns  = Number(Nodes.get(node.parent).columns);
        var occupied = this.calculateOccupiedColumns(node.parent);
        var options  = [];

        for(var i = 1; i <= columns; i++) {
            options.push(i);
        }

        options = _.map(options, function(value){
            var disabled = ((value + occupied) - colspan) > columns && occupied !== null ? 'disabled' : null;
            var selected = (value == colspan) ? <i className="fa fa-check"></i>  : '';
            var onClick  = !disabled ? this.selectColspanValue.bind(this, value) : null;

            return <li className={disabled} key={value}><a href="#" onClick={onClick}>{value} {selected}</a></li>
        }.bind(this));

        return (
            <div className={"btn-group pull-right" + open}>
                <button type="button" className="btn btn-xs dropdown-toggle" onClick={this.toggleOpen}>
                    Span <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    <li className="text-center"><DeviceIcon /></li>
                    <li className="divider" />
                    {options}
                </ul>
            </div>
        )
    },

    selectColspanValue: function(value) {
        NodeActions.updateColspan(this.props.node, value, LayoutStore.get('device'));
    }
});

module.exports = React.createClass({
    mixins: [Childable, Changeable, Eventable, Droppable, Classable, Colspanable],

    getInitialState: function() {
        return Nodes.get(this.props.id);
    },

    render: function() {
        var properties = {};

        this.addClass('column');
        this.addClass('col-lg-' + this.getColspan());

        this.setEvents(properties);
        this.setClass(properties);

        var Column = (
            <div className="inner">
                <div className="controls">
                    <h4 className="title">Column
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
                        <ColspanSelect node={this.props.id} />
                    </h4>
                </div>
                {this.getChildren()}
            </div>
        );

        return React.createElement('div', properties, Column);
    },

    deleteNode: function() {
        NodeActions.deleteNode(this.props.id);
    }
});