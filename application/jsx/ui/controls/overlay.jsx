var Dispatcher = require('application/alchemy/dispatcher.js');
var DOM        = require('application/stores/dom.js');
var CONST      = require('application/constants/all.js');
var cx         = require('react/lib/cx');
var dispatcherToken;
var detectMouseLocationTimeout;

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

    checkMouseCoordinates: function(event){
        var self = this;
        clearTimeout(detectMouseLocationTimeout);
        detectMouseLocationTimeout = setInterval(function(){
            var hits;
            clearTimeout(detectMouseLocationTimeout);

            hits = DOM.getNodesHitByCursor(event.pageX, event.pageY);
            if(hits.length) {
                self.hoverOnNode(hits.shift());
            }
        }, 50);
    },

    hoverOnNode: function(node){
        this.setState({style:{
            visibility: 'visible',
            width     : node.width,
            height    : node.height,
            top       : node.top,
            left      : node.left
        }});
    },

    componentWillMount: function() {
        var component = this;
        jQuery(window).on('mousemove', this.checkMouseCoordinates);
    },

    componentDidUnmount: function() {
        Dispatcher.unregister(dispatcherToken);
    }
});
