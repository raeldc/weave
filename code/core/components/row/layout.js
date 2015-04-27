var Nodes          = require('core/stores/nodes.js'),
    LifeCycleMixin = require('core/components/node/mixins/layout/lifecycle.js'),
    EventsMixin    = require('core/components/node/mixins/layout/events.js'),
    EditModeMixin  = require('core/components/node/mixins/layout/editmode.js'),
    UIEventsMixin  = require('core/components/node/mixins/layout/uievents.js');

var ColumnOptions = React.createClass({
    render: function() {
        return (
            <ul className="dropdown-menu">
                <li><a href="#">1</a></li>
            </ul>
        )
    }
});

var ColumnSelect = React.createClass({
    getInitialState: function() {
        return {open: false};
    },

    render: function() {
        var open     = this.state.open ? ' open' : '';
        var occupied = this.calculateOccupiedColumns();
        var columns  = Nodes.get(this.props.node).columns || 4;

        var options = _.map([2,4,6,8,10,12], function(value){
            var disabled = (value <= occupied) ? 'disabled' : '';
            var selected = (value == columns) ? <i className="fa fa-check"></i> : '';

            return <li className={disabled} key={value}><a href="#" onClick={this.selectColumnsValue.bind(this, value)}>{value} {selected}</a></li>
        }.bind(this));

        return (
            <div className={"btn-group pull-right" + open}>
                <button type="button" className="btn btn-xs dropdown-toggle" onClick={this.toggleOpen}>
                    Column Limit <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        )
    },

    calculateOccupiedColumns: function() {
        var children = Nodes.get(this.props.node).children || [];
        var count    = 0;

        _.each(children, function(node) {
            count += Nodes.get(node).span || 0;
        });

        return count;
    },

    selectColumnsValue: function(value) {
        // TODO: Execute this through an action
        Nodes.getStore(this.props.node).set('columns', value);
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
    //mixins: [LifeCycleMixin],

    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="controls col-lg-12">
                        <h3 className="title">
                            Row
                            <div className="btn-group pull-right">
                                <button className="btn btn-xs">
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
                        </h3>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});