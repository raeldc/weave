var Nodes          = require('core/stores/nodes.js'),
    NodeActions    = require('core/actions/node.js'),
    LifeCycleMixin = require('core/components/node/mixins/layout/lifecycle.js'),
    ChangesMixin   = require('core/components/node/mixins/layout/changes.js');

function calculateOccupiedColumns(node) {
    var children = Nodes.get(node).children || [];
    var count    = 0;

    _.each(children, function(node) {
        count += Number(Nodes.get(node).colspan) || 0;
    });

    return count;
}

var ColumnSelect = React.createClass({
    getInitialState: function() {
        return {open: false};
    },

    render: function() {
        var open     = this.state.open ? ' open' : '';
        var occupied = calculateOccupiedColumns(this.props.node);
        var columns  = Number(Nodes.get(this.props.node).columns);

        var options = _.map([2,3,4,6,12], function(value){
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
    },

    toggleOpen: function(event) {
        if(!this.state.open) {
            this.setState({open: true});

            this.bindClick()
        }else {
            this.setState({open: false});
            this.unbindClick()
        }

        event.stopPropagation();
    },

    bindClick: function() {
        jQuery(window).bind('click.ColumnSelect' + this.props.node, this.toggleOpen);
    },

    unbindClick: function() {
        jQuery(window).unbind('click.ColumnSelect' + this.props.node);
    }
});

module.exports = React.createClass({
    mixins: [LifeCycleMixin, ChangesMixin],

    render: function() {
        return (
            <div className="container-fluid container-row">
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
                                <button className="btn btn-xs">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                            <ColumnSelect node={this.props.id} />
                        </h4>
                    </div>
                    {this.children}
                </div>
            </div>
        );
    },

    addColumn: function() {
        if(calculateOccupiedColumns(this.props.id) < this.state.columns) {
            NodeActions.addChildNode(this.props.id, {
                component: 'column',
                parent   : this.props.id,
                colspan  : 1
            });
        }
    }
});