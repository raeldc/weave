var Nodes          = require('core/stores/nodes.js'),
    NodeActions    = require('core/actions/node.js'),
    LifeCycleMixin = require('core/components/node/mixins/layout/lifecycle.js'),
    ChangesMixin   = require('core/components/node/mixins/layout/changes.js');

var ColspanSelect = React.createClass({
    getInitialState: function() {
        return {open: false};
    },

    render: function() {
        var open     = this.state.open ? ' open' : '';
        var node     = Nodes.get(this.props.node);
        var colspan  = node.colspan || 1;
        var columns  = Nodes.get(node.parent).columns;
        var occupied = this.calculateOccupiedColumns(node.parent);
        var options  = [];

        for(var i = 1; i <= columns; i++) {
            options.push(i);
        }

        options = _.map(options, function(value){
            var disabled = ((value + occupied) - colspan) > columns ? 'disabled' : null;
            var selected = (value == colspan) ? <i className="fa fa-check"></i>  : '';
            var onClick  = !disabled ? this.selectColspanValue.bind(this, value) : null;

            return <li className={disabled} key={value}><a href="#" onClick={onClick}>{value} {selected}</a></li>
        }.bind(this));

        return (
            <div className={"btn-group pull-right" + open}>
                <button type="button" className="btn btn-xs dropdown-toggle" onClick={this.toggleOpen}>
                    Column Span <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {options}
                </ul>
            </div>
        )
    },

    calculateOccupiedColumns: function(node) {
        var children = Nodes.get(node).children || [];
        var count    = 0;

        _.each(children, function(node) {
            count += Nodes.get(node).colspan || 0;
        });

        return count;
    },

    selectColspanValue: function(value) {
        NodeActions.updateColspan(this.props.node, value);
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
        jQuery(window).bind('click.ColspanSelect' + this.props.node, this.toggleOpen);
    },

    unbindClick: function() {
        jQuery(window).unbind('click.ColspanSelect' + this.props.node);
    }
});

module.exports = React.createClass({
    mixins: [LifeCycleMixin, ChangesMixin],

    render: function() {
        var colspan = this.state.colspan;

        return (
            <div className={"column col-lg-"+colspan}>
                <div className="inner">
                    <div className="controls">
                        <h3 className="title">Column
                            <div className="btn-group pull-right">
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
                            <ColspanSelect node={this.props.id} />
                        </h3>
                    </div>
                    {this.children}
                </div>
            </div>
        );
    }
});