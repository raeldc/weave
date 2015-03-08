var Factory        = require('application/components/factory.js');
var LifeCycleMixin = require('application/components/node/mixins/lifecycle.js');
var OverlayActions = require('application/ui/actions/overlay.js');
var CONST          = require('application/constants/all.js');
var cx             = require('react/lib/cx');

var Controls = React.createClass({
    render: function(){
        return (
            <div className="controls" onClick={this.onMouseClick}>
                <div className="buttons">These are buttons</div>
            </div>
        );
    },

    onMouseClick: function(event){
        OverlayActions.selectNode(this.props.node);
        event.stopPropagation();
    }
});

module.exports = React.createClass({
    mixins: [LifeCycleMixin],

    render: function() {
        var className = this.state.className || '';

        this.props.children.unshift(<Controls key="controls" node={this.props.id} />);

        return React.createElement('div', {
            style      : this.state.style,
            className  : 'ui-control-overlay' + ' ' + className,
            id         : this.props.id
        }, this.props.children);
    }
});
