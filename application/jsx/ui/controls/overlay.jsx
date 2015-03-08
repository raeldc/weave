var Dispatcher = require('application/alchemy/dispatcher.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/all.js');
var cx         = require('react/lib/cx');
var dispatcherToken;
var detectCursorLocationTimeout;

var initialStyle = {
    visibility: 'hidden',
    width     : 0,
    height    : 0,
    top       : 0,
    left      : 0,
};

module.exports = React.createClass({
    getInitialState: function(){
        return {style: initialStyle};
    },

    render: function() {
        return (
            <div style={this.state.style} id="ui-control-overlay"></div>
        );
    },

    componentWillMount: function() {
        var component = this;
    },

    componentDidUnmount: function() {
        Dispatcher.unregister(dispatcherToken);
    }
});
