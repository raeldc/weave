var Nodes         = require('core/stores/nodes.js'),
    LayoutStore   = require('core/stores/layout.js'),
    LayoutActions = require('core/actions/layout.js'),
    NodeActions   = require('core/actions/node.js'),
    Classable     = require('core/components/node/mixins/classable.js'),
    Eventable     = require('core/components/node/mixins/eventable.js'),
    Childable     = require('core/components/node/mixins/childable.js'),
    Changeable    = require('core/components/node/mixins/changeable.js'),
    GridSelect    = require('core/components/node/mixins/gridselect.js');

var ColumnSelect = React.createClass({
    mixins: [GridSelect],

    render: function() {
        var open     = this.state.open ? ' open' : '';
        var occupied = this.calculateOccupiedColumns(this.props.node, 'desktop');
        var columns  = Number(Nodes.get(this.props.node).columns);

        var options = _.map([2,3,4,6], function(value){
            var disabled = (value < occupied) ? 'disabled' : null;
            var selected = (value == columns) ? <i className="fa fa-check"></i> : '';
            var onClick  = !disabled ? this.selectColumnsValue.bind(this, value) : null;

            return <li className={disabled} key={value}><a href="#" onClick={onClick}>{value} {selected}</a></li>
        }.bind(this));

        return (
            <div className={"btn-group pull-right" + open}>
                <button type="button" className="btn btn-xs dropdown-toggle" onClick={this.toggleOpen}>
                    Column Slots <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        )
    },

    selectColumnsValue: function(value) {
        NodeActions.updateColumns(this.props.node, value);
    }
});

module.exports = React.createClass({
    mixins: [Childable, Classable, Eventable, Changeable],

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

        this.addClass('container-row');
        this.addClass('container-fluid');

        this.setEvents(properties);
        this.setClass(properties);

        var Row = (
            <div className="row">
                <div className="controls col-lg-12">
                    <h4 className="title">
                        Row
                        <div className="btn-group pull-right">
                            <button className="btn btn-xs" onClick={this.addColumn}>
                                Add Column <i className="fa fa-plus"></i>
                            </button>
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
                        <ColumnSelect node={this.props.id} />
                    </h4>
                </div>
                {this.getChildren()}
            </div>
        );

        return React.createElement('div', properties, Row);
    },

    addColumn: function() {
        if(GridSelect.calculateOccupiedColumns(this.props.id, 'desktop') < this.state.columns) {
            NodeActions.addChildNode(this.props.id, {
                component: 'column',
                parent   : this.props.id
            });
        }
    },

    deleteNode: function() {
        NodeActions.deleteNode(this.props.id);
    }
});